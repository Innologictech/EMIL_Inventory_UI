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
filteredUsers: {
  uid: number;
  role_id: number;
  store_id: number;
  user_name: string;
  email: string;
  emp_code: string;
  mobile_no: string | null;
  status: string;
}[] = [];

  generalService: any;
  roles: any;

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
  // roles = [ 'All','Inventory', 'EanScan', 'Dispatch', 'Store', 'GRN', 'Multi-Role', 'Administrator'];
  stores = ['Store A', 'Store B', 'Store C'];
// 
  // Sample user list
 users: {
  uid: number;
  role_id: number;
  store_id: number;
  user_name: string;
  email: string;
  emp_code: string;
  mobile_no: string | null;
  status: string;
}[] = [];
filterValues: any = {
  uid: '',
  role: '',
  store_id: '',
  user_name: '',
  emp_code: '',
  status: ''
};


  constructor(private fb: FormBuilder, private service:GeneralserviceService) { }

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
    this.getUserList();
    this.getRoles();
  }

getUserList(): void {
  this.service.getUsercreation().subscribe({
    next: (res: any) => {
      console.log('User list response:', res);
      this.users = res.data ? res.data : res;
      this.filteredUsers = [...this.users];
    },
    error: (err) => {
      console.error('Error fetching user list:', err);
    }
  });
}

getRoles(): void {
  this.service.getRoles().subscribe({
    next: (res: any) => {
      console.log('Roles response:', res);

      // API returns res.data as an array of objects with rid and role
      this.roles = res.data || [];
    },
    error: (err) => {
      console.error('Error fetching roles:', err);
    }
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
  this.showselectedTab = true;
  this.selectedTab = tab;
  this.showAddUserForm = false;
  this.show = true;

  if (tab === 'All') {
    this.filteredUsers = [...this.users];
  } else {
this.filteredUsers = this.users.filter(u => u.role_id === Number(tab));
  }
}
applyFilter(field: string, value: string) {
  this.filterValues[field] = value.toLowerCase();
  this.filteredUsers = this.users.filter((user) => {
    return Object.keys(this.filterValues).every((key) => {
      const filterValue = this.filterValues[key];
      if (!filterValue) return true; // skip empty fields

      const userValue = (user[key] ?? '').toString().toLowerCase();
      return userValue.includes(filterValue);
    });
  });
}

resetFilters() {
  Object.keys(this.filterValues).forEach((key) => (this.filterValues[key] = ''));
  this.filteredUsers = [...this.users];
}

}