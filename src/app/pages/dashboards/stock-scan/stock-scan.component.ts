import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as React from 'preact/compat';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-scan',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './stock-scan.component.html',
  styleUrl: './stock-scan.component.css'
})
export class StockScanComponent {
  stockScan!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      // ✅ Initialize your form properly here
      this.stockScan = this.fb.group({
        productCode: ['', Validators.required],   // example field
        serialNumber: [''],
        quantity:[''],
        storageLocation:[''],


        // quantity: [0]
      });
    }
  onDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f36270', // same color as delete button
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'The item has been deleted.',
          'success'
        );
      }
    });
  }
  
  }
  


