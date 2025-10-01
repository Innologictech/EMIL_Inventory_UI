import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-return',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sales-return.component.html',
  styleUrl: './sales-return.component.css'
})
export class SalesReturnComponent {
salesReturn:FormGroup
}
