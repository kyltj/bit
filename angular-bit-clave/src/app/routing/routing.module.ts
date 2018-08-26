import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes} from '@angular/router';
import { BaseAuthGuard } from './../services/base-auth.guard';
import { CabinetComponent } from './../privatePages/cabinet/cabinet.component';

import { LandingComponent } from './../publicPages/landing/landing.component';
import { SettingsComponent } from './../privatePages/settings/settings.component';
import { UserComponent } from './../privatePages/user/user.component';
import { StoreComponent } from '../privatePages/store/store.component';


const routes: Routes = [
  { path: '', component: LandingComponent},
  {
    path: 'cabinet',
    component: CabinetComponent,
    children: [
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'store',
        component: StoreComponent
      }

    ],
    canActivate: [BaseAuthGuard]
  },
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes
    )
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
