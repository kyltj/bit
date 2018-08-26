import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RoutingModule } from './routing/routing.module';
import { PublicPagesModule } from './publicPages/public-pages.module';
import { CabinetModule } from './privatePages/cabinet/cabinet.module';
import { FormsModule } from '@angular/forms';

import { SettingsModule } from './privatePages/settings/settings.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserComponent } from './privatePages/user/user.component';
import { StoreComponent } from './privatePages/store/store.component';
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserComponent,
    StoreComponent,
  ],
  imports: [
    BrowserModule,
    PublicPagesModule,
    RoutingModule,
    CabinetModule,
    MatProgressSpinnerModule,
    SettingsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
