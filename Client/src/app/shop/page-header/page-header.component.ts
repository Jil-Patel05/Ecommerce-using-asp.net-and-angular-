import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() count: number;
  @Input() pageNumber: number;
  @Input() pageSize: number;


  remain: number;

  countRemain() {
    
  }
}
