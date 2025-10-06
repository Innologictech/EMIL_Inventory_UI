import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralserviceService } from 'src/app/generalservice.service'; // Adjust path if necessary
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-stock-master',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './stock-master.component.html',
  styleUrl: './stock-master.component.css'
})
export class StockMasterComponent {
showSearch = false;
  stockForm!: FormGroup;
  submitted = false;
  showAddStockForm = false;
  show = true;
  showTable = true;
  fileupload=false;
  
  constructor(private fb: FormBuilder) {}

   ngOnInit(): void {
    this.stockForm = this.fb.group({
      storeCode: ['', Validators.required],
      productCode: ['', Validators.required],
      quantity: ['', Validators.required],
      storageLocation: ['', Validators.required]
    });
  }
  materials = [
    { storeCode: '1200', productCode: '11000706', quantity: '10', storageLocation: '1000' },
    { storeCode: '1200', productCode: '21000017', quantity: '3', storageLocation: '1000' },
    { storeCode: '1200', productCode: '21000038', quantity: '5', storageLocation: '1000' },
    { storeCode: '1042', productCode: '21000038', quantity: '1', storageLocation: '1000' },
    { storeCode: '1200', productCode: '24000149', quantity: '10', storageLocation: '1000' },
    { storeCode: '1206', productCode: '24000149', quantity: '10', storageLocation: '1000' }
  ];

  get f() {
    return this.stockForm.controls;
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

    if (this.stockForm.invalid) {
      return; // stop if validation fails
    }

    console.log('Form Submitted:', this.stockForm.value);
    alert('Form Submitted Successfully!');
  }

  onSaveAndBack(): void {
    this.submitted = true;

    if (this.stockForm.invalid) {
      return;
    }

    console.log('Form Saved:', this.stockForm.value);
    // simulate save and go back
    alert('Data Saved and Going Back!');
    // here you can add routing: this.router.navigate(['/dashboard']);
  }

  onCancel(): void {
    this.stockForm.reset();
     this.show=true;
     this.showAddStockForm=false;
     this.showTable=true;
  }

  onAddStockClick(){
    this.showAddStockForm=true;
    this.showTable=false;
    this.show=false;

  }

  stockBulkClick(){
    this.fileupload=true;
    this.show=false;
    this.showAddStockForm=false;
    this.showTable=false;
  }


}
