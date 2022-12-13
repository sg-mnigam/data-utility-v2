import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { MatNativeDateModule } from "@angular/material/core";
import { RouterModule, Routes } from "@angular/router";
// import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from "./login/login.component";
import { OktaService } from "./okta-shared-resource/service/okta.service";


const routes:Routes=[
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
        path:'**',component:LoginComponent
    }
]


@NgModule({
    declarations: [
      LoginComponent,      
    ],
    imports:[
      FormsModule,
      ReactiveFormsModule,
    //   MatNativeDateModule,
      RouterModule.forChild(routes),
      CommonModule,
      
    ],
    providers: [OktaService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
export class OktaModule{

}