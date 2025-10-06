import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralserviceService } from 'src/app/generalservice.service'; // Adjust path if necessary
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-article-master',
  templateUrl: './article-master.component.html',
  styleUrl: './article-master.component.css'
})
export class ArticleMasterComponent {
  showSearch=false;
  materialForm!: FormGroup;
  submitted = false;
  showAddArticleForm=false;
  show=true;
  showTable=true;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.materialForm = this.fb.group({
      newMaterialCode: ['', Validators.required],
      materialDescription: ['', Validators.required],
      oldMaterialCode: ['', Validators.required],
      serialProfile: [''],
      eanCode: [''],
      materialType: [''],
      merchantCategory: [''],
      brand: [''],
      uom: [''],
      otcType: ['', Validators.required]  // Dropdown required
    });
  }

   materials = [
    {
      newMaterialCode: 'NM001',
      oldMaterialCode: 'OM001',
      materialDescription: 'Test Material 1',
      serialProfile: 'SP001',
      existingEAN: 'EAN12345',
      newEAN: 'EAN67890',
      isUpdated: 'Yes'
    },
    {
      newMaterialCode: 'NM002',
      oldMaterialCode: 'OM002',
      materialDescription: 'Test Material 2',
      serialProfile: 'SP002',
      existingEAN: 'EAN54321',
      newEAN: 'EAN09876',
      isUpdated: 'No'
    }
  ];

  // easy access to form controls
  get f() {
    return this.materialForm.controls;
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

    if (this.materialForm.invalid) {
      return; // stop if validation fails
    }

    console.log('Form Submitted:', this.materialForm.value);
    alert('Form Submitted Successfully!');
  }

  onSaveAndBack(): void {
    this.submitted = true;

    if (this.materialForm.invalid) {
      return;
    }

    console.log('Form Saved:', this.materialForm.value);
    // simulate save and go back
    alert('Data Saved and Going Back!');
    // here you can add routing: this.router.navigate(['/dashboard']);
  }

  onCancel(): void {
    this.materialForm.reset();
     this.show=true;
     this.showAddArticleForm=false;
     this.showTable=true;
  }

  onAddUserClick(){
    this.showAddArticleForm=true;
    this.showTable=false;
    this.show=false;

  }
  
}
