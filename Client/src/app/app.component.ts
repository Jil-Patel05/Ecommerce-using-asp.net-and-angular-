import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { product } from './shared/Models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';
 
  ngOnInit(): void {
    
  }
}
