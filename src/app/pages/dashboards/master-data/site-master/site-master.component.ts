import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralserviceService } from 'src/app/generalservice.service'; // Adjust path if necessary
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-site-master',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './site-master.component.html',
  styleUrl: './site-master.component.css'
})
export class SiteMasterComponent {

showSearch=false;
  siteForm!: FormGroup;
  submitted = false;
  showAddSiteForm=false;
  show=true;
  showTable=true;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      storeCode: ['', Validators.required],
      storeName: ['', Validators.required],
     
    });
  }

 materials = [
    {
      storeCode: 'SC001',
      storeName: 'Central Store',
      eanScanCompleted: 'Yes',
      stockScanCompleted: 'No'
    },
    {
      storeCode: 'SC002',
      storeName: 'Warehouse A',
      eanScanCompleted: 'Yes',
      stockScanCompleted: 'Yes'
    },
    {
      storeCode: 'SC003',
      storeName: 'Branch Store',
      eanScanCompleted: 'No',
      stockScanCompleted: 'No'
    },
    {
      storeCode: 'SC004',
      storeName: 'Depot Store',
      eanScanCompleted: 'Yes',
      stockScanCompleted: 'No'
    }
  ];

  // easy access to form controls
  get f() {
    return this.siteForm.controls;
  }

  toggleSearch(event: MouseEvent) {
    event.stopPropagation();
    this.showSearch = true;
  }

  
  closeSearch() {
    this.showSearch = false;
  }

    // Listen for document clicks
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showSearch) {
      this.closeSearch();
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.siteForm.invalid) {
      return; // stop if validation fails
    }

    console.log('Form Submitted:', this.siteForm.value);
    alert('Form Submitted Successfully!');
  }

  onSaveAndBack(): void {
    this.submitted = true;

    if (this.siteForm.invalid) {
      return;
    }

    console.log('Form Saved:', this.siteForm.value);
    // simulate save and go back
    alert('Data Saved and Going Back!');
    // here you can add routing: this.router.navigate(['/dashboard']);
  }

  onCancel(): void {
    this.siteForm.reset();
     this.show=true;
     this.showAddSiteForm=false;
     this.showTable=true;
  }

  onAddUserClick(){
    this.showAddSiteForm=true;
    this.showTable=false;
    this.show=false;

  }
  


}
