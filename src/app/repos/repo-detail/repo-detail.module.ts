import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RepoDetailPage } from './repo-detail.page';

import { SafeurlPipe } from '../../safeurl.pipe';
import { MarkedPipe } from '../../marked.pipe';
import { AngularifyPipe } from 'src/app/angularify.pipe';
import { SearchCmptModule } from '../search-cmpt/search-cmpt.module';

const routes: Routes = [
  {
    path: '',
    component: RepoDetailPage
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
  declarations: [RepoDetailPage, SafeurlPipe, MarkedPipe, AngularifyPipe]
})
export class RepoDetailPageModule {}
