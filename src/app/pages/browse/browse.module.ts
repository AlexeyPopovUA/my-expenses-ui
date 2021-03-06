import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowseComponent } from './browse.component';
import { BrowseService } from './browse.service';
import { BrowseTableComponent } from './browse-table/browse.table.component';
import { routing } from './browse.routing';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AppTranslationModule,
    NgaModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    routing
  ],
  declarations: [
    BrowseComponent,
    BrowseTableComponent
  ],
  providers: [
    BrowseService
  ]
})
export class BrowseModule {
}
