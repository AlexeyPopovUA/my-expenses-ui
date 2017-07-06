import { Routes, RouterModule }  from '@angular/router';

import { BrowseComponent } from './browse.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: BrowseComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
