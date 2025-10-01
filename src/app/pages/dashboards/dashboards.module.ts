import { NgModule } from '@angular/core';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import { SampleComponentComponent } from './default/sample-component/sample-component.component';

import { UserCreationComponent } from './user-creation/user-creation.component';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReviewNotificationComponent } from './review-notification/review-notification.component';
import { DashboardBackupComponent } from './dashboard-backup/dashboard-backup.component';
// import { GlobalReviewEditComponent } from './global-review-edit/global-review-edit.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StorageLocationTransferComponent } from './storage-location-transfer/storage-location-transfer.component';
import { AgainstInvoiceComponent } from './Dispatch/against-invoice/against-invoice.component';
import { ArticleMasterComponent } from './article-master/article-master.component';
@NgModule({
  declarations: [
    SampleComponentComponent,
    DashboardComponent,
    StorageLocationTransferComponent,
    ArticleMasterComponent,
    // UserCreationComponent,
    // DashboardBackupComponent,
    // ReviewNotificationComponent,
    // GlobalReviewEditComponent,
    // InvoiceUserCreationComponent,
    // InvoiceReportsComponent,
    // InvoiceComponent,
    // InvoiceLayoutComponent
  ],
  imports: [
    DashboardsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),  // Ensure it's in the imports array
    NgxSpinnerModule,
    NgxChartsModule,
    UserCreationComponent

  ],
  providers: [BsDropdownConfig],
})
export class DashboardsModule { }
