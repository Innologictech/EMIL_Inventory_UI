import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeneralserviceService } from 'src/app/generalservice.service';




@Component({
  selector: 'app-customer-onboarding',
  templateUrl: './customer-onboarding.component.html',
  styleUrl: './customer-onboarding.component.css',
  standalone: true,  // This makes it a standalone component
  imports: [CommonModule, ReactiveFormsModule], 
  
})
export class CustomerOnboardingComponent {
  kycForm: FormGroup;
  requiredDocuments = [
    'Identification documents of Directors & Shareholders',
    'Certificate of Incorporation',
    'Organization Chart',
    'Bank reference',
    'Last 2 years financial statements',
    'Memorandum and Articles of Association'
  ];
  uploadedFiles: File[] = [];
  form: any;

  constructor(private fb: FormBuilder, private http: HttpClient,private service: GeneralserviceService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.kycForm = this.fb.group({
      // Corporate Information
      companyName: [''],
      parentCompany: [''],
      registeredAddress: [''],
      headOfficeAddress: [''],
      website: [''],

      // Company Registration
      incorporationDate: [''],
      incorporationCountry: [''],
      registrationNumber: [''],
      taxNumber: [''],
      publicCompany: [false],
      privateCompany: [false],
      partnership: [false],
      individual: [false],
      governmentEntity: [false],
      stockExchange: [''],
      beneficialOwners: [''],

      quotedExchangeDetails:[''],
      beneficialOwnersDetails:[''],



      // contact info

      name:[''],
      title:[''],
      telephone:[''],
      mobile:[''],
      faxnumber:[''],
      email:[''],

      principalbankers:[''],
      branchaddress:[''],
      contactdetails:[''],
      bankdetails:[''],
      accountnumber:[''],
      accountname:[''],
      swiftcode:[''],

      identificationdocument:[''],
      certificateincorporation:[''],
      shareholder:[''],
      bankers:[''],
      primaryName:[''],
      primaryTitle:[''],
      primaryTelephone:[''],
      primaryMobile:[''],
      primaryFax:[''],
      primaryEmail:[''],

      operationsName:[''],
      operationsTitle:[''],
      operationsTelephone:[''],
      operationsMobile:[''],
      operationsFax:[''],
      operationsEmail:[''],

      financeName:[''],
      financeTitle:[''],
      financeTelephone:[''],
      financeMobile:[''],
      financeFax:[''],
      financeEmail:[''],

      accountingName:[''],
      accountingTitle:[''],
      accountingTelephone:[''],
      accountingMobile:[''],
      accountingFax:[''],
      accountingEmail:[''],

      directorAName:[''],
      directorATitle:[''],
      directorATelephone:[''],
      directorAMobile:[''],
      directorAFax:[''],
      directorAEmail:[''],
      directorBName:[''],
      directorBTitle:[''],
      directorBTelephone:[''],
      directorBMobile:[''],
      directorBFax:[''],
      directorBEmail:[''],


      // Banking Information
      bankName: [''],
      bankAddress: [''],
      accountManager: [''],
      accountNumber: [''],
      accountName: [''],
      swiftCode: [''],

      // KYC Confirmation
     accounts:[''],
     association:[''],
     position:[''],
     phonenumber:[''],
     emailaddress:[''],
     date:[''],





      // Submitted By
      submitterName: [''],
      submitterPosition: [''],
      submitterEmail: [''],
      submitterPhone: [''],
      submissionDate: ['']
    });
  }


onSubmit(): void {
  const form = this.kycForm.value;

   let formattedDate = '';
  if (form.date && !isNaN(Date.parse(form.date))) {
    formattedDate = new Date(form.date).toISOString();
  }

  const payload = {
    corporateInformation: {
      fullRegisteredName: form.companyName,
      parentCompany: form.parentCompany,
      registeredAddress: form.registeredAddress,
      headOfficeAddress: form.headOfficeAddress,
      website: form.website
    },

    companyRegistration: {
      incorporationDate: form.incorporationDate,
      countryOfIncorporation: form.incorporationCountry,
      companyRegistrationNumber: form.registrationNumber,
      gstOrVatNumber: form.taxNumber,
      stockExchange: form.stockExchange,

    },

    status: {
      publicCompany:form.publicCompany,
      privateCompany:form.privateCompany,
      patnership:form.partnership,
      individual:form.individual,
      govtEntity:form.governmentEntity

    },  
    

    detailsOfOwner: {
      name: form.quotedExchangeDetails,
      share: form.beneficialOwnersDetails 
    },

    counterpartyPrimaryContactInfo: {
      name: form.primaryName,
      title: form.primaryTitle,
      telephone: form.primaryTelephone,
      mobile: form.primaryMobile,
      faxNumber: form.primaryFax,
      email: form.primaryEmail
    },

    operationsContactInfo: {
      name: form.operationsName,
      title: form.operationsTitle,
      telephone: form.operationsTelephone,
      mobile: form.operationsMobile,
      faxNumber: form.operationsFax,
      email: form.operationsEmail
    },

    financeContactInfo: {
      name: form.financeName,
      title: form.financeTitle,
      telephone: form.financeTelephone,
      mobile: form.financeMobile,
      faxNumber: form.financeFax,
      email: form.financeEmail
    },

    accountingDepartmentContactInfo: {
      name: form.accountingName,
      title: form.accountingTitle,
      telephone: form.accountingTelephone,
      mobile: form.accountingMobile,
      faxNumber: form.accountingFax,
      email: form.accountingEmail
    },

    directorContactInfoA: {
      name: form.directorAName,
      title: form.directorATitle,
      telephone: form.directorATelephone,
      mobile: form.directorAMobile,
      faxNumber: form.directorAFax,
      email: form.directorAEmail
    },

    directorContactInfoB: {
      name: form.directorBName,
      title: form.directorBTitle,
      telephone: form.directorBTelephone,
      mobile: form.directorBMobile,
      faxNumber: form.directorBFax,
      email: form.directorBEmail
    },

    bankingInformation: {
      principalName: form.principalbankers,
      branchAddress: form.branchaddress,
      AccountManager: form.contactdetails,
      bankDetails: form.bankdetails,
      accountNumber: form.accountnumber,
      accountName: form.accountname,
      swiftCode: form.swiftcode
    },

    kycConfirmationRequirements: {
      conform: 'Yes',
      signature: 'signed-user-id-or-file-ref'
    },

    kycDocumentationRequirements: {
      passport: form.identificationdocument,
      incorporationCertificate: form.certificateincorporation,
      companyChart: form.shareholder,
      bankReference: form.bankers,
      financialStatements: form.accounts, 
      memorandum: form.association
    },

    questionnaireInfo: {
      position: form.position,
      email: form.emailaddress,
      phoneNo: form.phonenumber,
      date: formattedDate
    }
  };

  // Call your service to submit the payload
  this.service.onBoardCreation(payload).subscribe({
    next: (res) => {
      console.log('Onboarding submitted successfully:', res);
      // Optionally show a success message or navigate
    },
    error: (err) => {
      console.error('Error during onboarding submission:', err);
      // Optionally show an error message
    }
  });
}



  onFileSelected(event: any, index: number): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadedFiles[index] = file;
    }
  }

  resetForm(): void {
    this.kycForm.reset();
    this.uploadedFiles = [];
    this.initForm();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}


