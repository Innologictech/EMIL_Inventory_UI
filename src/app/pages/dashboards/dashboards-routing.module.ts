import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { SaasComponent } from './saas/saas.component';
import { CryptoComponent } from './crypto/crypto.component';
import { BlogComponent } from './blog/blog.component';
import { JobsComponent } from "./jobs/jobs.component";
import { SampleComponentComponent } from './default/sample-component/sample-component.component';

import { UserCreationComponent } from './user-creation/user-creation.component';

import { GlobalReviewEditComponent } from './global-review-edit/global-review-edit.component';
import { ReviewNotificationComponent } from './review-notification/review-notification.component';
import { EmployeeCreationComponent } from './employee-creation/employee-creation.component';

import { EmployeeCalenderComponent } from './employee-calender/employee-calender.component';
import { VendorOnboarding2Component } from './vendor-onboarding2/vendor-onboarding2.component';
import { VendorOnboardingComponent } from './vendor-onboarding/vendor-onboarding.component';
import { MystoreComponent } from './CreateSTO/mystore/mystore.component';
import { GrnComponent } from './grn/grn.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MystoreWarehouseComponent } from './CreateSTO/mystore-warehouse/mystore-warehouse.component';
import { ScanStockItemsComponent } from './scan-stock-items/scan-stock-items.component';
import { AssignDeliveryComponent } from './assign-delivery/assign-delivery.component';
import { StorageLocationTransferComponent } from './storage-location-transfer/storage-location-transfer.component';
import { AgainstInvoiceComponent } from './Dispatch/against-invoice/against-invoice.component';
import { ArticleMasterComponent } from './article-master/article-master.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AgainstStoComponent } from './Dispatch/against-sto/against-sto.component';
import { SalesReturnComponent } from './Dispatch/sales-return/sales-return.component';
import { GatepassPrintComponent } from './Dispatch/gatepass-print/gatepass-print.component';
import { InvoicePrintComponent } from './Dispatch/invoice-print/invoice-print.component';
import { StockoverviewComponent } from './Reports/stockoverview/stockoverview.component';
import { StockstatusComponent } from './Reports/stockstatus/stockstatus.component';
import { OpenstoorderListComponent } from './Reports/openstoorder-list/openstoorder-list.component';
import { InwardStockComponent } from './Reports/inward-stock/inward-stock.component';
import { StockInTransitComponent } from './Reports/stock-in-transit/stock-in-transit.component';
import { SalesDeliveriesComponent } from './Reports/sales-deliveries/sales-deliveries.component';
import { PendingDeliveriesComponent } from './Reports/pending-deliveries/pending-deliveries.component';
import { MB51Component } from './Reports/mb51/mb51.component';
import { SiteMasterComponent } from './master-data/site-master/site-master.component';
import { StockScannedItemsComponent } from './master-data/stock-scanned-items/stock-scanned-items.component';
import { DispatchScannedItemsComponent } from './master-data/dispatch-scanned-items/dispatch-scanned-items.component';
import { GrnScannedItemsComponent } from './master-data/grn-scanned-items/grn-scanned-items.component';
import { DeliveryScannedItemsComponent } from './master-data/delivery-scanned-items/delivery-scanned-items.component';
import { EANScanComponent } from './ean-scan/ean-scan.component';
import { StockScanComponent } from './stock-scan/stock-scan.component';
import { InwardScanComponent } from './inward-scan/inward-scan.component';
import { OutwardScanComponent } from './outward-scan/outward-scan.component';
import { StockqtyoverviewReportComponent } from './stockqtyoverview-report/stockqtyoverview-report.component';
import { StockserialsReportComponent } from './stockserials-report/stockserials-report.component';
import { StockMasterComponent } from './master-data/stock-master/stock-master.component';
import { StockToSapComponent } from './Reports/stock-to-sap/stock-to-sap.component';


const routes: Routes = [
    // {
    //     path: '',
    //     component: DefaultComponent
    // },
    {
    path:'',
    component:DashboardComponent
},
{
    path:'eanscan',
    component:EANScanComponent
},
{
    path:'stockscan',
    component:StockScanComponent
},
{
    path:'inwardscan',
    component:InwardScanComponent
},
{
    path:'outwardscan',
    component:OutwardScanComponent
},
{
    path:'stockqty',
    component:StockqtyoverviewReportComponent
},
{
    path:'stockserial',
    component:StockserialsReportComponent
},

{
    path:"stock-master",
    component:StockMasterComponent
},

{
    path:"stock-to-sap",
    component:StockToSapComponent
}
,
{
    path:"user-management",
    component:UserCreationComponent
}
,
{
    path:"article-master",
    component:ArticleMasterComponent
},

{
    path:"site-master",
    component:SiteMasterComponent
}
,
{
    path:"stock-master",
    component:StockMasterComponent
}
,
    
















   
    
    
    
   ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
