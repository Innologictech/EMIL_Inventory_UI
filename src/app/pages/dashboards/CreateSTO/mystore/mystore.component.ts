import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-mystore',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './mystore.component.html',
  styleUrl: './mystore.component.css'
})
export class MystoreComponent implements OnInit {
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

  onSubmit() {
    if (this.myStoreForm.valid) {
      const formData = {
        ...this.myStoreForm.getRawValue(),
        items: this.itemsList
      };
      console.log('Form Data:', formData);
      alert('Form submitted! Check console for data.');
    } else {
      alert('Please fill all required fields');
    }
  }

  // Modified submitItem method
  // submitItem() {
  //   if (this.itemForm.valid) {
  //     this.itemsList.push({ ...this.itemForm.value });
  //     console.log('New item added:', this.itemForm.value);
  //     console.log('Current items list:', this.itemsList);
  //     this.itemForm.reset({ quantity: 1 });

  //     // Close modal - FIXED VERSION
  //     const modalElement = document.getElementById('addItemModal');
  //     if (modalElement) {
  //       const modal = bootstrap.Modal.getInstance(modalElement);
  //       if (modal) {
  //         modal.hide();
  //       } else {
  //         // If no instance exists, create new one and hide
  //         new bootstrap.Modal(modalElement).hide();
  //       }
  //       // Remove any leftover backdrops
  //       const backdrops = document.getElementsByClassName('modal-backdrop');
  //       while (backdrops.length > 0) {
  //         backdrops[0].parentNode?.removeChild(backdrops[0]);
  //       }
  //     }
  //   } else {
  //     console.log('Item form is invalid.');
  //     alert('Please fill all required fields in item form');
  //   }
  // }
submitItem() {
  if (this.itemForm.valid) {
    this.itemsList.push({ ...this.itemForm.value });
    this.itemForm.reset({ quantity: 1 });
  } else {
    alert('Please fill all required fields');
  }
}


  removeItem(index: number) {
    this.itemsList.splice(index, 1);
  }
}
