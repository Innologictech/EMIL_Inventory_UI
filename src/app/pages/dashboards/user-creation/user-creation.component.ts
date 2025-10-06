import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralserviceService } from 'src/app/generalservice.service'; // Adjust path if necessary
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css'], 
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
    standalone: true,
   
})
export class UserCreationComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  fieldTextType: boolean = false;
  showAddUserForm = false;
  show=true;
   showSearch = false;
   showselectedTab=true;



  // Dynamic tabs
  selectedTab: string = 'All';
  filteredUsers: { username: string; role: string; store: string; email: string; mobile: string; }[];

    toggleSearch(event: MouseEvent) {
    event.stopPropagation();
    this.showSearch = true;
  }

  
  closeSearch() {
    this.showSearch = false;
  }

    // Listen for document clicks
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showSearch) {
      this.closeSearch();
    }
  }

  // Sample data
  roles = [ 'All','Inventory', 'EanScan', 'Dispatch', 'Store', 'GRN', 'Multi-Role', 'Administrator'];
  stores = ['Store A', 'Store B', 'Store C'];

  // Sample user list
  users = [
    { username: 'John', role: 'Inventory', store: 'Store1', email: 'john@mail.com', mobile: '1234567890' },
    { username: 'Alex', role: 'Driver', store: 'Store2', email: 'alex@mail.com', mobile: '9876543210' },
    { username: 'Mia', role: 'Administrator', store: 'HQ', email: 'mia@mail.com', mobile: '9998887777' },
    { username: 'John', role: 'Dispatch', store: 'Store1', email: 'john@mail.com', mobile: '1234567890' },
    { username: 'Alex', role: 'Store', store: 'Store2', email: 'alex@mail.com', mobile: '9876543210' },
    { username: 'Mia', role: 'GRN', store: 'HQ', email: 'mia@mail.com', mobile: '9998887777' },
    // more dummy users
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      role: ['', Validators.required],
      store: ['', Validators.required],
      username: ['', Validators.required],
      empCode: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.email]],
      mobile: ['', [Validators.pattern('^[0-9]{10}$')]]
    });
  }

  get f() { return this.userForm.controls; }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      alert('User saved successfully!');
      console.log(this.userForm.value);
      // Reset form or add user to the list
      this.users.push(this.userForm.value);
      this.userForm.reset();
      this.submitted = false;
    }
  }

  // Show form on button click
onAddUserClick() {
  this.showAddUserForm = true;
  this.showselectedTab=false;
  this.show=false;
}

  onSaveAndBack() {
    this.onSubmit();
    this.selectedTab = 'All'; // Switch to list view
  }

  onCancel() {
    this.userForm.reset();
    this.showAddUserForm = false;
    this.showselectedTab=true;
  }

  onSelectTab(tab: string) {
    this.showselectedTab=true;
    this.selectedTab = tab;
    this.showAddUserForm=false;
    this.show=true;
      if (tab === 'All') {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(u => u.role === tab);
    }
  }
}