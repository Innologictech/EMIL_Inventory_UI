import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-inward-stock',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,BsDatepickerModule],
  templateUrl: './inward-stock.component.html',
  styleUrl: './inward-stock.component.css'
})
export class InwardStockComponent {
inward: FormGroup;
showTable = false;

  bsRangeConfig: Partial<BsDatepickerConfig>;

constructor(private fb: FormBuilder) {
    this.inward = this.fb.group({
      invoicedate: [null]
    });

    // Enable date range selection
    // this.bsRangeConfig = {
    //   isAnimated: true,
    //   containerClass: 'theme-default',
    //   dateInputFormat: 'DD-MMM-YYYY',
    //   rangeInputFormat: 'DD-MMM-YYYY', // ensures From - To is displayed
    //   rangeSeparator: ' to ',
    //   selectWeek: false,
    //   showWeekNumbers: false,
    // };


}

generateReport() {
    if (this.inward.valid) {
      // You can add your API call or data processing here
      this.showTable = true;
    } else {
      this.showTable = false;
    }
  }
}
