import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableRowComponent }      from './table-row/table-row.component';
import { FilterTableComponent }      from './filter-table/filter-table.component';

const routes: Routes = [
  { path: '', component: FilterTableComponent },
  { path: 'edit/:id', component: TableRowComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
