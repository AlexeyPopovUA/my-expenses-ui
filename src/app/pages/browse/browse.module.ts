import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppTranslationModule} from '../../app.translation.module';
import {NgaModule} from '../../theme/nga.module';

import {BrowseComponent} from './browse.component';
import {BrowseService} from './browse.service';
import {routing} from './browse.routing';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    BrowseComponent
  ],
  providers: [
    BrowseService
  ]
})
export class BrowseModule {
}
