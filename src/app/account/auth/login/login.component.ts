import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from 'src/app/store/Authentication/authentication.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';
import { GeneralserviceService } from 'src/app/generalservice.service';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  returnUrl: string;
  fieldTextType!: boolean;

  // set the currenr year
  year: number = new Date().getFullYear();
  // private apiUrl = 'http://localhost:3000/api/invoice/authenticationLogin';
  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private store: Store,
    private authFackservice: AuthfakeauthenticationService,private http:HttpClient,private service:GeneralserviceService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    // form validation
    this.loginForm = this.formBuilder.group({
      employeeCode: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  // onSubmit() {
  //   this.submitted = true;
  
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  
  //   const payload = {
  //     userName: this.loginForm.value.userName,
  //     Password: this.loginForm.value.password
  //   };
  
  //   this.spinner.show();
  
  //   this.service.submitLogin(payload).subscribe({
  //     next: (res: any) => {
  //       this.spinner.hide();
  
  //       if (res.status === 200) {
  //         localStorage.setItem('currentUser', JSON.stringify(res));
  //         this.service.setLoginResponse(res);
  
  //         Swal.fire({
  //           title: res.message || 'Login successful',
  //           icon: 'success',
  //           timer: 2000,
  //           timerProgressBar: true
  
  //         }).then(() => {
  //           // this.store.dispatch(changesLayout({ layoutMode: 'horizontal' }));
  //           this.router.navigate(['/home']);
  //         });
  //       }
  //     },
  //     error: (err) => {
  //       this.spinner.hide();
  
  //       console.log('Error Response:', err);
  
  //       if (err === 'Invalid Credentials') {
  //         Swal.fire('Invalid Credentials', 'Please try again.', 'error');
  //       } 
  //        else {
  //         Swal.fire('Login failed', 'Something went wrong. Please try again.', 'error');
  //       }
  //     }
  //   });
  // }
  

  
  // onSubmit() {
  //   this.submitted = true;
  
  //   if (this.loginForm.invalid) return; // Don't submit if form is invalid
  
  //   const email = this.f['email'].value;
  //   const password = this.f['password'].value;
  
  //   // Use the authentication service to log the user in
  //   this.authenticationService.login(email, password).subscribe(
  //     (response) => {
  //       if (response.status === 200 && response.isValid) {
  //         localStorage.setItem('token', response.token); // Store token
  //         this.router.navigate(['/dashboard/']); // Navigate to dashboard
  //       }
  //     },
  //     (error) => {
  //       this.error = 'Invalid credentials';
  //     }
  //   );
  // }
 onSubmit() {
 
    if(this.loginForm.invalid == true){
      this.submitted = true;
    }else{
        console.log('clicked else')

      const userName = this.f['employeeCode'].value; // Get the username from the form
      const password = this.f['password'].value; // Get the password from the form
 
      const  response   ={
            "message": "Login Successful",
            "status": 200,
            "data": {
                "userName": "1919",
                "userEmail": "sunil@gmail.com",
                "userUniqueId": 50,
                "userStatus": true,
                "isValid": true,
                "userActivity": "admin"
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTA3NzJiMDg1ZjM5ODNkYWQ3N2Y1MyIsInVzZXJOYW1lIjoiMTkxOSIsImlhdCI6MTczODY1MzQyMiwiZXhwIjoxNzM4NjU3MDIyfQ.eljCCW-80W4gWJt0GhJPayd76Xmi7EZOFoOh3SRCP2I"
        }
          this.service.setLoginResponse(response);
          localStorage.setItem('currentUser', JSON.stringify(response || { token: response.token }));
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl], { skipLocationChange: true });
 
      this.login(userName, password)
    }
   
  }
  // onSubmit() {
  //   this.submitted = true;

  //   const email = this.f['email'].value; 
  //   const password = this.f['password'].value; 
  //   if (email && password) {
  //     let obj ={
  //       userName:email,
  //       userPassword:password
  //     }
  //     this.authenticationService.login(obj).subscribe(
  //       (response:any) => {
  //         // handle successful login (e.g., store token, redirect)
  //         console.log('Login successful', response);
  //         if(response.status == 200 && response.isValid == true){
  //           this.router.navigate(['default']);
  //           this.store.dispatch(login({ email: email, password: password }));
  //         }else{
  //          console.log("response else",response)
  //         }

         
  //       },
  //       (error) => {
  //         // handle login failure (e.g., show error message)
  //         console.error('Login failed', error);
  //       }
  //     );
  //   }

  //   // Login Api
  //   // this.store.dispatch(login({ email: email, password: password }));
  // }

  /**
 * Password Hide/Show
 */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }




  login(employeeCode: any, password: string){
      const loginPayload = {
        userName: employeeCode,
        userPassword: password
      };
    this.service.submitLogin(loginPayload).subscribe((response:any)=>{
      if (response.status === 200 && response.isValid) {
        localStorage.setItem('token', response.token); // Store token in localStorage
        // Login Api
        this.store.dispatch(login({ employeeCode: employeeCode, password: password }));
        Swal.fire({
          // title: 'question',
          text: response.message,
          icon: 'info',
          showCancelButton: true,
          showConfirmButton: true,
        }).then((result) => {
         
        });
        this.store.dispatch(login({ employeeCode: employeeCode, password: password }));
        // return response;
      } else {
        console.log("response",response)
         Swal.fire({
                  // title: 'question',
                  text: response.message,
                  icon: 'info',
                  showCancelButton: true,
                  showConfirmButton: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    
                  } else {
                    
                  }
                });
      }
    })
      // return this.http.post<any>(this.apiUrl, loginPayload).pipe(
      //   map((response) => {
      //     console.log("response",response)
      //     if (response.status === 200 && response.isValid) {
      //       localStorage.setItem('token', response.token); // Store token in localStorage
      //       // Login Api
      //       this.store.dispatch(login({ email: email, password: password }));
      //       // return response;
      //     } else {
      //       console.log("response",response)
      //       throw new Error('Invalid credentials');
      //     }
      //   }),
      //   // catchError((error) => throwError(() => new Error(error.error?.message || 'Login failed')))
      // );
    }
}
