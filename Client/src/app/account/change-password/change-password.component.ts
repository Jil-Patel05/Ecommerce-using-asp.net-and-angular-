import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent implements OnInit {
  fs: FormBuilder = inject(FormBuilder);
  toast: ToastrService = inject(ToastrService);
  account: AccountService = inject(AccountService);
  route: Router = inject(Router);
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fs.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      nwPassword:['',[Validators.required,Validators.minLength(8)]],
      confirmNwPassword:['',[Validators.required,Validators.minLength(8)]]
    })
  }

  onChangePassword() {
    console.log(this.form.value);

    if (this.form.invalid) {
      this.toast.error("Please fill all required filled properly");
      return;
    }
    if (this.form.get('nwPassword').value !== this.form.get("confirmNwPassword").value) {
      this.toast.error("confirm password doesn't match with new password");
      return;
    }
    
    this.account.resetPassword(this.form.value).subscribe({
      next:(res: any)=>{
        this.toast.success("Password reseted successfully");
        this.route.navigateByUrl("/account/user");
      },
      error: (err) => {
        this.toast.error("Can't find user,please fill feilds properly");
      }
    })

    
  }
}
