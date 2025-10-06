import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stockqtyoverview-report',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './stockqtyoverview-report.component.html',
  styleUrl: './stockqtyoverview-report.component.css'
})
export class StockqtyoverviewReportComponent {
stockQty:FormGroup;

}
