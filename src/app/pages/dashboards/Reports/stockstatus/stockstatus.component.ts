import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stockstatus',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './stockstatus.component.html',
  styleUrl: './stockstatus.component.css'
})
export class StockstatusComponent {
stockStatus:FormGroup
}
