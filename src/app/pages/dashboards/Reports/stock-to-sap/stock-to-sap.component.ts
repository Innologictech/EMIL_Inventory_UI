import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-stock-to-sap',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './stock-to-sap.component.html',
  styleUrl: './stock-to-sap.component.css'
})
export class StockToSapComponent implements OnInit {
opensto:FormGroup;
storewiseShow=false;
brandwiseShow=false;
productwiseShow=false;
allShow=false;

 bsRangeConfig: Partial<BsDatepickerConfig>;
constructor(private fb: FormBuilder) {
    this.bsRangeConfig = {
      containerClass: 'theme-blue',
      rangeInputFormat: 'DD-MM-YYYY' // 👈 format
    };
  }

ngOnInit(): void {
   // ✅ initialize the form here
    this.opensto = this.fb.group({
      daterange: [null, Validators.required]
    });
  
}

get f() { return this.opensto.controls; }

storewise(){
  this.storewiseShow=true;
}
productwise(){
  this.productwiseShow=true;
}
brandwise(){
  this.brandwiseShow=true;
}
totalStock(){
  this.allShow=true;
}


}
