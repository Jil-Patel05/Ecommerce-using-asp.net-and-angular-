import { Component, OnInit, inject } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { OrderDetails } from 'src/app/shared/Models/orderDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  admin: AdminServiceService = inject(AdminServiceService);
  active: ActivatedRoute = inject(ActivatedRoute);
  fs = inject(FormBuilder);
  route: Router = inject(Router);
  toast: ToastrService = inject(ToastrService);
  form: FormGroup;
  order: OrderDetails;
  orderID: number;

  ngOnInit(): void {
    this.active.paramMap.subscribe((res) => {
      this.orderID = +res.get('id');
    });

    this.form = this.fs.group({
      orderID: [this.orderID, Validators.required],
      orderStatus: ['', Validators.required],
    });

    this.admin.getorderByOrderID(this.orderID).subscribe({
      next: (res: OrderDetails) => {
        this.order = res;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toast.error('Please select order status');
      return;
    }
    this.admin.changeOrderStatus(this.form.value).subscribe({
      next: (res: any) => {
        this.toast.success('Order status changed successfully');
        this.route.navigateByUrl('/admin/orders');
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
