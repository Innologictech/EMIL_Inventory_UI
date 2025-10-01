import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from 'bootstrap';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-vendor-approvals',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule,BsDatepickerModule],
  templateUrl: './vendor-approvals.component.html',
  styleUrl: './vendor-approvals.component.css'
})
export class VendorApprovalsComponent {
  bsConfig: Partial<BsDatepickerConfig>;
  
  onboardingRecords: any[] = [];
  isLoading = false;
  showPopup = false;
  remarks: string = '';
  searchText: string = '';
  vendorFormData: any;
  paginatedVendors: any[] = [];
  onboardingId: any;
  memorandumFileName: any;
  memorandumContentType: any;
  existingRecord: any;
  financialStatementsFileName: any;
  financialStatementsContentType: any;
  bankReferenceContentType: any;
  bankReferenceFileName: any;
  companyChartContentType: any;
  companyChartFileName: any;
  incorporationContentType: any;
  incorporationFileName: any;
  passportContentType: any;
  passportFileName: any;
  signatureFileName: any;
  signatureContentType: any;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private service: GeneralserviceService, private spinner: NgxSpinnerService, private sanitizer: DomSanitizer,private authService: AuthenticationService) {
     this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',  // 👈 input format
      containerClass: 'theme-default', // 👈 optional styling (theme-blue, theme-dark, etc.)
      showWeekNumbers: false           // 👈 optional
    };
   }
  showBpInfo = true;
  showPrimaryContacts = false;
  showBankDetails = false;
  showLegalDocs = false;
  showSourcingInfo = false;
  showAccountsValidation = false;
  approvalScreen: boolean = true;
  isViewScreen: boolean = false;
  isEditScreen: boolean = false; // Add this line
  selectedVendor: any = {};    // If not already declared
  showSignature = false;
  corporateForm!: FormGroup;
  personalForm!: FormGroup;
  BankForm!: FormGroup;
  sourceForm!: FormGroup;
  legalForm!: FormGroup;
  currentPage = 1;
  // totalPages: number = 1;
  totalEntries = 0;
  selectedEntries = 10;
  pages: number[] = [];
  entries = 10;
  allVendors: any[] = [];
  signaturePreview: string | null = null;
    showDownloadModal = false;
    downloadUrl: string | null = null;
    loginData: any;
      currentUser: any;
 

  uploadDocument(doc: any) {
    console.log('Upload clicked for:', doc.name);
    // Add file upload logic here
  }

  searchPinCode() {
    console.log('Searching for pin code:', this.selectedVendor.pinCode);
  }

  formatDateTime(dateString: string): string {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString; // Return original if formatting fails
    }
  }
  ngOnInit() {
         this.loginData =this.service.getLoginResponse()
     this.currentUser = this.authService.currentUser();
 
    if (this.legalForm && this.legalForm.get('directorsDocuments')) {
    console.log('Directors Document:', this.legalForm.get('directorsDocuments')?.value);
  } else {
    console.warn('Form or directorsDocuments control not ready yet');
  }
    this.corporateForm = this.fb.group({
      companyName: [''],
      parentCompany: [''],
      registeredAddress: [''],
      headOfficeAddress: [''],
      website: [''],
      incorporationDate: [''],
      registrationNumber: [''],
      incorporationCountry: [''],
      taxNumber: [''],
      stockExchange: [''],
      quotedExchangeDetails: [''],
      beneficialOwnersDetails: [''],
      publicCompany: [false],
      privateCompany: [false],
      partnership: [false],
      individual: [false],
      governmentEntity: [false],
    });
    this.personalForm = this.fb.group({
      // Counterparty Primary Contact Info
      cpname: [''],
      cptitle: [''],
      cptelephone: [''],
      cpmobile: [''],
      cpfaxnumber: [''],
      cpemail: [''],

      // Operations Contact Info
      opname: [''],
      optitle: [''],
      optelephone: [''],
      opmobile: [''],
      opfaxnumber: [''],
      opemail: [''],

      // Credit/Finance Contact Info
      cfname: [''],
      cftitle: [''],
      cftelephone: [''],
      cfmobile: [''],
      cffaxnumber: [''],
      cfemail: [''],

      // Accounting Department
      adname: [''],
      adtitle: [''],
      adtelephone: [''],
      admobile: [''],
      adfaxnumber: [''],
      ademail: [''],

      // Director A
      dcaname: [''],
      dcatitle: [''],
      dcatelephone: [''],
      dcamobile: [''],
      dcafaxnumber: [''],
      dcaemail: [''],

      // Director B
      dcbname: [''],
      dcbtitle: [''],
      dcbtelephone: [''],
      dcbmobile: [''],
      dcbfaxnumber: [''],
      dcbemail: [''],
    });
    this.BankForm = this.fb.group({
      principalbankers: [''],
      branchaddress: [''],
      contactdetails: [''],
      bankdetails: [''],
      accountnumber: [''],
      accountname: [''],
      swiftcode: ['']
    });
    this.legalForm = this.fb.group({
      // KYC Confirmation
      conform: ['', Validators.required],
      signature: ['', Validators.required],
      signatureName: ['', Validators.required],
      signatureFileName: [''],
      signatureContentType: [''],
 
      // KYC Documentation
      directorsDocuments: [null],
      directorsReason: [''],
      directorsDocumentsFileName: [''],
      directorsDocumentsType:[''],
      directorsDocumentsContentType: [''],
 
      certificateIncorporation: [null],
      certificateIncorporationFileName: [''],
      certificateIncorporationReason:[''],
      certificateIncorporationContentType: [''],
 
      orgChart: [null],
      orgChartReason: [''],
      orgChartFileName: [''],
      orgChartContentType: [''],
 
      bankReference: [null],
      bankReason: [''],
      bankReferenceContentType: [''],
      bankReferenceFileName: [''],
 
      financialStatements: [null],
      financialReason: [''],
      financialStatementsFileName:[''],
      financialStatementsType:[''],
      financialStatementsContentType:[''],
 
      memorandum: [null],
      memoranReason: [''],
      memorandumFileName: [''],
      memorandumContentType: ['']
    });
 
    this.sourceForm = this.fb.group({
      position: ['', Validators.required],
      emailaddress: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      date: ['', Validators.required]
    });
    this.loadOnboardingRecords();
  }
  onPhoneInput(event: any): void {
    const input = event.target.value.replace(/[^0-9]/g, ''); // only numbers
    event.target.value = input;
    this.sourceForm.get('phonenumber')?.setValue(input, { emitEvent: false });
  }

  private formatDateForUI(date: string | null): string {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;  // dd-MM-yyyy
}

onFileSelected(event: Event, field: string): void {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    return;
  }

  const file = input.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    const base64Data = (reader.result as string).split(',')[1];

    // Patch the form with file data
    this.legalForm.patchValue({
      [field]: `data:${file.type};base64,${base64Data}`,
      [`${field}FileName`]: file.name,     // ✅ make sure your form has `${field}FileName`
      [`${field}ContentType`]: file.type
    });

    // Reset the "removed" flag when new file uploaded
    (this.legalForm as any)[`${field}Removed`] = false;
  };

  reader.readAsDataURL(file);
}

// isSubmitDisabled(): boolean {
//   if (!this.selectedVendor) return true;

//   const currentUserApprovalLevel = (this.loginData?.data?.ApprovalLevels || '').toLowerCase();

//   // If user approvalLevel is level2 or level3, disable if level1Name doesn't exist
//   if (
//     (currentUserApprovalLevel === 'level2' || currentUserApprovalLevel === 'level3') &&
//     !this.selectedVendor.level1Name
//   ) {
//     return true;
//   }
//   return false;
// }
isSubmitDisabled(): boolean {
  if (!this.selectedVendor) {
    console.log('Submit disabled: no selectedVendor');
    return true;
  }

  const currentUserApprovalLevel = (this.loginData?.data?.ApprovalLevels || '').toLowerCase();

  console.log('Current user approval level:', currentUserApprovalLevel);
  console.log('Vendor:', this.selectedVendor);

  if (currentUserApprovalLevel === 'level2') {
    // Level2 should only be enabled if Level1 is already approved
    const disabled = !this.selectedVendor.level1ApprovalName;
    console.log('Level2 user submit disabled:', disabled);
    return disabled;
  }

  if (currentUserApprovalLevel === 'level3') {
    // Level3 should only be enabled if Level2 is already approved
    const disabled = !this.selectedVendor.level2ApprovalName;
    console.log('Level3 user submit disabled:', disabled);
    return disabled;
  }

  // For Level1 or other roles → allow submit by default
  console.log('Default submit enabled');
  return false;
}





 





  // get filteredVendors(): any[] {
  //   const searchTextLower = this.searchText?.toLowerCase() ?? '';

  //   // Filter based on search text
  //   const filtered = this.allVendors.filter(record => {
  //     const companyName = record.corporateInformation.fullRegisteredName?.toLowerCase() ?? '';
  //     const country = record.reg_countryOfIncorporation?.toLowerCase() ?? '';
  //     const status = record.Status?.toLowerCase() ?? '';
  //     return companyName.includes(searchTextLower) ||
  //       country.includes(searchTextLower) || status.includes(searchTextLower);
  //   });

  //   this.totalEntries = filtered.length;

  //   // Calculate pagination
  //   const start = (this.currentPage - 1) * this.selectedEntries;
  //   const end = start + this.selectedEntries;

  //   return filtered.slice(start, end);
  // }


  // vendors = [
  //  {
  //   id: 1924,
  //   name: 'Retail Solution and Technologies',
  //   state: 'Tamilnadu',
  //   status: 'Approved',
  //   level1Name: 'Kishore Kumar',
  //   level1Date: '02-Aug-2025 09:18:06',
  //   level2Name: 'Dept Head - IT',
  //   level2Date: '04-Aug-2025 17:04:23',
  //   level3Name: 'Taxation Team',
  //   level3Date: '05-Aug-2025 09:16:56',
  //   date: '02-Aug-2025 09:18:06'
  // },
  // {
  //   id: 1868,
  //   name: 'Innovate Network Solutions',
  //   state: 'Maharashtra',
  //   status: 'Approved',
  //   level1Name: 'Kishore Kumar',
  //   level1Date: '02-Jul-2025 14:19:20',
  //   level2Name: 'Dept Head - IT',
  //   level2Date: '14-Jul-2025 15:40:39',
  //   level3Name: 'Taxation Team',
  //   level3Date: '14-Jul-2025 17:24:42',
  //   date: '02-Jul-2025 14:19:20'
  // }

  // ];

  // get filteredVendors() {
  //   return this.vendors.filter(v =>
  //     v.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     v.state.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }

  get filteredVendors(): any[] {
  const searchTextLower = this.searchText?.toLowerCase() ?? '';

  const filtered = this.allVendors.filter(record => {
    const companyName =
      record.corporateInformation?.fullRegisteredName?.toLowerCase() ?? '';

    // country not available in your current response
    // so fallback to incorporationDate or something else later
    const country =
      record.companyRegistration?.countryOfIncorporation?.toLowerCase() ?? '';

    // build status string from status object
    let status = '';
    if (record.companyRegistration?.status) {
      const statusObj = record.companyRegistration.status;
      status = Object.keys(statusObj)
        .filter(key => statusObj[key] === true) // pick true values
        .join(', ')
        .toLowerCase();
    }

    return (
      companyName.includes(searchTextLower) ||
      country.includes(searchTextLower) ||
      status.includes(searchTextLower)
    );
  });

  this.totalEntries = filtered.length;

  const start = (this.currentPage - 1) * this.selectedEntries;
  const end = start + this.selectedEntries;

  return filtered.slice(start, end);
}

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }


  // onEdit(vendor: any) {
  //   this.selectedVendor = { ...vendor };
  //   this.isEditScreen = true;
  //   this.approvalScreen =false;

  // }
  
onEdit(vendor: any): void {
  console.log("selected vendorrr", vendor);
  this.isEditScreen = true;
  this.isViewScreen = false;
  this.approvalScreen = false;
  this.selectedVendor = vendor;
  this.existingRecord=vendor;
  this.onboardingId = vendor.onboardingId;
 
  // ✅ Re-enable all forms so they are editable again
  this.corporateForm.enable();
  this.personalForm.enable();
  this.BankForm.enable();
  this.legalForm.enable();
  this.sourceForm.enable();
 
  // --- Now patch values ---
  this.corporateForm.patchValue({
    companyName: vendor.corporateInformation.fullRegisteredName,
    parentCompany: vendor.corporateInformation.parentCompany,
    registeredAddress: vendor.corporateInformation.registeredAddress,
    headOfficeAddress: vendor.corporateInformation.headOfficeAddress,
    website: vendor.corporateInformation.website,
 
    incorporationDate: this.formatDateForUI(vendor.companyRegistration.incorporationDate),
    registrationNumber: vendor.companyRegistration.companyRegistrationNumber,
    incorporationCountry: vendor.companyRegistration.countryOfIncorporation,
    taxNumber: vendor.companyRegistration.gstOrVatNumber,
    stockExchange: vendor.companyRegistration.stockExchange,
    quotedExchangeDetails: vendor.companyRegistration.stockExchangeName,
    beneficialOwnersDetails: vendor.companyRegistration.ownerOfCompany,
 
    publicCompany: vendor.companyRegistration.status.publicCompany,
    privateCompany: vendor.companyRegistration.status.privateCompany,
    partnership: vendor.companyRegistration.status.partnership,
    individual: vendor.companyRegistration.status.individual,
    governmentEntity: vendor.companyRegistration.status.governmentEntry
  });
 
  this.personalForm.patchValue({
    cpname: vendor.counterpartyPrimaryContactInfo.name,
    cptitle: vendor.counterpartyPrimaryContactInfo.title,
    cptelephone: vendor.counterpartyPrimaryContactInfo.telephone,
    cpmobile: vendor.counterpartyPrimaryContactInfo.mobile,
    cpfaxnumber: vendor.counterpartyPrimaryContactInfo.faxNumber,
    cpemail: vendor.counterpartyPrimaryContactInfo.email,
 
    opname: vendor.operationsContactInfo.name,
    optitle: vendor.operationsContactInfo.title,
    optelephone: vendor.operationsContactInfo.telephone,
    opmobile: vendor.operationsContactInfo.mobile,
    opfaxnumber: vendor.operationsContactInfo.faxNumber,
    opemail: vendor.operationsContactInfo.email,
 
    cfname: vendor.financeContactInfo.name,
    cftitle: vendor.financeContactInfo.title,
    cftelephone: vendor.financeContactInfo.telephone,
    cfmobile: vendor.financeContactInfo.mobile,
    cffaxnumber: vendor.financeContactInfo.faxNumber,
    cfemail: vendor.financeContactInfo.email,
 
    adname: vendor.accountingDepartmentContactInfo.name,
    adtitle: vendor.accountingDepartmentContactInfo.title,
    adtelephone: vendor.accountingDepartmentContactInfo.telephone,
    admobile: vendor.accountingDepartmentContactInfo.mobile,
    adfaxnumber: vendor.accountingDepartmentContactInfo.faxNumber,
    ademail: vendor.accountingDepartmentContactInfo.email,
 
    dcaname: vendor.directorsinfoA.name,
    dcatitle: vendor.directorsinfoA.title,
    dcatelephone: vendor.directorsinfoA.telephone,
    dcamobile: vendor.directorsinfoA.mobile,
    dcafaxnumber: vendor.directorsinfoA.faxNumber,
    dcaemail: vendor.directorsinfoA.email,
 
    dcbname: vendor.directorsinfoB.name,
    dcbtitle: vendor.directorsinfoB.title,
    dcbtelephone: vendor.directorsinfoB.telephone,
    dcbmobile: vendor.directorsinfoB.mobile,
    dcbfaxnumber: vendor.directorsinfoB.faxNumber,
    dcbemail: vendor.directorsinfoB.email,
  });
 
  this.BankForm.patchValue({
    principalbankers: vendor.bankingInformation.principalBankersName,
    branchaddress: vendor.bankingInformation.branchAddress,
    contactdetails: vendor.bankingInformation.managerDetails,
    bankdetails: vendor.bankingInformation.bankDetails,
    accountnumber: vendor.bankingInformation.accountNumber,
    accountname: vendor.bankingInformation.accountName,
    swiftcode: vendor.bankingInformation.swiftCode,
  });
 
this.legalForm.patchValue({
conform: (this.legalForm as any).conformRemoved
  ? null
  : vendor.kycConfirmationRequirements?.conform
    ?? this.legalForm.get('conform')?.value,

signatureName: (this.legalForm as any).signatureRemoved
  ? null
  : vendor.kycConfirmationRequirements?.signatureText
    ?? this.legalForm.get('signatureName')?.value,

signature: (this.legalForm as any).signatureRemoved
  ? null
  : vendor.kycConfirmationRequirements?.signature
    ? `data:${vendor.kycConfirmationRequirements.signature.contentType};base64,${vendor.kycConfirmationRequirements.signature.data}`
    : null,

signatureFileName: (this.legalForm as any).signatureRemoved
  ? null
  : vendor.kycConfirmationRequirements?.signature?.filename,

signatureContentType: (this.legalForm as any).signatureRemoved
  ? null
  : vendor.kycConfirmationRequirements?.signature?.contentType,


directorsDocuments: (this.legalForm as any).directorsDocumentsRemoved
  ? null
  : vendor.kycDocumentationRequirements?.passport
    ? `data:${vendor.kycDocumentationRequirements.passport.contentType};base64,${vendor.kycDocumentationRequirements.passport.data}`
    : null,

directorsDocumentsFileName: (this.legalForm as any).directorsDocumentsRemoved
  ? null
  : vendor.kycDocumentationRequirements?.passport?.filename,

directorsDocumentsContentType: (this.legalForm as any).directorsDocumentsRemoved
  ? null
  : vendor.kycDocumentationRequirements?.passport?.contentType,

directorsReason: this.legalForm.value.passportReason   // ✅ use the text field only
  ?? this.existingRecord?.kycDocumentationRequirements?.passportReason
  ?? '',

  

  certificateIncorporation: (this.legalForm as any).certificateIncorporationRemoved
    ? null
    : vendor.kycDocumentationRequirements?.incorporationCertificate
      ? `data:${vendor.kycDocumentationRequirements.incorporationCertificate.contentType};base64,${vendor.kycDocumentationRequirements.incorporationCertificate.data}`
      : null,

  certificateIncorporationFileName: (this.legalForm as any).certificateIncorporationRemoved
    ? null
    : vendor.kycDocumentationRequirements?.incorporationCertificate?.filename,

  certificateIncorporationContentType: (this.legalForm as any).certificateIncorporationRemoved
    ? null
    : vendor.kycDocumentationRequirements?.incorporationCertificate?.contentType,

  

 certificateIncorporationReason: this.legalForm.value.incorporationCertificateReason   // ✅ use the text field only
  ?? this.existingRecord?.kycDocumentationRequirements?.incorporationCertificateReason
  ?? '',

 
 
  orgChart: (this.legalForm as any).orgChartRemoved
  ? null
  : vendor.kycDocumentationRequirements?.companyChart
    ? `data:${vendor.kycDocumentationRequirements.companyChart.contentType};base64,${vendor.kycDocumentationRequirements.companyChart.data}`
    : null,

orgChartFileName: (this.legalForm as any).orgChartRemoved
  ? null
  : vendor.kycDocumentationRequirements?.companyChart?.filename,

orgChartContentType: (this.legalForm as any).orgChartRemoved
  ? null
  : vendor.kycDocumentationRequirements?.companyChart?.contentType,

orgChartReason: this.legalForm.value.companyChartReason   // ✅ Always take from text field
  ?? this.existingRecord?.kycDocumentationRequirements?.companyChartReason
  ?? '',

 
  // 🏦 Bank Reference
bankReference: (this.legalForm as any).bankReferenceRemoved
  ? null
  : vendor.kycDocumentationRequirements?.bankReference
    ? `data:${vendor.kycDocumentationRequirements.bankReference.contentType};base64,${vendor.kycDocumentationRequirements.bankReference.data}`
    : null,

bankReferenceFileName: (this.legalForm as any).bankReferenceRemoved
  ? null
  : vendor.kycDocumentationRequirements?.bankReference?.filename,

bankReferenceContentType: (this.legalForm as any).bankReferenceRemoved
  ? null
  : vendor.kycDocumentationRequirements?.bankReference?.contentType,

bankReason: this.legalForm.value.bankReferenceReason   // ✅ Always take from text field
  ?? this.existingRecord?.kycDocumentationRequirements?.bankReferenceReason
  ?? '',

 
financialStatements: (this.legalForm as any).financialStatementsRemoved
  ? null
  : vendor.kycDocumentationRequirements?.financialStatements
    ? `data:${vendor.kycDocumentationRequirements.financialStatements.contentType};base64,${vendor.kycDocumentationRequirements.financialStatements.data}`
    : null,

financialStatementsFileName: (this.legalForm as any).financialStatementsRemoved
  ? null
  : vendor.kycDocumentationRequirements?.financialStatements?.filename,

financialStatementsContentType: (this.legalForm as any).financialStatementsRemoved
  ? null
  : vendor.kycDocumentationRequirements?.financialStatements?.contentType,

financialReason: this.legalForm.value.financialStatementsReason
  ?? this.existingRecord?.kycDocumentationRequirements?.financialStatementsReason
  ?? '',
 
memorandum: (this.legalForm as any).memorandumRemoved
  ? null
  : vendor.kycDocumentationRequirements?.memorandum
    ? `data:${vendor.kycDocumentationRequirements.memorandum.contentType};base64,${vendor.kycDocumentationRequirements.memorandum.data}`
    : null,

memorandumFileName: (this.legalForm as any).memorandumRemoved
  ? null
  : vendor.kycDocumentationRequirements?.memorandum?.filename,

memorandumContentType: (this.legalForm as any).memorandumRemoved
  ? null
  : vendor.kycDocumentationRequirements?.memorandum?.contentType,

memoranReason: this.legalForm.value.memorandumReason
  ?? this.existingRecord?.kycDocumentationRequirements?.memorandumReason
  ?? '',

});
 
 
  if (vendor.kycConfirmationRequirements?.conform) {
    this.legalForm.get('conform')?.setValue(true);
    this.showSignature = true;
  }
 
  this.sourceForm.patchValue({
    position: vendor.questionnaireInfo.position,
    emailaddress: vendor.questionnaireInfo.email,
    phonenumber: vendor.questionnaireInfo.phoneNo,
    date: this.formatDateForUI(vendor.questionnaireInfo.date)
  });
}
 
onSignatureFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    // reader.result is like "data:image/png;base64,AAA..."
    this.legalForm.patchValue({
      signature: reader.result,          // base64 string
      signatureFileName: file.name,
      signatureContentType: file.type
    });

    // Clear removed flag if uploading new file
    (this.legalForm as any).signatureRemoved = false;
  };
  reader.readAsDataURL(file);
}


 


// bufferToBase64(bufferObj: any): string {
//   if (!bufferObj) return '';
//   const raw = bufferObj.data ? bufferObj.data : bufferObj;
//   const bytes = new Uint8Array(raw);
//   let binary = '';
//   const len = bytes.byteLength;
//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return btoa(binary);
// }


bufferToBase64(buffer: number[]): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}



bufferToBase64Flexible(bufferObj: any): string {
  if (!bufferObj) return '';
  const raw = bufferObj.data ? bufferObj.data : bufferObj;
  return this.bufferToBase64(raw);
}






  submitVendorForm() {
    console.log('Vendor form submitted:', this.selectedVendor);
    this.isEditScreen = false; // close popup and show table again
    this.showPopup = true;
  }

  getImageExtension(base64: string): string {
    // If API provides extension in another field, use that instead
    // This fallback assumes PNG if no info available
    if (!base64) return 'png';

    // You can try detecting common magic numbers
    if (base64.startsWith('/9j/')) return 'jpeg'; // JPEG/JPG magic number
    if (base64.startsWith('iVBOR')) return 'png'; // PNG magic number
    if (base64.startsWith('R0lGOD')) return 'gif'; // GIF magic number

    return 'png'; // default
  }


  // onView(vendor: any) {
  //   this.selectedVendor = { ...vendor };
  //   this.isViewScreen = true;
  //   this.isEditScreen = false;
  //   this.approvalScreen = false;
  // }

onView(vendor: any): void {
  console.log("vendorrrrrrrrrrrrr", vendor);
  this.isViewScreen = true;
  this.isEditScreen = false;
  this.approvalScreen = false;
  this.selectedVendor = vendor;
  this.onboardingId = vendor.onboardingId;

  // --- Corporate Form ---
  this.corporateForm.patchValue({
    companyName: vendor.corporateInformation.fullRegisteredName,
    parentCompany: vendor.corporateInformation.parentCompany,
    registeredAddress: vendor.corporateInformation.registeredAddress,
    headOfficeAddress: vendor.corporateInformation.headOfficeAddress,
    website: vendor.corporateInformation.website,

    incorporationDate: this.formatDateForUI(vendor.companyRegistration.incorporationDate),
    registrationNumber: vendor.companyRegistration.companyRegistrationNumber,
    incorporationCountry: vendor.companyRegistration.countryOfIncorporation,
    taxNumber: vendor.companyRegistration.gstOrVatNumber,
    stockExchange: vendor.companyRegistration.stockExchange,
    quotedExchangeDetails: vendor.companyRegistration.stockExchangeName,
    beneficialOwnersDetails: vendor.companyRegistration.ownerOfCompany,

    publicCompany: vendor.companyRegistration.status.publicCompany,
    privateCompany: vendor.companyRegistration.status.privateCompany,
    partnership: vendor.companyRegistration.status.partnership,
    individual: vendor.companyRegistration.status.individual,
    governmentEntity: vendor.companyRegistration.status.governmentEntry
  });

  // --- Personal Form ---
  this.personalForm.patchValue({
    cpname: vendor.counterpartyPrimaryContactInfo.name,
    cptitle: vendor.counterpartyPrimaryContactInfo.title,
    cptelephone: vendor.counterpartyPrimaryContactInfo.telephone,
    cpmobile: vendor.counterpartyPrimaryContactInfo.mobile,
    cpfaxnumber: vendor.counterpartyPrimaryContactInfo.faxNumber,
    cpemail: vendor.counterpartyPrimaryContactInfo.email,

    opname: vendor.operationsContactInfo.name,
    optitle: vendor.operationsContactInfo.title,
    optelephone: vendor.operationsContactInfo.telephone,
    opmobile: vendor.operationsContactInfo.mobile,
    opfaxnumber: vendor.operationsContactInfo.faxNumber,
    opemail: vendor.operationsContactInfo.email,

    cfname: vendor.financeContactInfo.name,
    cftitle: vendor.financeContactInfo.title,
    cftelephone: vendor.financeContactInfo.telephone,
    cfmobile: vendor.financeContactInfo.mobile,
    cffaxnumber: vendor.financeContactInfo.faxNumber,
    cfemail: vendor.financeContactInfo.email,

    adname: vendor.accountingDepartmentContactInfo.name,
    adtitle: vendor.accountingDepartmentContactInfo.title,
    adtelephone: vendor.accountingDepartmentContactInfo.telephone,
    admobile: vendor.accountingDepartmentContactInfo.mobile,
    adfaxnumber: vendor.accountingDepartmentContactInfo.faxNumber,
    ademail: vendor.accountingDepartmentContactInfo.email,

    dcaname: vendor.directorsinfoA.name,
    dcatitle: vendor.directorsinfoA.title,
    dcatelephone: vendor.directorsinfoA.telephone,
    dcamobile: vendor.directorsinfoA.mobile,
    dcafaxnumber: vendor.directorsinfoA.faxNumber,
    dcaemail: vendor.directorsinfoA.email,

    dcbname: vendor.directorsinfoB.name,
    dcbtitle: vendor.directorsinfoB.title,
    dcbtelephone: vendor.directorsinfoB.telephone,
    dcbmobile: vendor.directorsinfoB.mobile,
    dcbfaxnumber: vendor.directorsinfoB.faxNumber,
    dcbemail: vendor.directorsinfoB.email,
  });

  // --- Bank Form ---
  this.BankForm.patchValue({
    principalbankers: vendor.bankingInformation.principalBankersName,
    branchaddress: vendor.bankingInformation.branchAddress,
    contactdetails: vendor.bankingInformation.managerDetails,
    bankdetails: vendor.bankingInformation.bankDetails,
    accountnumber: vendor.bankingInformation.accountNumber,
    accountname: vendor.bankingInformation.accountName,
    swiftcode: vendor.bankingInformation.swiftCode,
  });

  // --- Legal Form ---
  this.legalForm.patchValue({
    conform: vendor.kycConfirmationRequirements?.conform || false,
    signatureName: vendor.kycConfirmationRequirements?.signatureText || '',
    signature: vendor.kycConfirmationRequirements?.signature
      ? `data:${vendor.kycConfirmationRequirements.signature.contentType};base64,${vendor.kycConfirmationRequirements.signature.data}`
      : null,
    directorsDocuments: vendor.kycDocumentationRequirements?.passport
      ? `data:${vendor.kycDocumentationRequirements.passport.contentType};base64,${vendor.kycDocumentationRequirements.passport.data}`
      : null,
    directorsReason: vendor.kycDocumentationRequirements?.passportReason,
    certificateIncorporation: vendor.kycDocumentationRequirements?.incorporationCertificate
      ? `data:${vendor.kycDocumentationRequirements.incorporationCertificate.contentType};base64,${vendor.kycDocumentationRequirements.incorporationCertificate.data}`
      : null,
    certificateIncorporationReason: vendor.kycDocumentationRequirements?.incorporationCertificateReason,
    orgChart: vendor.kycDocumentationRequirements?.companyChart
      ? `data:${vendor.kycDocumentationRequirements.companyChart.contentType};base64,${vendor.kycDocumentationRequirements.companyChart.data}`
      : null,
    orgChartReason: vendor.kycDocumentationRequirements?.companyChartReason,
    bankReference: vendor.kycDocumentationRequirements?.bankReference
      ? `data:${vendor.kycDocumentationRequirements.bankReference.contentType};base64,${vendor.kycDocumentationRequirements.bankReference.data}`
      : null,
    bankReason: vendor.kycDocumentationRequirements?.bankReferenceReason,
    financialStatements: vendor.kycDocumentationRequirements?.financialStatements
      ? `data:${vendor.kycDocumentationRequirements.financialStatements.contentType};base64,${vendor.kycDocumentationRequirements.financialStatements.data}`
      : null,
    financialReason: vendor.kycDocumentationRequirements?.financialStatementsReason,
    memorandum: vendor.kycDocumentationRequirements?.memorandum
      ? `data:${vendor.kycDocumentationRequirements.memorandum.contentType};base64,${vendor.kycDocumentationRequirements.memorandum.data}`
      : null,
    memoranReason: vendor.kycDocumentationRequirements?.memorandumReason,
  });

  if (vendor.kycConfirmationRequirements?.conform) {
    this.legalForm.get('conform')?.setValue(true);
    this.showSignature = true;
  }

  // --- Source Form ---
  this.sourceForm.patchValue({
    position: vendor.questionnaireInfo.position,
    emailaddress: vendor.questionnaireInfo.email,
    phonenumber: vendor.questionnaireInfo.phoneNo,
    date: this.formatDateForUI(vendor.questionnaireInfo.date)
  });

  // --- Disable forms → readonly ---
  this.corporateForm.disable();
  this.personalForm.disable();
  this.BankForm.disable();
  this.legalForm.disable();
  this.sourceForm.disable();
}




onDownload(v: any) {
   const payload = {
    kycDocumentationRequirements: v.kycDocumentationRequirements,
    vendorRowData: v   // send full row data for excel
  };
 
  // Call API first
  this.service.downloadVendorProfile(payload).subscribe({
    next: (blob: Blob) => {
      // save blob url in memory for popup
      const url = window.URL.createObjectURL(blob);
 
      // Open modal and pass vendor name + url
      // this.selectedVendor = v.vendorName;   // vendor name from row
       this.selectedVendor = v.corporateInformation?.fullRegisteredName;
      this.downloadUrl = url;
      this.showDownloadModal = true;        // open popup
    },
    error: (err) => {
      console.error("Download failed", err);
    }
  });
}
 
// User clicks inside modal
onConfirmDownload() {
  if (this.downloadUrl) {
    const a = document.createElement("a");
    a.href = this.downloadUrl;
    a.download = "vendor_profile.zip";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(this.downloadUrl);
    a.remove();
    this.showDownloadModal = false;
  }
}
 
  
  toggleSection(section: string, event?: Event) {
    if (event) {
      event.stopPropagation(); // prevent double toggle when button clicked
    }
    switch (section) {
      case 'bpInfo':
        this.showBpInfo = !this.showBpInfo;
        break;
      case 'primaryContacts':
        this.showPrimaryContacts = !this.showPrimaryContacts;
        break;
      case 'bankDetails':
        this.showBankDetails = !this.showBankDetails;
        break;
      case 'legalDocs':
        this.showLegalDocs = !this.showLegalDocs;
        break;
      case 'sourcingInfo':
        this.showSourcingInfo = !this.showSourcingInfo;
        break;
    }
  }
  
loadOnboardingRecords() {
    // this.isLoading = true;
    this.spinner.show()
    this.service.getAllOnboardingRecords().subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response.data && response.data.length > 0) {
// this.allVendors = response.data.map((v: any) => {
//           // Initialize level values empty
//           v.level1Name = '';
//           v.level1Date = '';
//           v.level2Name = '';
//           v.level2Date = '';
//           v.level3Name = '';
//           v.level3Date = '';
 
//           // Patch approval based on approvalLevel
//           if (v.approvalLevel === 'level1') {
//             v.level1Name = v.approvalName;
//             v.level1Date = v.approvalDate;
//           } else if (v.approvalLevel === 'level2') {
//             v.level2Name = v.approvalName;
//             v.level2Date = v.approvalDate;
//           } else if (v.approvalLevel === 'level3') {
//             v.level3Name = v.approvalName;
//             v.level3Date = v.approvalDate;
//           }
 
//           return v;
//         });
          // this.onboardingRecords = response.data;
          this.allVendors = response.data;
          this.spinner.hide()
          this.totalEntries = this.allVendors.length;
        } else {
          this.spinner.hide()
          console.log(response.message); // "No Onboarding Records Available"
          this.allVendors = [];
          this.totalEntries = 0;
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching onboarding records:', error);
      }
    );
  }
 

  openRemarksPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.remarks = '';
  }

  // submitRemarks() {
  //   console.log('Remarks submitted:', this.remarks);
  //   console.log('Vendor form submitted:', this.vendorFormData);

  //   this.closePopup();

  //   // Simulate form submission and redirect
  //   setTimeout(() => {
  //     this.approvalScreen = true // Adjust route as needed
  //   }, 500);
  // }

 


updateVendor(): void {
  // if (!this.selectedVendor) return;
  // console.log("selected vendor",this.selectedVendor);
  const approvalTimestamp = new Date().toISOString();
  if (!this.selectedVendor) return;
const approvalLevel = this.loginData?.data?.ApprovalLevels || '';
const approvalName = `${this.loginData?.data?.FirstName || ''} ${this.loginData?.data?.LastName || ''}`.trim();
 
  console.log('approvalLevel:', approvalLevel);
 
 
  const getBase64Data = (fileData: string | null | undefined): string | null => {
  if (!fileData) return null; // empty or undefined
 
  // If the string contains "base64," prefix, remove it
  if (fileData.includes("base64,")) {
    return fileData.split("base64,")[1];
  }
 
  // Otherwise assume it is already clean base64
  return fileData;
};
 
  const updatedVendor = {
    onboardingId: this.onboardingId,
 
    corporateInformation: {
      fullRegisteredName: this.corporateForm.value.companyName,
      parentCompany: this.corporateForm.value.parentCompany,
      registeredAddress: this.corporateForm.value.registeredAddress,
      headOfficeAddress: this.corporateForm.value.headOfficeAddress,
      website: this.corporateForm.value.website
    },
 
  companyRegistration: {
  incorporationDate: this.corporateForm.value.incorporationDate,
  countryOfIncorporation: this.corporateForm.value.incorporationCountry,
  companyRegistrationNumber: this.corporateForm.value.registrationNumber,
  gstOrVatNumber: this.corporateForm.value.taxNumber,
  stockExchange: this.corporateForm.value.stockExchange,
  stockExchangeName: this.corporateForm.value.quotedExchangeDetails, // ✅ fix here
  ownerOfCompany: this.corporateForm.value.beneficialOwnersDetails,  // ✅ fix here
  status: {
    publicCompany: this.corporateForm.value.publicCompany,
    privateCompany: this.corporateForm.value.privateCompany,
    partnership: this.corporateForm.value.partnership,
    individual: this.corporateForm.value.individual,
    govtEntity: this.corporateForm.value.governmentEntity
  }
},

   
 
 
    counterpartyPrimaryContactInfo: {
      name: this.personalForm.value.cpname,
      title: this.personalForm.value.cptitle,
      telephone: this.personalForm.value.cptelephone,
      mobile: this.personalForm.value.cpmobile,
      faxNumber: this.personalForm.value.cpfaxnumber,
      email: this.personalForm.value.cpemail
    },
 
    operationsContactInfo: {
      name: this.personalForm.value.opname,
      title: this.personalForm.value.optitle,
      telephone: this.personalForm.value.optelephone,
      mobile: this.personalForm.value.opmobile,
      faxNumber: this.personalForm.value.opfaxnumber,
      email: this.personalForm.value.opemail
    },
 
    financeContactInfo: {
      name: this.personalForm.value.cfname,
      title: this.personalForm.value.cftitle,
      telephone: this.personalForm.value.cftelephone,
      mobile: this.personalForm.value.cfmobile,
      faxNumber: this.personalForm.value.cffaxnumber,
      email: this.personalForm.value.cfemail
    },
 
    accountingDepartmentContactInfo: {
      name: this.personalForm.value.adname,
      title: this.personalForm.value.adtitle,
      telephone: this.personalForm.value.adtelephone,
      mobile: this.personalForm.value.admobile,
      faxNumber: this.personalForm.value.adfaxnumber,
      email: this.personalForm.value.ademail
    },
 
    directorsinfoA: {
      name: this.personalForm.value.dcaname,
      title: this.personalForm.value.dcatitle,
      telephone: this.personalForm.value.dcatelephone,
      mobile: this.personalForm.value.dcamobile,
      faxNumber: this.personalForm.value.dcafaxnumber,
      email: this.personalForm.value.dcaemail
    },
 
    directorsinfoB: {
      name: this.personalForm.value.dcbname,
      title: this.personalForm.value.dcbtitle,
      telephone: this.personalForm.value.dcbtelephone,
      mobile: this.personalForm.value.dcbmobile,
      faxNumber: this.personalForm.value.dcbfaxnumber,
      email: this.personalForm.value.dcbemail
    },
 
    bankingInformation: {
      principalBankersName: this.BankForm.value.principalbankers,
      branchAddress: this.BankForm.value.branchaddress,
      managerDetails: this.BankForm.value.contactdetails,
      bankDetails: this.BankForm.value.bankdetails,
      accountNumber: this.BankForm.value.accountnumber,
      accountName: this.BankForm.value.accountname,
      swiftCode: this.BankForm.value.swiftcode
    },
 
   kycConfirmationRequirements: {
conform: (this.legalForm as any).conformRemoved
    ? null
    : this.legalForm.value.conform ?? this.existingRecord?.kycConfirmationRequirements?.conform ?? false,

  signature: (this.legalForm as any).signatureRemoved
    ? null
    : this.legalForm.value.signature
      ? {
          filename: this.legalForm.value.signatureFileName,
          data: getBase64Data(this.legalForm.value.signature), // strip "data:image/png;base64," if needed
          contentType: this.legalForm.value.signatureContentType
        }
      : this.existingRecord?.kycConfirmationRequirements?.signature ?? null,

  signatureFileName: (this.legalForm as any).signatureRemoved
    ? null
    : this.legalForm.value.signatureFileName ?? this.existingRecord?.kycConfirmationRequirements?.signature?.filename,

  signatureContentType: (this.legalForm as any).signatureRemoved
    ? null
    : this.legalForm.value.signatureContentType ?? this.existingRecord?.kycConfirmationRequirements?.signature?.contentType,

  signatureText: this.legalForm.get('signatureName')?.value ?? this.existingRecord?.kycConfirmationRequirements?.signatureText ?? ''
},
kycDocumentationRequirements: {
  passport: (this.legalForm as any).directorsDocumentsRemoved
  ? null   // user removed explicitly
  : this.legalForm.value.directorsDocuments
    ? {
        filename: this.legalForm.value.directorsDocumentsFileName,
        data: getBase64Data(this.legalForm.value.directorsDocuments),
        contentType: this.legalForm.value.directorsDocumentsContentType
      }
    : (
        this.existingRecord?.kycDocumentationRequirements?.passport
          ? {
              filename: this.existingRecord.kycDocumentationRequirements.passport.filename,
              data: this.existingRecord.kycDocumentationRequirements.passport.data,
              contentType: this.existingRecord.kycDocumentationRequirements.passport.contentType
            }
          : null
      ),

 passportReason: this.legalForm.get('directorsReason')?.value || "",

 
  incorporationCertificate: (this.legalForm as any).certificateIncorporationRemoved
  ? null
  : this.legalForm.value.certificateIncorporation
    ? {
        filename: this.legalForm.value.certificateIncorporationFileName,
        data: getBase64Data(this.legalForm.value.certificateIncorporation),
        contentType: this.legalForm.value.certificateIncorporationContentType
      }
    : (
        this.existingRecord?.kycDocumentationRequirements?.incorporationCertificate
          ? {
              filename: this.existingRecord.kycDocumentationRequirements.incorporationCertificate.filename,
              data: this.existingRecord.kycDocumentationRequirements.incorporationCertificate.data,
              contentType: this.existingRecord.kycDocumentationRequirements.incorporationCertificate.contentType
            }
          : null
      ),

       incorporationCertificateReason: this.legalForm.get('certificateIncorporationReason')?.value || "",




companyChart: (this.legalForm as any).orgChartRemoved
  ? null
  : this.legalForm.value.orgChart
    ? {
        filename: this.legalForm.value.orgChartFileName,
        data: getBase64Data(this.legalForm.value.orgChart),
        contentType: this.legalForm.value.orgChartContentType
      }
    : (
        this.existingRecord?.kycDocumentationRequirements?.companyChart
          ? {
              filename: this.existingRecord.kycDocumentationRequirements.companyChart.filename,
              data: this.existingRecord.kycDocumentationRequirements.companyChart.data,
              contentType: this.existingRecord.kycDocumentationRequirements.companyChart.contentType
            }
          : null
      ),


      companyChartReason: this.legalForm.get('orgChartReason')?.value || "",
 
 bankReference: (this.legalForm as any).bankReferenceRemoved
  ? null
  : this.legalForm.value.bankReference
    ? {
        filename: this.legalForm.value.bankReferenceFileName,
        data: getBase64Data(this.legalForm.value.bankReference),
        contentType: this.legalForm.value.bankReferenceContentType
      }
    : (
        this.existingRecord?.kycDocumentationRequirements?.bankReference
          ? {
              filename: this.existingRecord.kycDocumentationRequirements.bankReference.filename,
              data: this.existingRecord.kycDocumentationRequirements.bankReference.data,
              contentType: this.existingRecord.kycDocumentationRequirements.bankReference.contentType
            }
          : null
      ),


      bankReferenceReason: this.legalForm.get('bankReason')?.value || "",

 

 
  financialStatements: (this.legalForm as any).financialStatementsRemoved
  ? null
  : this.legalForm.value.financialStatements
    ? {
        filename: this.legalForm.value.financialStatementsFileName,
        data: getBase64Data(this.legalForm.value.financialStatements),
        contentType: this.legalForm.value.financialStatementsContentType
      }
    : (
        this.existingRecord?.kycDocumentationRequirements?.financialStatements
          ? {
              filename: this.existingRecord.kycDocumentationRequirements.financialStatements.filename,
              data: this.existingRecord.kycDocumentationRequirements.financialStatements.data,
              contentType: this.existingRecord.kycDocumentationRequirements.financialStatements.contentType
            }
          : null
      ),


  financialStatementsReason: this.legalForm.get('financialReason')?.value || "",

 memorandum: (this.legalForm as any).memorandumRemoved
  ? null
  : this.legalForm.value.memorandum
    ? {
        filename: this.legalForm.value.memorandumFileName,
        data: getBase64Data(this.legalForm.value.memorandum),
        contentType: this.legalForm.value.memorandumContentType
      }
    : (
        this.existingRecord?.kycDocumentationRequirements?.memorandum
          ? {
              filename: this.existingRecord.kycDocumentationRequirements.memorandum.filename,
              data: this.existingRecord.kycDocumentationRequirements.memorandum.data,
              contentType: this.existingRecord.kycDocumentationRequirements.memorandum.contentType
            }
          : null
      ),

        memorandumReason: this.legalForm.get('memoranReason')?.value || "",



},
 
    questionnaireInfo: {
      position: this.sourceForm.value.position,
      email: this.sourceForm.value.emailaddress,
      phoneNo: this.sourceForm.value.phonenumber,
      date: this.sourceForm.value.date
    },
 
    // Status: "Pending", // or whatever status you want
    // approvalLevel: approvalLevel,
    // approvalName: approvalName,
    // approvalDate: approvalTimestamp,
     onboardStatus: "Pending",
    approvalLevel: approvalLevel,
 
// Preserve previous approvals
level1ApprovalName: this.existingRecord?.level1ApprovalName ?? null,
level1ApprovalDate: this.existingRecord?.level1ApprovalDate ?? null,
level2ApprovalName: this.existingRecord?.level2ApprovalName ?? null,
level2ApprovalDate: this.existingRecord?.level2ApprovalDate ?? null,
level3ApprovalName: this.existingRecord?.level3ApprovalName ?? null,
level3ApprovalDate: this.existingRecord?.level3ApprovalDate ?? null,
 
// Conditionally override current level
...(approvalLevel === 'level1' && {
  level1ApprovalName: approvalName,
  level1ApprovalDate: approvalTimestamp
}),
...(approvalLevel === 'level2' && {
  level2ApprovalName: approvalName,
  level2ApprovalDate: approvalTimestamp
}),
...(approvalLevel === 'level3' && {
  level3ApprovalName: approvalName,
  level3ApprovalDate: approvalTimestamp,
  onboardStatus:"Approved"
})
 
  };
 
 
 
this.service.updateVendorOnboard(updatedVendor).subscribe({
  next: () => {
    Swal.fire({
      icon: 'success',
      title: 'Vendor updated successfully',
      showConfirmButton: true,
      confirmButtonText: 'OK'
    }).then(() => {
      // ✅ after update success
      this.showPopup = false;     // close remarks popup
      this.isEditScreen = false;  // exit edit mode
      this.isViewScreen = false;  // exit view mode
      this.approvalScreen = true; // 👈 now show approval table
      this.remarks = "";

      this.loadOnboardingRecords();

      // this.loadVendors(); // optional: reload table
    });
  },
  error: (err) => {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error updating vendor',
      text: err?.message || 'Something went wrong!',
      showConfirmButton: true,
      confirmButtonText: 'OK'
    });
  }
});

 
}
  // loadVendors() {
  //   throw new Error('Method not implemented.');
  // }
 


  onEntriesChange() {
    this.currentPage = 1; // Reset to first page when changing entries per page
  }
  get totalPages() {
    return Math.ceil(this.totalEntries / this.selectedEntries);
  }

  get totalPagesArray() {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  get startEntry() {
    return (this.currentPage - 1) * this.selectedEntries + 1;
  }

  get endEntry() {
    return Math.min(this.currentPage * this.selectedEntries, this.totalEntries);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // here update your vendor list slice
    }
  }
  
  toggleSignature(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showSignature = checkbox.checked;

    // Optional: reset signature if unchecked
    if (!this.showSignature) {
      this.legalForm.patchValue({ signatureFile: null });
    }
  }

getFileType(fileData: string | null): 'image' | 'pdf' | 'other' {
  if (!fileData) return 'other';
  if (fileData.startsWith('data:image')) return 'image';
  if (fileData.startsWith('data:application/pdf')) return 'pdf';
  return 'other';
}

patchVendor(vendor: any) {
  this.legalForm.patchValue({
    conform: vendor.kycConfirmationRequirements?.conform,
    signatureName: vendor.kycConfirmationRequirements?.signatureText,
    signature: '' // reset file input (must be empty string)
  });

  const sig = vendor.kycConfirmationRequirements?.signature;
  if (sig?.data && sig?.contentType) {
    this.signaturePreview =
      `data:${sig.contentType};base64,${this.bufferToBase64(sig.data.data)}`;
  } else {
    this.signaturePreview = null;
  }
}



  // openImage(imageData: string) {
  //   const newTab = window.open();
  //   if (newTab) {
  //     newTab.document.write(`<img src="${imageData}" style="width:100%;height:auto" />`);
  //   }
  // }
  openImage(imageData: string) {
  const newTab = window.open("", "_blank");

  if (newTab) {
    newTab.document.write(`
      <html>
        <head>
          <title>Image Preview</title>
          <style>
            body {
              margin: 0;
              background: #000;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              color: white;
            }
            .close-btn {
              position: fixed;
              top: 20px;
              right: 20px;
              background: red;
              color: white;
              border: none;
              padding: 8px 12px;
              font-size: 16px;
              cursor: pointer;
              border-radius: 4px;
            }
            img {
              max-width: 90%;
              max-height: 90%;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <button class="close-btn" onclick="window.close()">❌ Close</button>
          <img src="${imageData}" alt="Image Preview" />
        </body>
      </html>
    `);
    newTab.document.close();
  }
}


  openFile(fileData: string) {
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`<iframe src="${fileData}" frameborder="0" style="width:100%;height:100%"></iframe>`);
    }

  }

 removePreview(controlName: string) {
  this.legalForm.patchValue({
    [controlName]: null,
    [`${controlName}FileName`]: null,
    [`${controlName}ContentType`]: null,
  });

  // ✅ Only mark the specific control as removed
  (this.legalForm as any)[`${controlName}Removed`] = true;
}





  // getSafeImage(base64Data: string | null): SafeUrl | null {
  //   if (!base64Data) return null;

  //   // Ensure prefix is included
  //   if (!base64Data.startsWith('data:image')) {
  //     base64Data = `data:image/jpeg;base64,${base64Data}`;
  //   }

  //   console.log("Image preview URL:", base64Data); // for debugging

  //   return this.sanitizer.bypassSecurityTrustUrl(base64Data);
  // }

  getSafeImage(image: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }


}

