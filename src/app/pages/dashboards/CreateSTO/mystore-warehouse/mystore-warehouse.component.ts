import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-mystore-warehouse',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './mystore-warehouse.component.html',
  styleUrl: './mystore-warehouse.component.css'
})
export class MystoreWarehouseComponent implements OnInit {

  myStoreForm: FormGroup;
  itemForm: FormGroup;
  itemsList: any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myStoreForm = this.fb.group({
      deliveryDate: [''],
      storageLocation: ['1000'],
      supplyStore: [''],
      supplyStoreCode: [{ value: '', disabled: true }]
    });

    this.itemForm = this.fb.group({
      product: ['', Validators.required],
      productCode: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  // Add Item
  submitItem() {
    if (this.itemForm.valid) {
      // Push item to list
      this.itemsList.push({ ...this.itemForm.value });

      // Reset form for next item
      this.itemForm.reset({ quantity: 1 });

      // 👇 No need to manually hide modal!
      // Bootstrap handles it with data-bs-dismiss="modal"
    } else {
      alert('Please fill all required fields in item form');
    }
  }

  // Remove item from list
  removeItem(index: number) {
    this.itemsList.splice(index, 1);
  }

  // Final Submit
  onSubmit() {
    if (this.myStoreForm.valid) {
      const formData = {
        ...this.myStoreForm.getRawValue(),
        items: this.itemsList
      };
      console.log('Form Data:', formData);
      alert('Form submitted! Check console for data.');
    } else {
      alert('Please fill all required fields in main form');
    }
  }
}
