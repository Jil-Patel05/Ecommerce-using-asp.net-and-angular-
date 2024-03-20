import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { Login } from 'src/app/shared/Models/login';
import { ProfileFile } from 'src/app/shared/Models/profileFile';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  toast: ToastrService = inject(ToastrService);
  account: AccountService = inject(AccountService);
  file: ProfileFile;
  data: Login;
  fullName: string;
  email: string;

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem("loginData"));
    this.fullName = this.data.displayName;
    this.email = this.data.email;
  }

  OnProfileEdit(event) {
    
    let file = event.target.files[0];
    const formobj = new FormData();
    console.log(file);
    let userID = this.data.userID;
    if (
      (file.type === 'image/jpeg' || file.type === 'image/png')) {
      formobj.append('file', file);
       this.account.changeProfilePhoto(formobj,userID).subscribe({
        next: (res: ProfileFile) => {
           this.toast.success("Profile changes successfully");
           this.file = res;
           console.log(res);
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    } else {
      this.toast.error('please select jpeg or png format image');
    }
  }
}
