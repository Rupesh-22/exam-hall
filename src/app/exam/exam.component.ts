import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../shared/constant';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent {

  user = JSON.parse(localStorage.getItem('user')!);

  constructor(private router: Router) {
    console.log(this.user)
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.router.navigate([AppRoutes.mainLoginUrl]);
  }


}
