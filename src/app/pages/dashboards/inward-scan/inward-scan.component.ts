import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inward-scan',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './inward-scan.component.html',
  styleUrl: './inward-scan.component.css'
})
export class InwardScanComponent {

inwardScan!:FormGroup;

  constructor(private fb: FormBuilder) {}

   ngOnInit(): void {
    this.inwardScan = this.fb.group({
      orderpoNumber: ['', Validators.required],   
      eanCode: [''],
      serialNumber:[''],
      quantity:['']
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
  



