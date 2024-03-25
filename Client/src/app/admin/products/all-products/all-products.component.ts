import { Component, OnInit, inject } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { AdminProducts } from 'src/app/shared/Models/adminProducts';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  admin: AdminServiceService = inject(AdminServiceService);
  products: AdminProducts[];

  ngOnInit(): void {
    
    this.admin.getAdminProducts().subscribe({
      next: (res: AdminProducts[]) => {
        this.products = res;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
