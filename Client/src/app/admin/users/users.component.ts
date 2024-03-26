import { Component, inject } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { AdminUsers } from 'src/app/shared/Models/adminUsers';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  admin: AdminServiceService = inject(AdminServiceService);
  users: AdminUsers[];

  ngOnInit(): void {
    this.admin.getAllUsers().subscribe({
      next: (res: AdminUsers[]) => {
        this.users = res;
        console.log(this.users);
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }
}
