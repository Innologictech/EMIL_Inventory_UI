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
        path: 'sampleComponent',
        component: SampleComponentComponent
    },
    
    {
        path: 'UserCreation',
        component: UserCreationComponent
    },
     {
        path: 'UserCreation',
        component: UserCreationComponent
    },
    //  {
    //     path: 'vendor-onboarding-link',
    //     component: VendorOnboardingComponent
    // },
    {
        path:'vendoronboardinglink',
        component:VendorOnboarding2Component

    },

     {
        path:'mystore',
        component:MystoreComponent

    },

     {
        path:'mystore-warehouse',
        component:MystoreWarehouseComponent

    },

      {
        path:'scan-stock-items',
        component:ScanStockItemsComponent

    },


{
    path:'grn',
    component:GrnComponent
},

{
    path:'assigndelivery',
    component:AssignDeliveryComponent
},

{
    path:'inventory',
    component:InventoryComponent
},

{
path:"storagelocationtransfer",
component:StorageLocationTransferComponent
},

{
path:"article-master",
component:ArticleMasterComponent
},
{
    path:"against-invoice",
    component:AgainstInvoiceComponent
},
{
    path:"againststo",
    component:AgainstStoComponent
},
{
    path:"salesreturn",
    component:SalesReturnComponent
},
{
    path:"gatepassprint",
    component:GatepassPrintComponent
},
{
    path:"invoiceprint",
    component:InvoicePrintComponent
},
{
    path:"stockoverview",
    component:StockoverviewComponent
},
{
    path:"stockstatus",
    component:StockstatusComponent
},
{
    path:"openstolist",
    component:OpenstoorderListComponent
},
{
    path:"inwardstock",
    component:InwardStockComponent
},
{
    path:"inwardstock",
    component:InwardStockComponent
},
{
    path:"stockintransit",
    component:StockInTransitComponent
},
{
    path:"salesdeliveries",
    component:SalesDeliveriesComponent
},
{
    path:"pendingdeliveries",
    component:PendingDeliveriesComponent
},
{
    path:"mb51",
    component:MB51Component
},
{
    path:"article-master2",
    component:ArticleMasterComponent
},
{
    path:"site-master",
    component:SiteMasterComponent
},
{
    path:"stock-scanned-items",
    component:StockScannedItemsComponent
},
{
    path:"dispatch-scanned-items",
    component:DispatchScannedItemsComponent
},
{
    path:"grn-scanned-items",
    component:GrnScannedItemsComponent
},
{
    path:"delivery-scanned-items",
    component:DeliveryScannedItemsComponent
},
















   
    
    
    
   ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
