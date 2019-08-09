import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCmptComponent } from './search-cmpt.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [SearchCmptComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [SearchCmptComponent],
})
export class SearchCmptModule { }
