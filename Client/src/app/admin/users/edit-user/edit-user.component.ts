import { Component, OnInit, inject } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SingleUser } from 'src/app/shared/Models/singleUser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  admin: AdminServiceService = inject(AdminServiceService);
  active: ActivatedRoute = inject(ActivatedRoute);
  fs: FormBuilder = inject(FormBuilder);
  toast: ToastrService = inject(ToastrService);
  route: Router = inject(Router);
  form: FormGroup;
  userID: number;
  user: SingleUser;

  ngOnInit(): void {
    this.active.paramMap.subscribe((res) => {
      this.userID = +res.get('id');
    });
    this.form = this.fs.group({
      userID: [this.userID, Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.admin.getSingleUser(this.userID).subscribe({
      next: (res: SingleUser) => {
        this.user = res;
        this.form.patchValue({
          userName: this.user.fullname,
          email: this.user.email,
          role: this.user.role,
        });
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
  onEdit() {
    console.log('hey');
    const obj = {
      userID: this.userID,
      role: this.form.get('role').value,
    };
    this.admin.updateSingleUser(obj).subscribe({
      next: (res: SingleUser) => {
        this.toast.success('Successfully changed user role');
        this.route.navigateByUrl("/admin/users");
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
