import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-scan-stock-items',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './scan-stock-items.component.html',
  styleUrl: './scan-stock-items.component.css'
})
export class ScanStockItemsComponent  {
  
  scanForm: FormGroup;
  scannedItems: any[] = [];
  totalScannedItems: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.scanForm = this.fb.group({
      eanCode: ['', Validators.required],
      serialNumber: [''],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onScanSubmit() {
    if (this.scanForm.valid) {
      const newItem = this.scanForm.value;
      
      // Simulating data for the list view
      const mockDescription = `Product-${Math.floor(Math.random() * 1000)}`;
      const mockProductCode = `PC-${Math.floor(Math.random() * 100)}`;
      
      this.scannedItems.push({
        ...newItem,
        productCode: mockProductCode,
        description: mockDescription
      });

      this.totalScannedItems += newItem.quantity;
      
      // Reset the form after submission
      this.scanForm.reset({ quantity: 1 });
    } else {
      console.log('Form is invalid.');
    }
  }
}


