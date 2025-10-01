import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-invoice-print',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,BsDatepickerModule],
  templateUrl: './invoice-print.component.html',
  styleUrl: './invoice-print.component.css'
})
export class InvoicePrintComponent {
invoiceprint:FormGroup;
bsConfig: Partial<BsDatepickerConfig>;

  ngOnInit() {
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY', // day-month-number-year
      containerClass: 'theme-default',
    };
  }
}
