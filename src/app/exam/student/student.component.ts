import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutes } from 'src/app/shared/constant';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  users: any[] = [];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  userExam = JSON.parse(localStorage.getItem('userExam')!);

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }


  goToResult(id: string, userId: string): void {
      const navigationExtras: any = {
        userId
      }
    this._router.navigate([AppRoutes.mainExamResultUrl + '/' + id , navigationExtras])
  }
}
  