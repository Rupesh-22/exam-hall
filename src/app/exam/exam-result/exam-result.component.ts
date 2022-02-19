import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { AppRoutes } from 'src/app/shared/constant';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {

  userExams = JSON.parse(localStorage.getItem('userExam')!);
  userExam :any;
  user = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('this.user', this.user)
    this.userExam = this.userExams.find((x: any) => this.user.id === x.id);
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  goToExam() {
    this.router.navigate([AppRoutes.mainExamListUrl])
  }

}
