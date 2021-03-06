import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPagePage } from './search-page.page';
import { SearchCmptModule } from '../search-cmpt/search-cmpt.module';


const routes: Routes = [
  {
    path: '',
    component: SearchPagePage
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
  declarations: [SearchPagePage]
})
export class SearchPagePageModule {}
