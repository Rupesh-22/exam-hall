import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { AppRoutes } from 'src/app/shared/constant';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {

  userExams = JSON.parse(localStorage.getItem('userExam')!);
  userExam: any;
  user = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(res => {
      let examId = res["id"];
      let userId = res["userId"];
      this.userExam = this.userExams.find((x: any) => userId === x.user.id && x.exam.id === examId);
    });
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  goToExam() {
    if (this.user.type === 'Admin') {
      this.router.navigate([AppRoutes.mainExamStudentUrl])
    } else {
      this.router.navigate([AppRoutes.mainExamListUrl])
    }

  }

}
