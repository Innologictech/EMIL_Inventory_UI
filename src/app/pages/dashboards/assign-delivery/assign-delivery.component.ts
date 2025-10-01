import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-delivery',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './assign-delivery.component.html',
  styleUrl: './assign-delivery.component.css'
})
export class AssignDeliveryComponent {
  assignDelivery: FormGroup;
  showTable = false;

  @ViewChild('confirmCancelTemplate') confirmCancelTemplate!: TemplateRef<any>;
  confirmModalRef: NgbModalRef | null = null;
  creditNoteModalRef!: NgbModalRef;
  changeAssign!: FormGroup;
  submit = false;
  
  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    // Assign Delivery Form
    this.assignDelivery = this.fb.group({
      ponumber: ['']
    });

    // Change Assign Form
    this.changeAssign = this.fb.group({
      plant: ['', Validators.required],
      plantCode: ['', Validators.required],   // ✅ fixed casing
    });
  }

  // Search PO
  searchPO() {
    const poValue = this.assignDelivery.get('ponumber')?.value;
    this.showTable = !!(poValue && poValue.trim() !== '');
  }

  // Open Modal
  openModal(template: TemplateRef<any>): void {
    this.submit = false;

    this.changeAssign.reset({
      plant: '',
      plantCode: '',
    });

    this.creditNoteModalRef = this.modalService.open(template, {
      backdrop: 'static',
      keyboard: false,
      scrollable: true,
      size: 'lg',
      windowClass: 'custom-width-modal'
    });
  }

  // Save Form
  onSave(): void {
    this.submit = true;

    if (this.changeAssign.invalid) {
      this.changeAssign.markAllAsTouched(); // Show validation errors
      return;
    }

    const formData = this.changeAssign.value;
    console.log('Form Submitted:', formData);

    this.closeModal();
  }

  // Cancel button click
  confirmCancel(): void {
    this.closeModal();
  }

  // Close modal
  closeModal(): void {
    if (this.creditNoteModalRef) {
      this.creditNoteModalRef.close();
      this.creditNoteModalRef = null;
    }
  }
}