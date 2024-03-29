import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared/Models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  fs: FormBuilder = inject(FormBuilder);
  toast: ToastrService = inject(ToastrService);
  account: AccountService = inject(AccountService);
  route: Router = inject(Router);
  activate: ActivatedRoute = inject(ActivatedRoute);
  form: FormGroup;
  url: string = '/';

  ngOnInit(): void {
    this.activate.queryParamMap.subscribe((res) => {
      return this.url = res.get('returnUrl') ?? '/';
    });
    console.log(this.url);
    // you can make custom validator also by describing the another function in ts file see in google
    this.form = this.fs.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onLogin() {
    if (this.form.invalid) {
      this.toast.error('Please fill credentials properly');
      return;
    }
    const obj = this.form.value;

    this.account.login(obj).subscribe({
      next: (res: any) => {
        this.toast.success('You are logged in successfully');
        this.route.navigateByUrl(this.url);
      },
      error: (err) => {
        this.toast.error('Please fill credentials properly');
      },
    });
  }

  testInput1(inpName: string): boolean {
    if (this.form && this.form.get(inpName) && this.form.get(inpName).touched) {
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
