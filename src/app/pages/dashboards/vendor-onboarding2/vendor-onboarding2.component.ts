import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GeneralserviceService } from 'src/app/generalservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-onboarding2',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './vendor-onboarding2.component.html',
  styleUrl: './vendor-onboarding2.component.css'
})
export class VendorOnboarding2Component implements OnInit {

  
 linkId: string | null = null;
   isLinkVisible: boolean = false;
  // public vendorLink: string = "";
    constructor(private router: Router,private route: ActivatedRoute,private service: GeneralserviceService) {}
    //  public vendorId: string = "000001"; 
    //    public vendorLink: string = `${window.location.origin}/vendor-onboarding-link/${this.vendorId}`;
  public generatedVendorId: string | null = null;
  public vendorLink: string = ""; // This will be set dynamically
  public vendorData: any = null; 




private fallbackCopyText(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  Swal.fire({
    icon: 'success',
    title: 'Copied!',
    text: 'Link copied to clipboard.',
    timer: 2000,
    showConfirmButton: false,
  });
}
 

ngOnInit(): void {
  
    this.linkId = this.route.snapshot.paramMap.get('id');
    console.log('Vendor Onboarding Link ID (from route):', this.linkId);

    if (this.linkId) {
        this.generatedVendorId = this.linkId;
          this.updateVendorLink();
      this.loadVendorData(this.linkId);
        
      
    } else {
      
      console.log('No vendor ID in URL. Ready to generate a new link.');
    }
   
  }



  
  private loadVendorData(id: string): void {
    // This should make an actual API call to load vendor data
    this.service.getVendorById(id).subscribe({
      next: (data: any) => {
        this.vendorData = data;
      },
      error: (error) => {
        console.error('Error loading vendor data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load vendor data.',
        });
      }
    });
  }




 goToVendorOnboarding() {
  if (this.generatedVendorId) {
    this.router.navigate(['/vo-2'], { queryParams: { id: this.generatedVendorId } });
  } else {
    console.warn('No vendor ID generated to navigate to onboarding.');
    Swal.fire({
      icon: 'warning',
      title: 'Cannot Navigate',
      text: 'Please generate a link ID first by showing or copying the link.',
      confirmButtonColor: '#d33'
    });
  }
}

  
  saveVendorOnboarding(): void {
    console.log('Saving vendor onboarding data...');

    Swal.fire({
      icon: 'success',
      title: 'Vendor Saved!',
      text: `Vendor ${this.linkId || this.generatedVendorId} onboarding data saved successfully.`,
      showConfirmButton: false,
      timer: 2500
    }).then(() => {
      //       this.generatedVendorId = null; 
      // this.isLinkVisible = false;
      // this.generateNewLinkExplicitly(); 
    });
  }
  showLinkSection() {
    this.isLinkVisible = true;
    // Only generate new link if we don't already have one
    if (!this.generatedVendorId) {
      this.generateNewLink();
    } else {
      this.updateVendorLink();
    }
  }
generateNewLink() {
    this.service.generateVendorLink().subscribe({
      next: (response: any) => {
        if (response && response.vendorId) {
          this.generatedVendorId = response.vendorId;
          this.updateVendorLink();
        } else {
          console.error('No vendor ID returned from server');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to generate vendor ID. Please try again.',
          });
        }
      },
      error: (error) => {
        console.error('Error generating vendor link:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to generate vendor link. Please try again.',
        });
      }
    });
  }
copyLink() {
    if (this.vendorLink) {
      navigator.clipboard.writeText(this.vendorLink).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Copied!',
          text: 'Link copied to clipboard.',
          timer: 2000,
          showConfirmButton: false,
        });
      }).catch(() => {
        // Fallback for browsers that don't support clipboard API
        this.fallbackCopyText(this.vendorLink);
      });
    }
  }

  private updateVendorLink(): void {
    if (this.generatedVendorId) {
    this.vendorLink = `${window.location.origin}/vo-2?id=${this.generatedVendorId}`;
    } else {
    this.vendorLink = `${window.location.origin}/vo-2`;
    }
  }
}



