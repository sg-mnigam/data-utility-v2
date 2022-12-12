import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DealerComponent } from './dealer/dealer.component';
import { MainComponent } from './main/main.component';
import { UtilsComponentsModule } from '../shared/utils-components/utils-components.module';


@NgModule({
  declarations: [DealerComponent, MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    UtilsComponentsModule
  ]
})
export class MainModule { }
