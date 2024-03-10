import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyReq: number = 0;
  spinner: NgxSpinnerService = inject(NgxSpinnerService);

  busy() {
    this.busyReq++;
    // name,configure
    this.spinner.show(
      undefined,
      {
        // type: 'ball-circus',
        bdColor: 'rgba(255, 255, 255, 0.7)',
        color: '#333333',
      }
    );
  }
  idle() {
    this.busyReq--;
    if (this.busyReq <= 0) {
      this.busyReq = 0;
      this.spinner.hide();
    }
  }
}
