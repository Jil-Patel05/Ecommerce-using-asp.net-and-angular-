import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  fs: FormBuilder = inject(FormBuilder);
  toast: ToastrService = inject(ToastrService);
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fs.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      query:['',Validators.required],
     })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toast.error("Please fill the require fields");
    }
    else {
      this.toast.success("Your query has been sent,we will reply you shortly");
      this.form.patchValue({
        firstName: [''],
        lastName:[''],
        email:[''],
        query:[''],
       })
    }
  }
}
