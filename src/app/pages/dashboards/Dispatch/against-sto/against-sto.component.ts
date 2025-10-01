import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-against-sto',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './against-sto.component.html',
  styleUrl: './against-sto.component.css'
})
export class AgainstStoComponent {
  againststo:FormGroup
}
