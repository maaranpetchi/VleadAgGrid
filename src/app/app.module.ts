import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './AngularMaterialModule/material/material.module';
import { NavigationModule } from './NavigationModuleRouting/navigation/navigation.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AdvanceadjustmentComponent } from './Components/AccountsController/AdvanceAdjustment/Index/advanceadjustment/advanceadjustment.component';
import { EditadvanceadjustmentComponent } from './Components/AccountsController/AdvanceAdjustment/Edit/editadvanceadjustment/editadvanceadjustment.component';
import { MovetointegrationComponent } from './Components/AccountsController/Tally/movetointegration/movetointegration.component';
import { UpdateExchangeRateComponent } from './Components/AccountsController/Tally/update-exchange-rate/update-exchange-rate.component';
import { SpinnerComponent } from './Components/Spinner/spinner/spinner.component';
import { DialogComponent } from './Components/dialog/dialog.component';
import { ViewUnapprovaljobsComponent } from './Components/Sales/view-unapprovaljobs/view-unapprovaljobs.component';
import { CustomerSalesmappingComponent } from './Components/Sales/customer-salesmapping/customer-salesmapping.component';
import { PricingApprovalprocessComponent } from './Components/Sales/pricing-approvalprocess/pricing-approvalprocess.component';
import { EmployeePopupComponent } from './Components/TopToolbarComponents/ProofReadingAllocation/employee-popup/employee-popup.component';
import { JobCategorypopupComponent } from './Components/TopToolbarComponents/ProofReadingAllocation/job-categorypopup/job-categorypopup.component';
import { VendorService } from './Services/Vendor/vendor.service';
import { FilterPipe } from './pipe/filter.pipe';
import { ItemFilterPipe } from './Filter/item-filter.pipe';
import { SSRSReportViewerComponent } from './Components/AccountsController/Invoice/SSRS-REPORTVIEWER/ssrsreport-viewer/ssrsreport-viewer.component';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer-v2';
import { BirthdayComponent } from './Components/Navigation/Birthday/birthday/birthday.component';
import { AnniversaryComponent } from './Components/Navigation/Anniversary/anniversary/anniversary.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { DeleteActionRenderingComponent } from './Components/EmployeeVSDivision/delete-action-rendering/delete-action-rendering.component';

@NgModule({
  declarations: [
    AppComponent,
    MovetointegrationComponent,
    UpdateExchangeRateComponent,
    SpinnerComponent,
    DialogComponent,
    ViewUnapprovaljobsComponent,
    CustomerSalesmappingComponent,
    PricingApprovalprocessComponent,
    EmployeePopupComponent,
    JobCategorypopupComponent,
    FilterPipe,
    ItemFilterPipe,
    BirthdayComponent,
    AnniversaryComponent,
    DeleteActionRenderingComponent,
    
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    NavigationModule,
    MatDialogModule,
    AgGridModule
  ],
  exports:[
    FilterPipe
  ],
  providers: [
    EditadvanceadjustmentComponent,
    AdvanceadjustmentComponent,
    VendorService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }