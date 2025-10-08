import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ean-scan',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './ean-scan.component.html',
  styleUrl: './ean-scan.component.css'
})
export class EANScanComponent {

  eanScan!: FormGroup;

  constructor(private fb: FormBuilder) {}

   ngOnInit(): void {
    this.eanScan = this.fb.group({
      eanCode: ['', Validators.required],   
      productName: [''],
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
