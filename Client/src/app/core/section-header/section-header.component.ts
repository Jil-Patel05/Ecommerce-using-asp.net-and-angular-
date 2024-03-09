import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  bService: BreadcrumbService = inject(BreadcrumbService);
  breadcrumb$: Observable<any[]>;
  ngOnInit(): void {
   this.breadcrumb$= this.bService.breadcrumbs$
  }

}
