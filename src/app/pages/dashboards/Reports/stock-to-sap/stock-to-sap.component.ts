import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-stock-to-sap',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule, 
    BsDatepickerModule,NgSelectModule],
  templateUrl: './stock-to-sap.component.html',
  styleUrl: './stock-to-sap.component.css'
})
export class StockToSapComponent implements OnInit {
  title:string ="";
  opensto:FormGroup;
  // Flags for active button
  storewiseShow = false;
  productwiseShow = false;
  brandwiseShow = false;
  totalShow = true;

  activeButton: string = 'total'; // No button active initially

  setActiveButton(button: string): void {
    this.activeButton = button;
  }


  // Dynamic filter variables
  filterVisible = false;
  filterLabel = '';
  filterOptions: any[] = [];

 


tempDateRange: Date[] = [];
selectedDateRange: Date[] = [];
openPicker = false;
showDatePicker=false;

bsRangeConfig = {
  displayMonths: 2,
  showWeekNumbers: false,
  outsideClickCloses: true,
};



constructor(private fb: FormBuilder) {
    this.opensto = this.fb.group({
      daterange: [null, Validators.required]
    });
  }

ngOnInit(): void {
   // ✅ initialize the form here
    this.opensto = this.fb.group({
      filterSelect :"",
      daterange: [null, Validators.required]
    });
  
}

get f() { return this.opensto.controls; }

 showFilter(type: string) {
  if(type=='brandwise'){
    this.title="Please Select Brand or Date Range";
  }
  else if(type=='total'){
    this.title="Total Stock";
  }
  else{
    this.title="";
  }
    
  this.storewiseShow = this.productwiseShow = this.brandwiseShow = this.totalShow = false;
      this.activeButton = type;

switch (type) {
      case 'storewise':
        this.filterLabel = 'Store';
         this.filterOptions = [
        { value: '1206', label: '1206 - Store 1206' },
        { value: '1207', label: '1207 - Store 1207' },
        { value: '1208', label: '1208 - Store 1208' }
      ];
        this.storewiseShow = true;
        break;
      case 'productwise':
        this.filterLabel = 'Product';
 this.filterOptions = [
        { value: 'P001', label: 'P001 - Product Alpha' },
        { value: 'P002', label: 'P002 - Product Beta' }
      ];        this.productwiseShow = true;
        break;
      case 'brandwise':
        this.filterLabel = 'Brand';
 this.filterOptions = [
        { value: 'B001', label: 'Brand A' },
        { value: 'B002', label: 'Brand B' }
      ];        this.brandwiseShow = true;
        break;
      case 'total':
        this.filterLabel = '';
        this.filterOptions = [];
        this.totalShow = true;
        break;
    }

    this.filterVisible = type !== 'total';
  }


  onSubmit() {
    // this.submitted = true;
    if (this.opensto.invalid) return;
    console.log('Form submitted:', this.opensto.value);
  }

 onDateRangeChange(value: Date[]) {
  this.tempDateRange = value; // temporary selection
}

cancelDateRange() {
  // reset or clear the selection
  this.tempDateRange = null;
  this.opensto.get('daterange').setValue(null);
}

applyDateRange() {
  // close the datepicker and finalize selection logic
  this.showDatePicker = false;
}
}
