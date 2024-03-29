import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  fs: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  toast: ToastrService = inject(ToastrService);
  account: AccountService = inject(AccountService);
  route: Router = inject(Router);
  
  ngOnInit(): void {
    this.form = this.fs.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      role:['']
    })
  }
  onRegister() {
    const obj = this.form.value;
    if (obj.password.length<=7) {
      this.toast.error("Your password must contain atleast 8 characters");
    }
    if (this.form.invalid) {
      this.toast.error("Please fill all required fields");
    }
    if (obj.password !== obj.confirmPassword) {
      this.toast.error("Your password doesn't match with confirmPassword");
    }
    this.account.register(obj).subscribe({
      next: (res: any) => {
        this.toast.success("You are registered successfully");
        this.route.navigateByUrl("/account/login");
      },
      error: (err) => {
        this.toast.error("This email is already taken by other")
      }
    })
  }
  testInput1(inpName: string): boolean {
    if (
      this.form &&
      this.form.get(inpName) &&
      this.form.get(inpName).touched
    ) {
      return true;
    }
    return false;
  }
  testInput2(inpName: string): boolean {
    if (!this.form.get(inpName).valid) {
      return true;
    }
    return false;
  }
  
}
