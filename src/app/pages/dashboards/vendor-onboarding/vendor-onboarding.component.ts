import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import * as bootstrap from 'bootstrap';
import { ActivatedRoute, RouterLink, Routes } from '@angular/router';


interface FileUpload {
  filename: string;
  data: string;
  contentType: string;
}

// models/onboarding-response.model.ts
export interface OnboardingResponse {
  message: string;
  data: {
    onboardingId: string;
    linkId: string;
    linkUrl: string;
    fullRegisteredName: string;
    status: string;
  };
  status: number;
}

@Component({
  selector: 'app-vendor-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,BsDatepickerModule],
  templateUrl: './vendor-onboarding.component.html',
  styleUrl: './vendor-onboarding.component.css'
})


export class VendorOnboardingComponent {
bsConfig: Partial<BsDatepickerConfig>;
  @ViewChild('cpNameInput') cpNameInput!: ElementRef;
  @ViewChild('principalbankers') principalbankersInput!: ElementRef;
  @ViewChild('positionInput') positionInput!: ElementRef;

  
  linkId: string | null = null;
  public generatedVendorId: string | null = null;
public vendorLink: string = "";
  isLinkVisible: boolean = false;
  public vendorData: any = null;
  
  steps = [
    { name: 'Business', icon: 'bi-briefcase' },
    { name: 'Personal', icon: 'bi-person' },
    { name: 'Bank', icon: 'bi-bank' },
    { name: 'Legal', icon: 'bi-file-earmark-text' },
    { name: 'Finish', icon: 'bi-check-circle' }
  ];
  
  currentStep = 0;
  forms: FormGroup[];
  showSignature = false;
  selectedDate: Date = null;


  businessForm: FormGroup;
  personalForm: FormGroup;
  BankForm: FormGroup;
  legalForm: FormGroup;
  finishForm: FormGroup;
  kycForm: FormGroup;


  // Store base64 strings
  passportBase64 ?: FileUpload;
  incorporationCertificateBase64 ?: FileUpload;
  companyChartBase64 ?: FileUpload;
  bankReferenceBase64?: FileUpload;
  financialStatementsBase64 ?: FileUpload;
  memorandumBase64 ?: FileUpload;
  signatureBase64 ?: FileUpload;
  // Preview storage (for UI display)
  previewMap: { [key: string]: SafeResourceUrl } = {};
  
previewFileBase64: SafeResourceUrl | null = null;
previewFileType: string | null = null;
  showPassport: boolean;
  showIncorporationCert: boolean;
  showCompanyChart: boolean;
  showBankReference: boolean;
  showFinancialStatements: boolean;
  showMemorandum: boolean;

  constructor(private fb: FormBuilder, private http: HttpClient, private service: GeneralserviceService,private sanitizer: DomSanitizer,private route: ActivatedRoute) {
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',  // 👈 input format
      containerClass: 'theme-default', // 👈 optional styling (theme-blue, theme-dark, etc.)
      showWeekNumbers: false           // 👈 optional
    };
    this.businessForm = this.fb.group({
      registeredCounterparty: ['', Validators.required],
      parentCompany: [''],
      registeredAddress: ['',Validators.required],
      headOfficeAddress: [''],
      website: [''],
      incorporationDate: [''],
      incorporationCountry: [''],
      registrationNumber: ['',Validators.required],
      taxNumber: [''],
      stockExchange: [''],
      quotedExchangeDetails: [''],
      beneficialOwnersDetails: [''],
      publicCompany: [false],
      privateCompany: [false],
      partnership: [false],
      individual: [false],
      governmentEntity: [false]
    });

    this.personalForm = this.fb.group({
      cpname: ['',Validators.required],
      cptitle: [''],
      cptelephone: [''],
      cpmobile: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      cpfaxnumber: [''],
      cpemail: ['',[Validators.required, Validators.email]],
      opname: ['',Validators.required],
      optitle: [''],
      optelephone: [''],
      opmobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      opfaxnumber: [''],
      opemail: ['', [Validators.required, Validators.email]],
      cfname: ['',Validators.required],
      cftitle: [''],
      cftelephone: [''],
      cfmobile: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      cffaxnumber: [''],
      cfemail: ['', [Validators.required, Validators.email]],
      adname: ['',Validators.required],
      adtitle: [''],
      adtelephone: [''],
      admobile: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      adfaxnumber: [''],
      ademail: ['', [Validators.required, Validators.email]],
      dcaname: ['',Validators.required],
      dcatitle: [''],
      dcatelephone: [''],
      dcamobile: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      dcafaxnumber: [''],
      dcaemail: ['', [Validators.required, Validators.email]],
      dcbname: ['',Validators.required],
      dcbtitle: [''],
      dcbtelephone: [''],
      dcbmobile: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      dcbfaxnumber: [''],
      dcbemail: ['', [Validators.required, Validators.email]],




    });
    this.BankForm = this.fb.group({
      principalbankers: ['',Validators.required],
      branchaddress: [''],
      contactdetails: [''],
      bankdetails: [''],
      accountnumber: ['',Validators.required],
      accountname: [''],
      swiftcode: ['']
    });

    this.legalForm = this.fb.group({
      conform: [''],
      signature: [''],
      signatureName:[''],
      nationalId: ['',Validators.required],
      nationalIdReason: [''],

      incorporationId: [''],
      incorporationIdReason: [''],

      affiliation: [''],
      affiliationReason: [''],

      bankReference: [''],
      bankReferenceReason: [''],

      financialStatements: [''],
      financialStatementsReason: [''],

      memorandum: [''],
      memorandumReason: ['']


    });

    // this.kycForm = this.fb.group({

    // });
    this.finishForm = this.fb.group({
      position: [''],
      emailaddress: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],      
      date: ['']
    });
    
  this.patchCurrentDate();

    // const today = new Date();
    // const day = String(today.getDate()).padStart(2, '0');
    // const month = String(today.getMonth() + 1).padStart(2, '0');
    // const year = today.getFullYear();

    // const formattedDate = `${day}/${month}/${year}`; // dd/mm/yyyy
    // this.finishForm.patchValue({ date: formattedDate });
    
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    this.linkId = params.get('linkId');
    if(this.linkId) {
      this.loadVendorData(this.linkId); // Load data with linkId
    }
  });
    this.patchCurrentDate();
 
  // ... your existing init code

  this.legalForm.get('conform')?.valueChanges.subscribe(value => {
    this.showSignature = value;
  });
  

  // If you want to initialize showSignature based on current control value (like after reset)
  this.showSignature = this.legalForm.get('conform')?.value || false;
}


patchCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`; // dd-MM-yyyy

  this.finishForm.patchValue({ date: formattedDate });
}

 private loadVendorData(id: string): void {
    console.log(`Making API call to load vendor data for ID: ${id}`);
   
    this.vendorData = {
      id: id,
      name: `Vendor ${id}`,
      status: 'Pending Onboarding',
      // ... other vendor fields
    };
 
    // Swal.fire({
    //   icon: 'info',
    //   title: 'Vendor Data Loaded',
    //   text: `Loaded data for Vendor ID: ${id}`,
    //   timer: 2000,
    //   showConfirmButton: false,
    // });
    // this.resetVendorIdCounter();
  }





  // onPhoneInput(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   input.value = input.value.replace(/[^0-9]/g, ''); // Remove all non-digit chars
  //   // Update the form control value manually to keep in sync
  //   this.finishForm.get('phonenumber')?.setValue(input.value, { emitEvent: false });
  //   this.finishForm.get('cpmobile')?.setValue(input.value, { emitEvent: false });
  //   this.finishForm.get('opmobile')?.setValue(input.value, { emitEvent: false });
  //   this.finishForm.get('cfmobile')?.setValue(input.value, { emitEvent: false });
  //   this.finishForm.get('admobile')?.setValue(input.value, { emitEvent: false });
  //   this.finishForm.get('dcamobile')?.setValue(input.value, { emitEvent: false });
  //   this.finishForm.get('dcbmobile')?.setValue(input.value, { emitEvent: false });







  // }

  // onFileChange(event: Event, field: string): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     const base64 = reader.result as string;

  //     switch (field) {
  //       case 'national': // Passport or national ID
  //         this.passportBase64 = base64;
  //         break;

  //       case 'incorporation':
  //         this.incorporationCertificateBase64 = base64;
  //         break;

  //       case 'affiliation':
  //         this.companyChartBase64 = base64;
  //         break;

  //       case 'bankreference':
  //         this.bankReferenceBase64 = base64;
  //         break;

  //       case 'financial':
  //         this.financialStatementsBase64 = base64;
  //         break;

  //       case 'memorandum':
  //         this.memorandumBase64 = base64;
  //         break;

  //       case 'signature':
  //         this.signatureBase64 = base64;
  //         break;

  //       default:
  //         console.warn(`Unhandled file field: ${field}`);
  //         break;
  //     }
  //   };

  //   reader.readAsDataURL(file); // Converts to base64 string with MIME type
  // }

  onPhoneInput(event: Event, form: FormGroup, controlName: string) {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^0-9]/g, ''); // keep only digits
    input.value = cleanedValue; // update the visible input box
    form.get(controlName)?.setValue(cleanedValue, { emitEvent: false });
  }

  
    onFileChange(event: Event, field: string): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (file.size > 1048576) {
  alert("File size must be less than 1 MB!");
  (event.target as HTMLInputElement).value = "";
  return;
}

  const reader = new FileReader();

  reader.onload = () => {
    const base64WithPrefix = reader.result as string;

    // Example: "data:application/pdf;base64,JVBERi0xLjQK..."
    const base64 = base64WithPrefix.split(',')[1]; // remove the "data:*/*;base64," part

    const fileObj = {
      filename: file.name,
      data: base64,
      contentType: file.type
    };

    switch (field) {
      case 'national': // Passport or national ID
        this.passportBase64 = fileObj;
        break;

      case 'incorporation':
        this.incorporationCertificateBase64 = fileObj;
        break;

      case 'affiliation':
        this.companyChartBase64 = fileObj;
        break;

      case 'bankreference':
        this.bankReferenceBase64 = fileObj;
        break;

      case 'financial':
        this.financialStatementsBase64 = fileObj;
        break;

      case 'memorandum':
        this.memorandumBase64 = fileObj;
        break;

      case 'sign':
        this.signatureBase64 = fileObj;
        break;

      default:
        console.warn(`Unhandled file field: ${field}`);
        return;
    }
     // Save preview URL for UI
      this.previewMap[field] = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:${file.type};base64,${base64}`
      );
  };

  reader.readAsDataURL(file);
}


//   onPreviewClick(field: string): void {
//   let fileData: string | null = null;

//   switch (field) {
//     case 'national':
//       fileData = this.passportBase64;
//       break;
//     case 'incorporation':
//       fileData = this.incorporationCertificateBase64;
//       break;
//     case 'affiliation':
//       fileData = this.companyChartBase64;
//       break;
//     case 'bankreference':
//       fileData = this.bankReferenceBase64;
//       break;
//     case 'financial':
//       fileData = this.financialStatementsBase64;
//       break;
//     case 'memorandum':
//       fileData = this.memorandumBase64;
//       break;
//     default:
//       fileData = null;
//       break;
//   }

//   if (fileData) {
//     this.previewFileBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(fileData);
//   }
// }


previewType: 'image' | 'pdf' = 'image';


onPreviewClick(field: string): void {
  let fileObj: { filename: string; data: string; contentType: string } | null = null;

  switch (field) {
    case 'national':
      fileObj = this.passportBase64;
      break;
    case 'incorporation':
      fileObj = this.incorporationCertificateBase64;
      break;
    case 'affiliation':
      fileObj = this.companyChartBase64;
      break;
    case 'bankreference':
      fileObj = this.bankReferenceBase64;
      break;
    case 'financial':
      fileObj = this.financialStatementsBase64;
      break;
    case 'memorandum':
      fileObj = this.memorandumBase64;
      break;
    case 'sign':
      fileObj = this.signatureBase64;
      break;
    default:
      fileObj = null;
      break;
  }

  if (!fileObj) return;

  // rebuild Data URL
  const fileUrl = `data:${fileObj.contentType};base64,${fileObj.data}`;
  this.previewFileBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);

  // Determine type for modal display
  if (fileObj.contentType.startsWith('image/')) {
    this.previewType = 'image';
  } else if (fileObj.contentType === 'application/pdf') {
    this.previewType = 'pdf';
  }

  // Show modal
  const modalEl = document.getElementById('filePreviewModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}


//   private parseDate(rawDate: string): Date | null {
//   if (!rawDate) return null;

//   const [day, month, year] = rawDate.split('/');
//   if (!day || !month || !year) return null;

//   return new Date(+year, +month - 1, +day); // JS Date
// }

parseDate(value: any): string | null {
  if (!value) return null;

  // If already a Date object
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString().split('T')[0]; // "YYYY-MM-DD"
  }

  // If it's a string (from input type="date")
  if (typeof value === 'string' && value.trim() !== '') {
    return value;
  }

  return null;
}
private formatDateForBackend(date: any): string | null {
  if (!date) return null;

  // Case 1: Already a Date object
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Case 2: String in dd-MM-yyyy
  if (typeof date === 'string' && date.includes('-')) {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  }

  return null;
}







onSubmit(): void {
  // Validate finishForm first
  if (this.finishForm.invalid) {
    this.finishForm.markAllAsTouched();
    return;
  }

  const payload = {
    // linkId: this.linkId,
 
    corporateInformation: {
      fullRegisteredName: this.businessForm.value.registeredCounterparty || '',
      parentCompany: this.businessForm.value.parentCompany || '',
      registeredAddress: this.businessForm.value.registeredAddress || '',
      headOfficeAddress: this.businessForm.value.headOfficeAddress || '',
      website: this.businessForm.value.website || ''
    },

    companyRegistration: {
  incorporationDate: this.formatDateForBackend(this.businessForm.value.incorporationDate),    
  countryOfIncorporation: this.businessForm.value.incorporationCountry || '',
    gstOrVatNumber: this.businessForm.value.taxNumber || '',
    companyRegistrationNumber:this.businessForm.value.registrationNumber || '',
    stockExchange: this.businessForm.value.stockExchange || '',
    stockExchangeName:this.businessForm.value.quotedExchangeDetails|| '',
    ownerOfCompany:this.businessForm.value.beneficialOwnersDetails|| '',
        status: {
      publicCompany: this.businessForm.value.publicCompany || false,
      privateCompany: this.businessForm.value.privateCompany || false,
      partnership: this.businessForm.value.partnership || false,
      individual: this.businessForm.value.individual || false,
      govtEntity: this.businessForm.value.governmentEntity || false
    },
    },

  

    counterpartyPrimaryContactInfo: {
      name: this.personalForm.value.cpname || '',
      title: this.personalForm.value.cptitle || '',
      telephone: this.personalForm.value.cptelephone || '',
      mobile: this.personalForm.value.cpmobile || '',
      faxNumber: this.personalForm.value.cpfaxnumber || '',
      email: this.personalForm.value.cpemail || ''
    },

    operationsContactInfo: {
      name: this.personalForm.value.opname || '',
      title: this.personalForm.value.optitle || '',
      telephone: this.personalForm.value.optelephone || '',
      mobile: this.personalForm.value.opmobile || '',
      faxNumber: this.personalForm.value.opfaxnumber || '',
      email: this.personalForm.value.opemail || ''
    },

    financeContactInfo: {
      name: this.personalForm.value.cfname || '',
      title: this.personalForm.value.cftitle || '',
      telephone: this.personalForm.value.cftelephone || '',
      mobile: this.personalForm.value.cfmobile || '',
      faxNumber: this.personalForm.value.cffaxnumber || '',
      email: this.personalForm.value.cfemail || ''
    },

    accountingDepartmentContactInfo: {
      name: this.personalForm.value.adname || '',
      title: this.personalForm.value.adtitle || '',
      telephone: this.personalForm.value.adtelephone || '',
      mobile: this.personalForm.value.admobile || '',
      faxNumber: this.personalForm.value.adfaxnumber || '',
      email: this.personalForm.value.ademail || ''
    },

    directorsinfoA: {
      name: this.personalForm.value.dcaname || '',
      title: this.personalForm.value.dcatitle || '',
      telephone: this.personalForm.value.dcatelephone || '',
      mobile: this.personalForm.value.dcamobile || '',
      faxNumber: this.personalForm.value.dcafaxnumber || '',
      email: this.personalForm.value.dcaemail || ''
    },

    directorsinfoB: {
      name: this.personalForm.value.dcbname || '',
      title: this.personalForm.value.dcbtitle || '',
      telephone: this.personalForm.value.dcbtelephone || '',
      mobile: this.personalForm.value.dcbmobile || '',
      faxNumber: this.personalForm.value.dcbfaxnumber || '',
      email: this.personalForm.value.dcbemail || ''
    },

    bankingInformation: {
      principalBankersName: this.BankForm.value.principalbankers || '',
      branchAddress: this.BankForm.value.branchaddress || '',
      managerDetails: this.BankForm.value.contactdetails || '',
      bankDetails: this.BankForm.value.bankdetails || '',
      accountNumber: this.BankForm.value.accountnumber || '',
      accountName: this.BankForm.value.accountname || '',
      swiftCode: this.BankForm.value.swiftcode || ''
    },

    kycConfirmationRequirements: {
      conform: this.legalForm.value.conform || false,
      signature: this.signatureBase64 || null,
      signatureText: this.legalForm.value.signatureName || '',
    },

    kycDocumentationRequirements: {
      passport: this.passportBase64 || null,
      passportReason: this.legalForm.value.nationalIdReason || '',
      incorporationCertificate: this.incorporationCertificateBase64 || null,
      incorporationCertificateReason: this.legalForm.value.incorporationIdReason || '',
      companyChart: this.companyChartBase64 ||null,
      companyChartReason: this.legalForm.value.affiliationReason || '',
      bankReference: this.bankReferenceBase64 || null,
      bankReferenceReason: this.legalForm.value.bankReferenceReason || '',
      financialStatements: this.financialStatementsBase64 || null,
      financialStatementsReason: this.legalForm.value.financialStatementsReason || '',
      memorandum: this.memorandumBase64 || null,
      memorandumReason: this.legalForm.value.memorandumReason || ''
    },

    questionnaireInfo: {
      position: this.finishForm.value.position || '',
      email: this.finishForm.value.emailaddress || '',
      phoneNo: this.finishForm.value.phonenumber || '',
      date: this.formatDateForBackend(this.finishForm.value.date)
        },
    onboardStatus: 'Pending',
    level1ApprovalName:"",
  level1ApprovalDate:null,
  level2ApprovalName:"",
  level2ApprovalDate:null,
  level3ApprovalName:"",
  level3ApprovalDate:null,
  };

  this.service.onBoardCreation(payload).subscribe({
    next: (res:any) => {
      console.log('Vendor Onboarded Successfully:', res);
        this.generatedVendorId = res.data.onboardingId;
    this.linkId = res.data.linkId;
    this.vendorLink = res.data.linkUrl;

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        // text: 'Vendor Onboarded Successfully.',
         text: `Vendor ${this.linkId || this.generatedVendorId} onboarding data saved successfully.`,
        confirmButtonColor: '#3085d6'
      }).then(() => {
  this.businessForm.reset();
  this.personalForm.reset();
  this.BankForm.reset();
  this.legalForm.reset();
  this.finishForm.reset();

  // Reset file variables
  this.passportBase64 = null;
  this.incorporationCertificateBase64 = null;
  this.companyChartBase64 = null;
  this.bankReferenceBase64 = null;
  this.financialStatementsBase64 = null;
  this.memorandumBase64 = null;
  this.signatureBase64 = null;

  // Reset previewMap entries 👇
  this.previewMap = {
    national: null,
    incorporation: null,
    companyChart: null,
    bankReference: null,
    financialStatements: null,
    memorandum: null,
    signature: null
  };

  // Reset UI flags
  this.showPassport = false;
  this.showIncorporationCert = false;
  this.showCompanyChart = false;
  this.showBankReference = false;
  this.showFinancialStatements = false;
  this.showMemorandum = false;
  this.showSignature = false;

  this.patchCurrentDate();
  this.currentStep = 0;
});

    },
    error: (err) => {
      console.error('Error during onboarding submission:', err);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while submitting.',
        confirmButtonColor: '#d33'
      });
    }
  });
}

  // bsConfig = {
  //   dateInputFormat: 'DD-MM-YYYY'
  // };
 

 



  toggleSignature(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showSignature = checkbox.checked;

    // Optional: reset signature if unchecked
    if (!this.showSignature) {
      this.legalForm.patchValue({ signatureFile: null });
    }
  }

  goToStep(index: number) {
    if (index <= this.currentStep) {
      this.currentStep = index;
    }
  }
allowOnlyNumbers(event: KeyboardEvent) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault(); // block non-numeric keys
  }
}
allowPhoneCharacters(event: KeyboardEvent) {
  const allowedChars = /[0-9+\-\s]/; // digits, +, -, space
  const inputChar = String.fromCharCode(event.which ? event.which : event.keyCode);

  if (!allowedChars.test(inputChar)) {
    event.preventDefault(); // block letters and other symbols
  }
}


nextStep() {
  if (this.currentStep === 0) {
    // Step 1 validation
    if (this.businessForm.invalid) {
      this.businessForm.markAllAsTouched();
      return;
    }
  } else if (this.currentStep === 1) {
    // Step 2 validation
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }
  }else if (this.currentStep === 2) {
    // Step 3 validation
    if (this.BankForm.invalid) {
      this.BankForm.markAllAsTouched();
      return;
    }
  }else if (this.currentStep === 3) {
    // Step 4 validation
    if (this.legalForm.invalid) {
      this.legalForm.markAllAsTouched();
      return;
    }
  }

  if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;

      // Wait for DOM update
      setTimeout(() => {
        if (this.currentStep === 1 && this.cpNameInput) {
          this.cpNameInput.nativeElement.focus();
        }
        if (this.currentStep === 2 && this.principalbankersInput) {
          this.principalbankersInput.nativeElement.focus();
        }
        if (this.currentStep === 4 && this.positionInput) {
          this.positionInput.nativeElement.focus();
        }
      }, 100); // small delay ensures element is rendered
    }
  }




  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isCurrentFormValid(): boolean {
    if (this.currentStep === 0) {
      // this.businessForm.markAllAsTouched();
      return this.businessForm.valid;
    } else if (this.currentStep === 1) {
      // this.personalForm.markAllAsTouched();
      return this.personalForm.valid;
    }
    return true; // Other steps (like Finish) don't have forms
  }

  closePreview() {
  this.previewFileBase64 = null;
}

removePreview(type: string) {
  this.previewMap[type] = null;  // remove from preview
  this.legalForm.get(type)?.reset(); // reset form control (nationalId)
  
  // If you also keep base64 separately
  if (type === 'national') {
    this.passportBase64 = null;
  }
}

}
