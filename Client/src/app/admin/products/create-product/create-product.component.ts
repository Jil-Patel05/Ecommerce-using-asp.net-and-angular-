import { Component, OnInit, inject } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Enum } from 'src/app/shared/Models/enums';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  admin: AdminServiceService = inject(AdminServiceService);
  fs: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  toast: ToastrService = inject(ToastrService);
  form: FormGroup;
  enums: Enum;

  r: number[] = [1, 2, 3, 4];
  ngOnInit(): void {
    this.admin.getProductEnums().subscribe({
      next: (res: Enum) => {
        this.enums = res;
      },
      error: (err) => {
        console.log(err.error);
      },
    });

    this.form = this.fs.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      productDescription: ['', Validators.required],
      numberOfProduct: ['', Validators.required],
      productBrandID: ['', Validators.required],
      productTypeID: ['', Validators.required],
      Url1: ['', Validators.required],
      Url2: ['', Validators.required],
      Url3: ['', Validators.required],
      Url4: ['', Validators.required],
    });
  }
  onCreate() {
    if (this.form.invalid) {
      this.toast.error('Please fill all field properly');
      return;
    }
    const ar = [];
    ar.push(this.form.get('Url1').value);
    ar.push(this.form.get('Url2').value);
    ar.push(this.form.get('Url3').value);
    ar.push(this.form.get('Url4').value);

    const obj = {
      productName: this.form.get('productName').value,
      price: this.form.get('price').value,
      productDescription: this.form.get('productDescription').value,
      numberOfProduct: this.form.get('numberOfProduct').value,
      productBrandID: this.form.get('productBrandID').value,
      productTypeID: this.form.get('productTypeID').value,
      urls: ar,
    };

    console.log(obj);

    this.admin.createAdminProduct(obj).subscribe({
      next: (res: any) => {
        this.toast.success("Product created successfully");
        this.route.navigateByUrl("/admin/products/all-products")
      },
      error: (err: any) => {
        console.log(err.error);
      }
    })
  }
}
