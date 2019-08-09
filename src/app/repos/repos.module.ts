import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReposPage } from './repos.page';

import { SearchCmptModule } from './search-cmpt/search-cmpt.module';


const routes: Routes = [
  {
    path: '',
    component: ReposPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SearchCmptModule,
  ],
  declarations: [ReposPage]
})
export class ReposPageModule {}
