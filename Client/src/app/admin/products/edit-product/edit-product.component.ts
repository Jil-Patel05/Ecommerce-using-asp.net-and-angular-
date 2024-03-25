import { Component, OnInit, inject } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSingleProduct } from 'src/app/shared/Models/adminSingleProduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enum } from 'src/app/shared/Models/enums';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  admin: AdminServiceService = inject(AdminServiceService);
  activate: ActivatedRoute = inject(ActivatedRoute);
  fs: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  toast: ToastrService = inject(ToastrService);
  productID: number;
  product: AdminSingleProduct;
  form: FormGroup;
  enums: Enum;

  ngOnInit(): void {
    this.activate.paramMap.subscribe((res) => {
      this.productID = +res.get('id');
    });
    this.form = this.fs.group({
      productID: [this.productID, Validators.required],
      productName: ['', Validators.required],
      price: ['', Validators.required],
      productDescription: ['', Validators.required],
      numberOfProduct: ['', Validators.required],
      productBrandID: ['', Validators.required],
      productTypeID: ['', Validators.required],
    });
    this.admin.getAdminSingleProduct(this.productID).subscribe({
      next: (res: AdminSingleProduct) => {
        this.product = res;
        this.admin.getProductEnums().subscribe({
          next: (res: Enum) => {
            this.enums = res;
          },
          error: (err) => {
            console.log(err.error);
          },
        });
        this.form.patchValue({
          productName: this.product.productName,
          price: this.product.price,
          productDescription: this.product.productDescription,
          numberOfProduct: this.product.numberOfProduct,
          productBrandID: this.product.productBrandID,
          productTypeID: this.product.productTypeID,
        });
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
  onDelete() {
    this.admin.deleteAdminProuct(this.productID).subscribe({
      next: (res: any) => {
        this.toast.success('Product Deleted successfully');
        this.route.navigateByUrl('/admin/products/all-products');
      },
      error: (err) => {
        console.log(err.error);
      },
    })
  }
  onEdit() {
    if (this.form.invalid) {
      this.toast.error("please fill all the field");
      return;
    }
    this.admin.editAdminSingleProduct(this.form.value).subscribe({
      next: (res: any) => {
        this.toast.success('Product updated successfully');
        this.route.navigateByUrl('/admin/products/all-products');
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
