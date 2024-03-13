import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/Models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fs: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  toast: ToastrService = inject(ToastrService);
  account: AccountService = inject(AccountService);
  route: Router = inject(Router);
  
  ngOnInit(): void {
    this.form = this.fs.group({
      email:['jilpate@gmail.com',[Validators.required,Validators.email]],
      password:['12345678',[Validators.required, Validators.minLength(8)]],
    })
  }
  onLogin() {
    const obj = this.form.value;
    
    this.account.login(obj).subscribe({
      next: (res: any) => {
        this.toast.success("You are logged in successfully");
        this.route.navigateByUrl("/");
      },
      error: (err) => {
        this.toast.error("please fill credentials properly")
      }
    })
  }
}
