import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCustomerreceiptsComponent } from 'src/app/Components/AccountsController/CustomerReceipts/add-edit-customerreceipts/add-edit-customerreceipts.component';
import { CustomerreceiptsindexComponent } from 'src/app/Components/AccountsController/CustomerReceipts/customerreceiptsindex/customerreceiptsindex.component';
import { NonbillablejobsComponent } from 'src/app/Components/AccountsController/Non-BillableJobs/nonbillablejobs/nonbillablejobs.component';
import { InformationpopupComponent } from 'src/app/Components/AccountsController/PricingCalculation/Dialogpop/informationpopup/informationpopup.component';
import { PricingcalculationComponent } from 'src/app/Components/AccountsController/PricingCalculation/pricingcalculation/pricingcalculation.component';
import { ScopechangeComponent } from 'src/app/Components/AccountsController/ScopeChange/scopechange/scopechange.component';
import { AddEditCustomerVSEmployeeComponent } from 'src/app/Components/CustomerController/CustomerVSEmployee/add-edit-customer-vsemployee/add-edit-customer-vsemployee.component';
import { CustomerVSEmployeeComponent } from 'src/app/Components/CustomerController/CustomerVSEmployee/customer-vsemployee/customer-vsemployee.component';
import { CustomervsprocessComponent } from 'src/app/Components/CustomerController/CustomerVsProcess/customervsprocess/customervsprocess.component';
import { AddEditEmployeecontrollerComponent } from 'src/app/Components/EmployeeController/Components/add-edit-employeecontroller/add-edit-employeecontroller.component';
import { EmployeecontrollerComponent } from 'src/app/Components/EmployeeController/Components/employeecontroller/employeecontroller.component';
import { AddeditemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/addeditemployeevsdivision/addeditemployeevsdivision.component';
import { indexemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/indexemployeevsdivision/indexemployeevsdivision.component';
import { TopnavbarComponent } from 'src/app/Components/Navigation/TopNavbar/topnavbar/topnavbar.component';
import { DashboardComponent } from 'src/app/Components/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/Components/Navigation/TopNavbar/login/login.component';
import { AdvanceadjustmentComponent } from 'src/app/Components/AccountsController/AdvanceAdjustment/Index/advanceadjustment/advanceadjustment.component';
import { EditadvanceadjustmentComponent } from 'src/app/Components/AccountsController/AdvanceAdjustment/Edit/editadvanceadjustment/editadvanceadjustment.component';
import { CreditnoteindexComponent } from 'src/app/Components/AccountsController/CreditNote/creditnoteindex/creditnoteindex.component';
import { AddCreditnoteComponent } from 'src/app/Components/AccountsController/CreditNote/add-creditnote/add-creditnote.component';
import { ChangepasswordComponent } from 'src/app/Components/Navigation/ChangePass/changepassword/changepassword.component';
import { InvoicecancellationComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/invoicecancellation/invoicecancellation.component';
import { ViewinvoicecancelComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/viewinvoicecancel/viewinvoicecancel.component';
import { InvoicecancelleddetailsComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/invoicecancelleddetails/invoicecancelleddetails.component';
import { InvoiceComponent } from 'src/app/Components/AccountsController/Invoice/invoice/invoice.component';
import { DetailsComponent } from 'src/app/Components/AccountsController/Invoice/details/details.component';
import { GeneratedinvoiceComponent } from 'src/app/Components/AccountsController/Invoice/generatedinvoice/generatedinvoice.component';
import { ConfirminvoiceComponent } from 'src/app/Components/AccountsController/Invoice/confirminvoice/confirminvoice.component';
import { PopupinvoicecancellistComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/popupinvoicecancellist/popupinvoicecancellist.component';
import { PopupinvoiceComponent } from 'src/app/Components/AccountsController/Invoice/popupinvoice/popupinvoice.component';
import { WavierComponent } from 'src/app/Components/AccountsController/Wavier/wavier/wavier.component';
import { TallyComponent } from 'src/app/Components/AccountsController/Tally/tally/tally.component';
import { PopupwavierconfirmationComponent } from 'src/app/Components/AccountsController/Wavier/popupwavierconfirmation/popupwavierconfirmation.component';
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
// import { ProofReadingAllocationTableComponent } from 'src/app/Components/TopToolbarComponents/ProofReading/proof-reading-allocation-table/proof-reading-allocation-table.component';
import { ProofreadingComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proofreading/proofreading.component';
import { ProofReadingTableComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proof-reading-table/proof-reading-table.component';
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
import { ScopeComponent } from 'src/app/Components/Master/Scope/scope/scope.component';
import { AddScopeComponent } from 'src/app/Components/Master/Scope/add-scope/add-scope.component';
import { ViewEditScopeComponent } from 'src/app/Components/Master/Scope/view-edit-scope/view-edit-scope.component';
import { ViewScopeComponent } from 'src/app/Components/Master/Scope/view-scope/view-scope.component';
import { ErrorCategoryComponent } from 'src/app/Components/Master/ErrorCategory/error-category/error-category.component';
import { AddErrorcategoryComponent } from 'src/app/Components/Master/ErrorCategory/add-errorcategory/add-errorcategory.component';
import { ViewErrorCategoryComponent } from 'src/app/Components/Master/ErrorCategory/view-error-category/view-error-category.component';
import { EditErrorcategoryComponent } from 'src/app/Components/Master/ErrorCategory/edit-errorcategory/edit-errorcategory.component';
import { JobDetailsClientIndexComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/query-to-client/job-details-client-index/job-details-client-index.component';
import { JobDetailsSewPopComponent } from 'src/app/Components/TopToolbarComponents/SewOut/SewOut-JobDetailsPopup/job-details-sew-pop/job-details-sew-pop.component';
import { SewoutworkflowComponent } from 'src/app/Components/TopToolbarComponents/SewOut/SewOut-JobDetailsPopup/sewoutworkflow/sewoutworkflow.component';
import { ProcessComponent } from 'src/app/Components/Master/process/process/process.component';
import { AddEditprocessComponent } from 'src/app/Components/Master/process/add-editprocess/add-editprocess.component';
import { ViewProcessComponent } from 'src/app/Components/Master/process/view-process/view-process.component';
import { BenchStatusComponent } from 'src/app/Components/Master/BenchStatus/bench-status/bench-status.component';
import { OneTimemasterComponent } from 'src/app/Components/Master/one-timemaster/one-timemaster.component';
import { JobHistoryComponent } from 'src/app/Components/JobHistory/job-history/job-history.component';
import { JobTransferComponent } from 'src/app/Components/JobTransfer/job-transfer/job-transfer.component';
import { ProdjobpopupComponent } from 'src/app/Components/TopToolbarComponents/Production/prodjobpopup/prodjobpopup.component';
import { ProductionworkflowComponent } from 'src/app/Components/TopToolbarComponents/Production/productionworkflow/productionworkflow.component';
import { ProofreadingAllocationComponent } from 'src/app/Components/TopToolbarComponents/ProofReadingAllocation/proofreading-allocation/proofreading-allocation.component';
import { CreditdaysApprovalComponent } from 'src/app/Components/Sales/creditdays-approval/creditdays-approval.component';
import { UnApprovaljobsComponent } from 'src/app/Components/Sales/un-approvaljobs/un-approvaljobs.component';
import { ViewUnapprovaljobsComponent } from 'src/app/Components/Sales/view-unapprovaljobs/view-unapprovaljobs.component';
import { CustomerSalesmappingComponent } from 'src/app/Components/Sales/customer-salesmapping/customer-salesmapping.component';
import { PricingApprovalprocessComponent } from 'src/app/Components/Sales/pricing-approvalprocess/pricing-approvalprocess.component';
import { BankComponent } from 'src/app/Components/Bank/bank/bank.component';
import { VendorComponent } from 'src/app/Components/Vendor/vendor/vendor.component';
import { EditVendorComponent } from 'src/app/Components/Vendor/edit-vendor/edit-vendor.component';
import { UpdatevendorComponent } from 'src/app/Components/Vendor/updatevendor/updatevendor.component';
import { IndexchecklistComponent } from 'src/app/Components/CustomerVSChecklist/indexchecklist/indexchecklist.component';
import { AddchecklistComponent } from 'src/app/Components/CustomerVSChecklist/addchecklist/addchecklist.component';
import { ViewchecklistComponent } from 'src/app/Components/CustomerVSChecklist/viewchecklist/viewchecklist.component';
import { ItAssetindexComponent } from 'src/app/Components/ITAssets/it-assetindex/it-assetindex.component';
import { AddItassetsComponent } from 'src/app/Components/ITAssets/add-itassets/add-itassets.component';
import { BenchOptionsComponent } from 'src/app/Components/BenchOptions/bench-options/bench-options.component';
import { IndexCustomerSalesApprovalComponent } from 'src/app/Components/Sales/CustomerSalesApproval/index-customer-sales-approval/index-customer-sales-approval.component';
import { TabcustomertableComponent } from 'src/app/Components/Sales/CustomerSalesApproval/tabcustomertable/tabcustomertable.component';
import { SalesMultiStepFormComponent } from 'src/app/Components/Sales/CustomerSalesApproval/Multistepform/sales-multi-step-form/sales-multi-step-form.component';
import { authGuard } from 'src/app/AuthGuard/auth.guard';
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
import { IndexBillingCycleComponent } from 'src/app/Components/BillingCycleMonthly/index-billing-cycle/index-billing-cycle.component';
import { AddeditBillingComponent } from 'src/app/Components/BillingCycleMonthly/addedit-billing/addedit-billing.component';
import { UpdateBillingComponent } from 'src/app/Components/BillingCycleMonthly/update-billing/update-billing.component';
import { SSRSReportViewerComponent } from 'src/app/Components/AccountsController/Invoice/SSRS-REPORTVIEWER/ssrsreport-viewer/ssrsreport-viewer.component';
import { ActionsCellRendererComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/actions-cell-renderer/actions-cell-renderer.component';

//Routing to another components 
const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'acc-viewinvdet', component: InvoicecancelleddetailsComponent, canActivate: [authGuard] },
  // { path: 'topnavbar/clientindex/joborder', component: JoborderComponent , canActivate: [authGuard]},

  {
    path: 'topnavbar',
    component: TopnavbarComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'changepassword', component: ChangepasswordComponent, canActivate: [authGuard] },
      //TOPNAVBAR COMPONENTS
      {
        path: 'clientindex', component: ClientordinationindexComponent
        , canActivate: [authGuard]
      },
      { path: 'clientindex/joborder', component: JoborderComponent, canActivate: [authGuard] }, // Added redirect path
      { path: 'production', component: ProductionallocationComponent, canActivate: [authGuard] },
      { path: 'productiontable', component: ProductionallocationtableComponent, canActivate: [authGuard] },
      { path: 'JobAssignPopup', component: JobAssignedDetailsPopupComponent, canActivate: [authGuard] },
      //ClientCordination
      { path: 'clientindex/Jobexcel', component: JoborderexcelComponent, canActivate: [authGuard] },
      { path: 'clientindex/completedjobs', component: CompletedjobsComponent, canActivate: [authGuard] },
      { path: 'clientindex/clientorder', component: ClientordersComponent, canActivate: [authGuard] },
      { path: 'clientindex/clientordertable', component: ClientorderstableComponent, canActivate: [authGuard] },
      { path: 'clientindex/clientordertable', component: ClientorderstableComponent, canActivate: [authGuard] },
      { path: 'clientindex/ActionsCellRenderer', component: ActionsCellRendererComponent, canActivate: [authGuard] },
      { path: 'clientindex/clientorder/clientorderview', component: ClientorderviewComponent, canActivate: [authGuard] },
      { path: 'clientindex/clientorder/clientdetailpopup', component: ClientdetailspopupComponent, canActivate: [authGuard] },
      { path: 'clientindex/clientorder/fileconvert', component: FileconvertComponent, canActivate: [authGuard] },
      { path: 'clientindex/clientorder/fileconvert', component: JobDetailsClientIndexComponent, canActivate: [authGuard] },  //Main index Jobdetailpopup

      //QualityAlloactionsComponent
      { path: 'qualityallocation', component: QualityallocationComponent, canActivate: [authGuard] },
      { path: 'qualityallocationtable', component: QualityallocationtableComponent, canActivate: [authGuard] },
      { path: 'qualitypopup', component: QualitypopupjobassignComponent, canActivate: [authGuard] },

      //Quality
      { path: 'quality', component: QualityComponent, canActivate: [authGuard] },
      { path: 'qualitytable', component: QualitytableComponent, canActivate: [authGuard] },
      { path: 'qualityjobpop', component: QualityjobdetailpopupComponent, canActivate: [authGuard] },
      { path: 'qualityworkflow', component: QualityWorkflowComponent, canActivate: [authGuard] },
      { path: 'jobhistorytable', component: JobhistorypopuptableComponent, canActivate: [authGuard] },
      //Productionmaincomponent
      { path: 'productionmain', component: ProductionComponent, canActivate: [authGuard] },
      { path: 'productionmaintable', component: ProductiontableComponent, canActivate: [authGuard] },
      { path: 'prodjobpopup', component: ProdjobpopupComponent, canActivate: [authGuard] },
      { path: 'prodworkflow', component: ProductionworkflowComponent, canActivate: [authGuard] },

      //ProofReadingAllocation
      { path: 'proofreadingallocation', component: ProofreadingAllocationComponent, canActivate: [authGuard] },
      //ProofReading
      { path: 'proofreading', component: ProofreadingComponent, canActivate: [authGuard] },
      { path: 'proofreadingtable', component: ProofReadingTableComponent, canActivate: [authGuard] },
      { path: 'proofreadingdetails', component: ProofjobdetailpopupComponent, canActivate: [authGuard] },
      { path: 'proofhistory', component: ProofjobhistorypopupComponent, canActivate: [authGuard] },
      { path: 'proofworkflow', component: ProofworkflowComponent, canActivate: [authGuard] },

      //BuddyProof
      { path: 'buddyproof', component: BuddyProofComponent, canActivate: [authGuard] },
      { path: 'buddyprooftable', component: BuddyProofTableComponent, canActivate: [authGuard] },
      //SewoutProof
      { path: 'sewout', component: SewOutComponent, canActivate: [authGuard] },
      { path: 'sewtable', component: SewOutTableComponent, canActivate: [authGuard] },
      { path: 'sewJobDetails', component: JobDetailsSewPopComponent, canActivate: [authGuard] },
      { path: 'sewoutworkflow', component: SewoutworkflowComponent, canActivate: [authGuard] },
      //SideNavbarMenu
      //EmployeeController
      { path: 'Emp-Empcontroller', component: EmployeecontrollerComponent, canActivate: [authGuard] },
      { path: 'Emp-addeditEmpcontroller', component: AddEditEmployeecontrollerComponent, canActivate: [authGuard] },
      { path: 'Emp-editaddEmpcontroller', component: EditaddemployeecontrollerComponent, canActivate: [authGuard] },
      //EmployeevsdivController
      { path: 'Emp-empvsdiv', component: indexemployeevsdivisionComponent, canActivate: [authGuard] },
      { path: 'Emp-addeditempvsdiv', component: AddeditemployeevsdivisionComponent, canActivate: [authGuard] },
      //customercontroller
      //CustomerVSEmployee
      { path: 'cus-cusvsemp', component: CustomerVSEmployeeComponent, canActivate: [authGuard] },
      { path: 'cus-addeditcusvsemp', component: AddEditCustomerVSEmployeeComponent, canActivate: [authGuard] },
      //CustomerVSprocess
      { path: 'cus-cusvsprocess', component: CustomervsprocessComponent, canActivate: [authGuard] },
      //AccountsController
      //pricingcalculation
      { path: 'acc-pricing', component: PricingcalculationComponent, canActivate: [authGuard] },
      { path: 'acc-pricingpopup', component: InformationpopupComponent, canActivate: [authGuard] },
      //Non-billable
      { path: 'acc-nonbill', component: NonbillablejobsComponent, canActivate: [authGuard] },
      //Customerreceipts
      { path: 'acc-customer', component: CustomerreceiptsindexComponent, canActivate: [authGuard] },
      { path: 'acc-viewcustomer', component: AddEditCustomerreceiptsComponent, canActivate: [authGuard] },
      { path: 'addreceivables', component: AddReceivablesComponent, canActivate: [authGuard] },
      //ScopeChange
      { path: 'acc-scopechange', component: ScopechangeComponent, canActivate: [authGuard] },
      //Advance-Adjustment
      { path: 'acc-advance', component: AdvanceadjustmentComponent, canActivate: [authGuard] },
      { path: 'acc-editadvance', component: EditadvanceadjustmentComponent, canActivate: [authGuard] },
      //credit-note
      { path: 'acc-creditnote', component: CreditnoteindexComponent, canActivate: [authGuard] },
      { path: 'acc-addcredit', component: AddCreditnoteComponent, canActivate: [authGuard] },
      //wavier
      { path: 'acc-wavier', component: WavierComponent, canActivate: [authGuard] },
      //popupwaiver
      { path: 'acc-wavierpop', component: PopupwavierconfirmationComponent, canActivate: [authGuard] },
      //Tally
      { path: 'acc-tally', component: TallyComponent, canActivate: [authGuard] },
      // Invoicecancellation,
      { path: 'acc-invcan', component: InvoicecancellationComponent, canActivate: [authGuard] },
      // ViewinvoicecancelComponent,
      { path: 'acc-viewinvcan', component: ViewinvoicecancelComponent, canActivate: [authGuard] },
      // InvoicecancelleddetailsComponent,
      { path: 'acc-viewinvdet', component: InvoicecancelleddetailsComponent, canActivate: [authGuard] },
      //popupinvoicecancelledlist
      { path: 'acc-popinvcan', component: PopupinvoicecancellistComponent, canActivate: [authGuard] },
      //Invoicecomponent
      { path: 'acc-invoice', component: InvoiceComponent, canActivate: [authGuard] },
      { path: 'acc-details', component: DetailsComponent, canActivate: [authGuard] },
      { path: 'acc-generatedinvoice', component: GeneratedinvoiceComponent, canActivate: [authGuard]   },
      { path: 'acc-confirminvoice', component: ConfirminvoiceComponent, canActivate: [authGuard] },
      { path: 'acc-popupinvoice', component: PopupinvoiceComponent, canActivate: [authGuard]    },
      { path: 'acc-SSRS', component: SSRSReportViewerComponent, canActivate: [authGuard]   },

      // Master Order
      { path: 'master-user', component: UserMasterComponent, canActivate: [authGuard] },
      // Scope
      { path: 'master-scope', component: ScopeComponent, canActivate: [authGuard] },
      { path: 'master-scopeAdd', component: AddScopeComponent, canActivate: [authGuard] },
      { path: 'master-scope/edit', component: ViewEditScopeComponent, canActivate: [authGuard] },
      { path: 'master-scope/view', component: ViewScopeComponent, canActivate: [authGuard] },

      // Error Category
      { path: 'errorCategory', component: ErrorCategoryComponent, canActivate: [authGuard] },
      { path: 'error-Categoryadd', component: AddErrorcategoryComponent, canActivate: [authGuard] },
      { path: 'error-Categoryview', component: ViewErrorCategoryComponent, canActivate: [authGuard] },
      { path: 'error-Categoryedit', component: EditErrorcategoryComponent, canActivate: [authGuard] },


      //  Process Master
      { path: 'processMaster', component: ProcessComponent, canActivate: [authGuard] },
      { path: 'process-addEdit', component: AddEditprocessComponent, canActivate: [authGuard] },
      { path: 'process-view', component: ViewProcessComponent, canActivate: [authGuard] },

      //  Bench Status
      { path: 'benchStatus', component: BenchStatusComponent, canActivate: [authGuard] },

      // OneTime Master
      { path: 'oneTimeMaster', component: OneTimemasterComponent, canActivate: [authGuard] },
      //  Job History
      { path: 'jobHistory', component: JobHistoryComponent, canActivate: [authGuard] },

      // Job Transfer
      { path: 'jobTransfer', component: JobTransferComponent, canActivate: [authGuard] },

      //Bank
      { path: 'bank', component: BankComponent, canActivate: [authGuard] },

      //VENDOR
      { path: 'vendor', component: VendorComponent, canActivate: [authGuard] },
      { path: 'editvendor', component: EditVendorComponent, canActivate: [authGuard] },
      { path: 'updatevendor', component: UpdatevendorComponent, canActivate: [authGuard] },

      //CUSTOMERVSCHECKLIST
      { path: 'CustomerVsChecklist', component: IndexchecklistComponent, canActivate: [authGuard] },
      { path: 'edit', component: AddchecklistComponent, canActivate: [authGuard] },
      { path: 'view', component: ViewchecklistComponent, canActivate: [authGuard] },


      //ITASSET
      { path: 'ITAsset', component: ItAssetindexComponent, canActivate: [authGuard] },
      { path: 'addITAsset', component: AddItassetsComponent, canActivate: [authGuard] },

      //Bench Options
      { path: 'benchOptions', component: BenchOptionsComponent, canActivate: [authGuard] },

      // SALES


      { path: 'creditSales', component: CreditdaysApprovalComponent, canActivate: [authGuard] },
      { path: 'unapprovalJobs', component: UnApprovaljobsComponent, canActivate: [authGuard] },
      { path: 'view-unapprovalJobs', component: ViewUnapprovaljobsComponent, canActivate: [authGuard] },
      { path: 'customer-salesmapping', component: CustomerSalesmappingComponent, canActivate: [authGuard] },
      { path: 'pricing-Approval', component: PricingApprovalprocessComponent, canActivate: [authGuard] },
      //SALES CONTROLLER
      //CustomerVSDivision
      { path: 'sales-cusvsdiv', component: CustomervsdivisionindexComponent, canActivate: [authGuard] },


      //1.PRICING    
      { path: 'pricing', component: PricingComponent, canActivate: [authGuard] },

      //Sales- CustomerSalesApproval
      { path: 'customerSalesApproval', component: IndexCustomerSalesApprovalComponent, canActivate: [authGuard] },
      { path: 'customerSalesTable', component: TabcustomertableComponent, canActivate: [authGuard] },
      { path: 'multistepform', component: SalesMultiStepFormComponent, canActivate: [authGuard] },


      //Bank
      { path: 'bank', component: BankComponent, canActivate: [authGuard] },

      //VENDOR
      { path: 'vendor', component: VendorComponent, canActivate: [authGuard] },
      { path: 'editvendor', component: EditVendorComponent, canActivate: [authGuard] },
      { path: 'updatevendor', component: UpdatevendorComponent, canActivate: [authGuard] },

      //CUSTOMERVSCHECKLIST
      { path: 'CustomerVsChecklist', component: IndexchecklistComponent, canActivate: [authGuard] },
      { path: 'edit', component: AddchecklistComponent, canActivate: [authGuard] },
      { path: 'view', component: ViewchecklistComponent, canActivate: [authGuard] },


      //ITASSET
      { path: 'ITAsset', component: ItAssetindexComponent, canActivate: [authGuard] },
      { path: 'addITAsset', component: AddItassetsComponent, canActivate: [authGuard] },

      //Bench Options
      { path: 'benchOptions', component: BenchOptionsComponent, canActivate: [authGuard] },

      //EmployeeVsSkillset
      { path: 'indexskillset', component: IndexSkillsetComponent, canActivate: [authGuard] },
      { path: 'addeditskillset', component: AddEditSkillsetComponent, canActivate: [authGuard] },
      { path: 'viewskillset', component: ViewSkillsetComponent, canActivate: [authGuard] },
      { path: 'updateskillset', component: UpdateSkillSetComponent, canActivate: [authGuard] },


      //JOBFILESLOCATIONMASTER
      { path: 'JobFilesLocationMaster', component: JobFilesLocationMasterIndexComponent, canActivate: [authGuard] },

      //CustomerNorms
      { path: 'customerNorms', component: CustomernormsindexComponent, canActivate: [authGuard] },
      { path: 'addcustomerNorms', component: AddCustomerNormsComponent, canActivate: [authGuard] },
      { path: 'updatecustomerNorms', component: UpdateCustomerNormsComponent, canActivate: [authGuard] },


      //Attendance
      { path: 'attendance', component: AttendanceIndexComponent, canActivate: [authGuard] },

      //Billing Cycle Monthly
      { path: 'indexBiling', component: IndexBillingCycleComponent, canActivate: [authGuard] },
      { path: 'addeditBilling', component: AddeditBillingComponent, canActivate: [authGuard] },
      { path: 'updateBilling', component: UpdateBillingComponent, canActivate: [authGuard] },

    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class NavigationRoutingModule { }