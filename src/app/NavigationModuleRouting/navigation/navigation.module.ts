import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/AngularMaterialModule/material/material.module';
import { NavigationRoutingModule } from './navigation-routing.module';
import { TopnavbarComponent } from 'src/app/Components/Navigation/TopNavbar/topnavbar/topnavbar.component';
import { EmployeecontrollerComponent } from 'src/app/Components/EmployeeController/Components/employeecontroller/employeecontroller.component';
import { AddEditEmployeecontrollerComponent } from 'src/app/Components/EmployeeController/Components/add-edit-employeecontroller/add-edit-employeecontroller.component';
import { DashboardComponent } from 'src/app/Components/dashboard/dashboard.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddeditemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/addeditemployeevsdivision/addeditemployeevsdivision.component';
import { indexemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/indexemployeevsdivision/indexemployeevsdivision.component';
import { LoginComponent } from 'src/app/Components/Navigation/TopNavbar/login/login.component';
import { CustomerVSEmployeeComponent } from 'src/app/Components/CustomerController/CustomerVSEmployee/customer-vsemployee/customer-vsemployee.component';
import { AddEditCustomerVSEmployeeComponent } from 'src/app/Components/CustomerController/CustomerVSEmployee/add-edit-customer-vsemployee/add-edit-customer-vsemployee.component';
import { CustomervsprocessComponent } from 'src/app/Components/CustomerController/CustomerVsProcess/customervsprocess/customervsprocess.component';
import { PricingcalculationComponent } from 'src/app/Components/AccountsController/PricingCalculation/pricingcalculation/pricingcalculation.component';
import { NonbillablejobsComponent } from 'src/app/Components/AccountsController/Non-BillableJobs/nonbillablejobs/nonbillablejobs.component';
import { CustomerreceiptsindexComponent } from 'src/app/Components/AccountsController/CustomerReceipts/customerreceiptsindex/customerreceiptsindex.component';
import { AddEditCustomerreceiptsComponent } from 'src/app/Components/AccountsController/CustomerReceipts/add-edit-customerreceipts/add-edit-customerreceipts.component';
import { ScopechangeComponent } from 'src/app/Components/AccountsController/ScopeChange/scopechange/scopechange.component';
import { AdvanceadjustmentComponent } from 'src/app/Components/AccountsController/AdvanceAdjustment/Index/advanceadjustment/advanceadjustment.component';
import { EditadvanceadjustmentComponent } from 'src/app/Components/AccountsController/AdvanceAdjustment/Edit/editadvanceadjustment/editadvanceadjustment.component';
import { CreditnoteindexComponent } from 'src/app/Components/AccountsController/CreditNote/creditnoteindex/creditnoteindex.component';
import { AddCreditnoteComponent } from 'src/app/Components/AccountsController/CreditNote/add-creditnote/add-creditnote.component';
import { ChangepasswordComponent } from 'src/app/Components/Navigation/ChangePass/changepassword/changepassword.component';
import { InvoicecancellationComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/invoicecancellation/invoicecancellation.component';
import { ViewinvoicecancelComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/viewinvoicecancel/viewinvoicecancel.component';
import { InvoicecancelleddetailsComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/invoicecancelleddetails/invoicecancelleddetails.component';
import { MatSortModule } from '@angular/material/sort';
import { InvoiceComponent } from 'src/app/Components/AccountsController/Invoice/invoice/invoice.component';
import { DetailsComponent } from 'src/app/Components/AccountsController/Invoice/details/details.component';
import { GeneratedinvoiceComponent } from 'src/app/Components/AccountsController/Invoice/generatedinvoice/generatedinvoice.component';
import { ConfirminvoiceComponent } from 'src/app/Components/AccountsController/Invoice/confirminvoice/confirminvoice.component';
import { PopupinvoiceComponent } from 'src/app/Components/AccountsController/Invoice/popupinvoice/popupinvoice.component';
import { PopupinvoicecancellistComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/popupinvoicecancellist/popupinvoicecancellist.component';
import { WavierComponent } from 'src/app/Components/AccountsController/Wavier/wavier/wavier.component';
import { TallyComponent } from 'src/app/Components/AccountsController/Tally/tally/tally.component';
import { PopupwavierconfirmationComponent } from 'src/app/Components/AccountsController/Wavier/popupwavierconfirmation/popupwavierconfirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientordinationindexComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/clientordinationindex/clientordinationindex.component';
import { QueryToClientComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/query-to-client/query-to-client.component';
import { JoborderComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/joborder/joborder.component';
import { ProductionallocationComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/productionallocation/productionallocation.component';
import { ProductionallocationtableComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/productionallocationtable/productionallocationtable.component';
import { ProductionComponent } from 'src/app/Components/TopToolbarComponents/Production/production/production.component';
import { ProductiontableComponent } from 'src/app/Components/TopToolbarComponents/Production/productiontable/productiontable.component';
import { JobAssignedDetailsPopupComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/job-assigned-details-popup/job-assigned-details-popup.component';
import { QualityallocationComponent } from 'src/app/Components/TopToolbarComponents/QualityAllocation/qualityallocation/qualityallocation.component';
import { QualityallocationtableComponent } from 'src/app/Components/TopToolbarComponents/QualityAllocation/qualityallocationtable/qualityallocationtable.component';
import { QualitypopupjobassignComponent } from 'src/app/Components/TopToolbarComponents/QualityAllocation/qualitypopupjobassign/qualitypopupjobassign.component';
import { QualityComponent } from 'src/app/Components/TopToolbarComponents/Quality/quality/quality.component';
import { QualitytableComponent } from 'src/app/Components/TopToolbarComponents/Quality/qualitytable/qualitytable.component';
import { QualityjobdetailpopupComponent } from 'src/app/Components/TopToolbarComponents/Quality/qualityjobdetailpopup/qualityjobdetailpopup.component';
import { JoborderexcelComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/joborderexcel/joborderexcel.component';
import { CompletedjobsComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/completedjobs/completedjobs.component';
import { ClientordersComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientorders/clientorders.component';
import { ClientorderstableComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientorderstable/clientorderstable.component';
import { ClientorderviewComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientorderview/clientorderview.component';
// import { ProofReadingAllocationComponent } from 'src/app/Components/TopToolbarComponents/ProofReading/proof-reading-allocation/proof-reading-allocation.component';
//import { ProofReadingAllocationTableComponent } from 'src/app/Components/TopToolbarComponents/ProofReading/proof-reading-allocation-table/proof-reading-allocation-table.component';
import { ProofReadingTableComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proof-reading-table/proof-reading-table.component';
import { ProofreadingComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proofreading/proofreading.component';
import { BuddyProofComponent } from 'src/app/Components/TopToolbarComponents/BuddyProof/buddy-proof/buddy-proof.component';
import { BuddyProofTableComponent } from 'src/app/Components/TopToolbarComponents/BuddyProof/buddy-proof-table/buddy-proof-table.component';
import { SewOutComponent } from 'src/app/Components/TopToolbarComponents/SewOut/sew-out/sew-out.component';
import { SewOutTableComponent } from 'src/app/Components/TopToolbarComponents/SewOut/sew-out-table/sew-out-table.component';
import { QualityWorkflowComponent } from 'src/app/Components/TopToolbarComponents/Quality/quality-workflow/quality-workflow.component';
import { JobhistorypopuptableComponent } from 'src/app/Components/TopToolbarComponents/Quality/jobhistorypopuptable/jobhistorypopuptable.component';
import { ProofjobdetailpopupComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proofjobdetailpopup/proofjobdetailpopup.component';
import { ProofjobhistorypopupComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proofjobhistorypopup/proofjobhistorypopup.component';
import { ProofworkflowComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proofworkflow/proofworkflow.component';
// import { EmployeejobassisgnedpopupComponent } from 'src/app/Components/TopToolbarComponents/ProofReading/employeejobassisgnedpopup/employeejobassisgnedpopup.component';
import { ClientdetailspopupComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientdetailspopup/clientdetailspopup.component';
import { FileconvertComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientorderstable/fileconvert/fileconvert.component';
import { UserMasterComponent } from 'src/app/Components/Master/user/user-master/user-master.component';
import { AddEditUsermasterComponent } from 'src/app/Components/Master/user/add-edit-usermaster/add-edit-usermaster.component';
import { AdduserMasterComponent } from 'src/app/Components/Master/user/adduser-master/adduser-master.component';
import { ScopeComponent } from 'src/app/Components/Master/Scope/scope/scope.component';
import { AddScopeComponent } from 'src/app/Components/Master/Scope/add-scope/add-scope.component';
import { ViewScopeComponent } from 'src/app/Components/Master/Scope/view-scope/view-scope.component';
import { ViewEditScopeComponent } from 'src/app/Components/Master/Scope/view-edit-scope/view-edit-scope.component';
import { MatSelectModule } from '@angular/material/select';
import { ErrorCategoryComponent } from 'src/app/Components/Master/ErrorCategory/error-category/error-category.component';
import { AddErrorcategoryComponent } from 'src/app/Components/Master/ErrorCategory/add-errorcategory/add-errorcategory.component';
import { EditErrorcategoryComponent } from 'src/app/Components/Master/ErrorCategory/edit-errorcategory/edit-errorcategory.component';
import { JobDetailsClientIndexComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/query-to-client/job-details-client-index/job-details-client-index.component';
import { JobDetailsSewPopComponent } from 'src/app/Components/TopToolbarComponents/SewOut/SewOut-JobDetailsPopup/job-details-sew-pop/job-details-sew-pop.component';
import { SewoutworkflowComponent } from 'src/app/Components/TopToolbarComponents/SewOut/SewOut-JobDetailsPopup/sewoutworkflow/sewoutworkflow.component';
import { GetJobHistoryPopupComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/completedjobs/completedjobpopupjobhistory/get-job-history-popup/get-job-history-popup.component';
import { OneTimemasterComponent } from 'src/app/Components/Master/one-timemaster/one-timemaster.component';
import { AddEditprocessComponent } from 'src/app/Components/Master/process/add-editprocess/add-editprocess.component';
import { ProcessComponent } from 'src/app/Components/Master/process/process/process.component';
import { ViewProcessComponent } from 'src/app/Components/Master/process/view-process/view-process.component';
import { BenchStatusComponent } from 'src/app/Components/Master/BenchStatus/bench-status/bench-status.component';
import { JobHistoryComponent } from 'src/app/Components/JobHistory/job-history/job-history.component';
import { JobhistoryDetailsComponent } from 'src/app/Components/JobHistory/jobhistory-details/jobhistory-details.component';
import { JobTransferComponent } from 'src/app/Components/JobTransfer/job-transfer/job-transfer.component';
import { ProdjobpopupComponent } from 'src/app/Components/TopToolbarComponents/Production/prodjobpopup/prodjobpopup.component';
import { ProductionworkflowComponent } from 'src/app/Components/TopToolbarComponents/Production/productionworkflow/productionworkflow.component';
import { HttpClientModule } from '@angular/common/http';
import { BankComponent } from 'src/app/Components/Bank/bank/bank.component';
import { EmployeePopupTableComponent } from 'src/app/Components/TopToolbarComponents/QualityAllocation/employee-popup-table/employee-popup-table.component';
import { ProductionAllocatedPopupComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/production-allocated-popup/production-allocated-popup.component';
import { JoballocatedEmplpopupComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/joballocated-emplpopup/joballocated-emplpopup.component';
import { ProofreadingAllocationComponent } from 'src/app/Components/TopToolbarComponents/ProofReadingAllocation/proofreading-allocation/proofreading-allocation.component';
import { ProofreadingAlocationtableComponent } from 'src/app/Components/TopToolbarComponents/ProofReadingAllocation/proofreading-alocationtable/proofreading-alocationtable.component';
import { EditVendorComponent } from 'src/app/Components/Vendor/edit-vendor/edit-vendor.component';
import { VendorComponent } from 'src/app/Components/Vendor/vendor/vendor.component';
import { UpdatevendorComponent } from 'src/app/Components/Vendor/updatevendor/updatevendor.component';
import { IndexchecklistComponent } from 'src/app/Components/CustomerVSChecklist/indexchecklist/indexchecklist.component';
import { AddchecklistComponent } from 'src/app/Components/CustomerVSChecklist/addchecklist/addchecklist.component';
import { ViewchecklistComponent } from 'src/app/Components/CustomerVSChecklist/viewchecklist/viewchecklist.component';
import { ItAssetindexComponent } from 'src/app/Components/ITAssets/it-assetindex/it-assetindex.component';
import { AddItassetsComponent } from 'src/app/Components/ITAssets/add-itassets/add-itassets.component';
import { BenchOptionsComponent } from 'src/app/Components/BenchOptions/bench-options/bench-options.component';
import { CreditdaysApprovalComponent } from 'src/app/Components/Sales/creditdays-approval/creditdays-approval.component';
import { EmployeePopupComponent } from 'src/app/Components/TopToolbarComponents/ProofReadingAllocation/employee-popup/employee-popup.component';
import { JobCategorypopupComponent } from 'src/app/Components/TopToolbarComponents/ProofReadingAllocation/job-categorypopup/job-categorypopup.component';
import { UnApprovaljobsComponent } from 'src/app/Components/Sales/un-approvaljobs/un-approvaljobs.component';
import { IndexCustomerSalesApprovalComponent } from 'src/app/Components/Sales/CustomerSalesApproval/index-customer-sales-approval/index-customer-sales-approval.component';
import { TabcustomertableComponent } from 'src/app/Components/Sales/CustomerSalesApproval/tabcustomertable/tabcustomertable.component';
import { SalesMultiStepFormComponent } from 'src/app/Components/Sales/CustomerSalesApproval/Multistepform/sales-multi-step-form/sales-multi-step-form.component';
import { EditaddemployeecontrollerComponent } from 'src/app/Components/EmployeeController/editaddemployeecontroller/editaddemployeecontroller.component';
import { PricingComponent } from 'src/app/Components/Sales/pricing/pricing.component';
import { AddReceivablesComponent } from 'src/app/Components/AccountsController/CustomerReceipts/add-receivables/add-receivables.component';
import { CustomervsdivisionindexComponent } from 'src/app/Components/Sales/CustomerVSDivision/customervsdivisionindex/customervsdivisionindex.component';
import { IndexSkillsetComponent } from 'src/app/Components/EmployeeVSSkillset/index-skillset/index-skillset.component';
import { AddEditSkillsetComponent } from 'src/app/Components/EmployeeVSSkillset/add-edit-skillset/add-edit-skillset.component';
import { ViewSkillsetComponent } from 'src/app/Components/EmployeeVSSkillset/view-skillset/view-skillset.component';
import { UpdateSkillSetComponent } from 'src/app/Components/EmployeeVSSkillset/update-skill-set/update-skill-set.component';
import { JobFilesLocationMasterIndexComponent } from 'src/app/Components/JobFilesLocationMaster/job-files-location-master-index/job-files-location-master-index.component';
import { CustomernormsindexComponent } from 'src/app/Components/CustomerNorms/customernormsindex/customernormsindex.component';
import { AddCustomerNormsComponent } from 'src/app/Components/CustomerNorms/add-customer-norms/add-customer-norms.component';
import { UpdateCustomerNormsComponent } from 'src/app/Components/CustomerNorms/update-customer-norms/update-customer-norms.component';
import { AttendanceIndexComponent } from 'src/app/Components/Attendance/attendance-index/attendance-index.component';
import { ProductionQuotationComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/production-quotation/production-quotation.component';
import { QuotationPopupComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/quotation-popup/quotation-popup.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { IndexBillingCycleComponent } from 'src/app/Components/BillingCycleMonthly/index-billing-cycle/index-billing-cycle.component';
import { UpdateBillingComponent } from 'src/app/Components/BillingCycleMonthly/update-billing/update-billing.component';
import { AddeditBillingComponent } from 'src/app/Components/BillingCycleMonthly/addedit-billing/addedit-billing.component';
import { SSRSReportViewerComponent } from 'src/app/Components/AccountsController/Invoice/SSRS-REPORTVIEWER/ssrsreport-viewer/ssrsreport-viewer.component';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer-v2';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

@NgModule({
  declarations: [
    DashboardComponent,
    //Login
    LoginComponent,
    //changepassword
    ChangepasswordComponent,
    //TOPNAVBARCOMPONENTS
    //1.ClientordinationindexComponent

    ClientordinationindexComponent,
    //SUBCATEGOROFCLIENTCORDINATION
    ProductionallocationComponent,
    
    ProductionQuotationComponent,
    QuotationPopupComponent,
    GetJobHistoryPopupComponent,
    ProductionallocationtableComponent,
    JobAssignedDetailsPopupComponent,
    CompletedjobsComponent,
    ClientordersComponent,
    ClientorderstableComponent,
    ClientorderviewComponent,
    ClientdetailspopupComponent,
    FileconvertComponent,
    JobDetailsClientIndexComponent,

    //JoborderComponent
    JoborderComponent,
    JoborderexcelComponent,

    //1.QueryToClientComponentfortableComponent
    QueryToClientComponent,
    //ProductionmainComponent
    ProductionComponent,
    ProductiontableComponent,
    ProdjobpopupComponent,
    ProductionworkflowComponent,
    //QualityAllocation
    QualityallocationComponent,
    QualityallocationtableComponent,
    QualitypopupjobassignComponent,
    //Quality
    QualityComponent,
    QualitytableComponent,
    QualityjobdetailpopupComponent,
    QualityWorkflowComponent,
    JobhistorypopuptableComponent,
    //ProofReadingAllocation
    // ProofReadingAllocationComponent,
    // ProofReadingAllocationTableComponent,
    // EmployeejobassisgnedpopupComponent,
    EmployeePopupTableComponent,
    ProductionAllocatedPopupComponent,
    JoballocatedEmplpopupComponent,
    ProofreadingAllocationComponent,
    ProofreadingAlocationtableComponent,
    //ProofReading
    ProofreadingComponent,
    ProofReadingTableComponent,
    ProofjobdetailpopupComponent,
    ProofjobhistorypopupComponent,
    ProofworkflowComponent,
    //BuddyProof
    BuddyProofComponent,
    BuddyProofTableComponent,

    //SewOut
    SewOutComponent,
    SewOutTableComponent,
    JobDetailsSewPopComponent,
    SewoutworkflowComponent,
    //navbar
    TopnavbarComponent,
    //EmployeeController
    EmployeecontrollerComponent,
    AddEditEmployeecontrollerComponent,
    EditaddemployeecontrollerComponent,

    //EmployeeVsDivController
    AddeditemployeevsdivisionComponent,
    indexemployeevsdivisionComponent,
    //Customercontroller
    CustomerVSEmployeeComponent,
    AddEditCustomerVSEmployeeComponent,
    //Customervsprocess
    CustomervsprocessComponent,
    //AccountsController
    //1.pricingcalculation
    PricingcalculationComponent,
    //2.NonBillableJobs
    NonbillablejobsComponent,
    //3.customerreceipts
    CustomerreceiptsindexComponent,
    AddEditCustomerreceiptsComponent,
    AddReceivablesComponent,

    //4.scopeChange
    ScopechangeComponent,
    //5.AdvanceAdjustment
    AdvanceadjustmentComponent,
    EditadvanceadjustmentComponent,
    //6.creditnote
    CreditnoteindexComponent,
    AddCreditnoteComponent,
    //7.invoicecancellation
    InvoicecancellationComponent,
    // 1.viewinvoicecancelationlist
    ViewinvoicecancelComponent,
    //2.InvoicecancelleddetailsComponent
    InvoicecancelleddetailsComponent,
    //3.invoice
    InvoiceComponent,
    DetailsComponent,
    GeneratedinvoiceComponent,
    ConfirminvoiceComponent,
    PopupinvoiceComponent,
    SSRSReportViewerComponent,
    PopupinvoicecancellistComponent,
    //Wavier
    WavierComponent,
    PopupwavierconfirmationComponent,
    //tally
    TallyComponent,
    //SALES CONTROLLER
    //  1.PRICING
    PricingComponent,
    //2.CustomerSalesApproval,
    IndexCustomerSalesApprovalComponent,
    TabcustomertableComponent,
    SalesMultiStepFormComponent,
//CustomerVsDivision
CustomervsdivisionindexComponent,
    // Master.
    UserMasterComponent,
    AddEditUsermasterComponent,
    AdduserMasterComponent,

    // Scope

    ScopeComponent,
    AddScopeComponent,
    ViewScopeComponent,
    ViewEditScopeComponent,

    // Error Category

    ErrorCategoryComponent,
    AddErrorcategoryComponent,
    EditErrorcategoryComponent,

    // process

    ProcessComponent,
    AddEditprocessComponent,
    ViewProcessComponent,

    //  Bench Status
    BenchStatusComponent,

    // oneTime Master 
    OneTimemasterComponent,
    // job istory
    JobHistoryComponent,
    JobhistoryDetailsComponent,
    // Job Transfer
    JobTransferComponent,

    // SALES
    CreditdaysApprovalComponent,
    UnApprovaljobsComponent,


    //Bank
    BankComponent,

    //VENDOR
    VendorComponent,
    EditVendorComponent,
    UpdatevendorComponent,


    //CUSTOMERVSCHECKLIST
    IndexchecklistComponent,
    AddchecklistComponent,
    ViewchecklistComponent,



    //ITAsset
    ItAssetindexComponent,
    AddItassetsComponent,


    //Bench OPtions
    BenchOptionsComponent,


    //EmployeeVsSkillset
    IndexSkillsetComponent,
    AddEditSkillsetComponent,
    ViewSkillsetComponent,
    UpdateSkillSetComponent,


    //JOBFILESLOCATIONMASTER
    JobFilesLocationMasterIndexComponent,


    //customerNorms
    CustomernormsindexComponent,
    AddCustomerNormsComponent,
    UpdateCustomerNormsComponent,
  

    //Attendance
    AttendanceIndexComponent,

      //BillingCycle
      IndexBillingCycleComponent,
      AddeditBillingComponent,
      UpdateBillingComponent

  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReportViewerModule,
    AgGridModule


  ],
  providers: [
    FileconvertComponent,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class NavigationModule { }