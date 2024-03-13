import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundErrorComponent } from './not-found-error/not-found-error.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [NavBarComponent, ServerErrorComponent, NotFoundErrorComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    BsDropdownModule
  ],
  exports:[NavBarComponent,SectionHeaderComponent]
})
export class CoreModule { }
