import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerAbstractComponent } from 'ngx-bootstrap/datepicker/base/bs-datepicker-container';

@Component({
  selector: 'app-gatepass-print',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,BsDatepickerModule],
  templateUrl: './gatepass-print.component.html',
  styleUrl: './gatepass-print.component.css'
})
export class GatepassPrintComponent {
gatepassPrint:FormGroup;
bsConfig: Partial<BsDatepickerConfig>;

  ngOnInit() {
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY', // day-month-number-year
      containerClass: 'theme-default',
    };
  }
}
