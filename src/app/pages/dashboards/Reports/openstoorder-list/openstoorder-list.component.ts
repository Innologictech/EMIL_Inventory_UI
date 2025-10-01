import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-openstoorder-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './openstoorder-list.component.html',
  styleUrl: './openstoorder-list.component.css'
})
export class OpenstoorderListComponent {
opensto:FormGroup
}
