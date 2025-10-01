import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-storage-location-transfer',
  templateUrl: './storage-location-transfer.component.html',
  styleUrl: './storage-location-transfer.component.css'
})
export class StorageLocationTransferComponent {
  showSecondScreen = false;
  showGrnConfirmation = false;

  poForm: FormGroup;
  locationForm: FormGroup;

  fromLocation: string = '';
  toLocation: string = '';

  scannedItems: any[] = [
    { description: 'LG LED 49UK6360', code: '11000030', serial: '566', qty: 1 }
  ];

  constructor(private fb: FormBuilder) {
    // Location Form
    this.locationForm = this.fb.group({
      fromLocation: ['', Validators.required],
      toLocation: ['', Validators.required]
    });

    // PO Form
    this.poForm = this.fb.group({
      item: ['', Validators.required],
      serialNo: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      vendornumber: ['', Validators.required],
      vendordate: ['', Validators.required]
    });
  }

  // First submit: show second screen
  onSubmitLocation() {
    if (this.locationForm.valid) {
      this.fromLocation = this.locationForm.value.fromLocation;
      this.toLocation = this.locationForm.value.toLocation;
      this.showSecondScreen = true;
    } else {
      alert('Please enter From Location and To Location.');
    }
  }

  // Done button
  onDone() {
    if (this.poForm.get('item')?.valid &&
        this.poForm.get('serialNo')?.valid &&
        this.poForm.get('quantity')?.valid) {
      
      // Add scanned item to list
      this.scannedItems.push({
        description: this.poForm.value.item,
        code: 'AUTO-CODE',  // replace with API / logic
        serial: this.poForm.value.serialNo,
        qty: this.poForm.value.quantity
      });

      this.poForm.reset({ quantity: 1 });
    } else {
      alert('Please fill Item, Serial No and Quantity before proceeding.');
    }
  }

  // Remove scanned item
  removeItem(index: number) {
    this.scannedItems.splice(index, 1);
  }

  // Cancel confirmation
  onCancel() {
    this.showGrnConfirmation = false;
  }

  // Submit final form
  onSubmitPO() {
    if (this.poForm.valid) {
      console.log('Form submitted:', this.poForm.value);
      alert('✅ GRN Confirmed & Submitted to SAP');
    } else {
      alert('Please fill all required fields before submitting.');
    }
  }

  openScannedItems() {
    alert('📋 Show scanned items list here.');
  }
}


