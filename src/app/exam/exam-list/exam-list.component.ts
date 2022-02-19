import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import { AppRoutes } from 'src/app/shared/constant';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  exmalist: any[] = [];

  constructor(
    private examService: ExamService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getExamList();
  }

  getExamList(): void {
    this.examService.getExamList().subscribe((res: any) => {
      this.exmalist = res.exams;
    })
  }


  attemptExam(id: string): void {
    this._router.navigate([AppRoutes.mainExamQuizUrl + '/' + id])
  }
}
