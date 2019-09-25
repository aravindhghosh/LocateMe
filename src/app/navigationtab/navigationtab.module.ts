import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NavigationtabPage } from './navigationtab.page';

const routes: Routes = [
  {
    path: 'navigationtab',
    component: NavigationtabPage,
    children: [
      { path: 'currentposition', loadChildren: '../currentposition/currentposition.module#CurrentpositionPageModule' },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
      { path: 'about', loadChildren: '../about/about.module#AboutPageModule' }
    ]
  },
  {
    path: 'currentposition',
    redirectTo: '../currentposition/currentposition',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: '../home/home',
    pathMatch: 'full'
  },
  {
    path: 'about',
    redirectTo: '../about/about',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NavigationtabPage]
})
export class NavigationtabPageModule { }
