import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz, QuizConfig, Option } from 'src/app/models';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/services/exam.service';
import { AppRoutes } from 'src/app/shared/constant';
import { ExamCompleteModalComponent } from 'src/app/shared/modal/exam-complete-modal/exam-complete-modal.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizes: any[] = [];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string = "";
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date = new Date();
  endTime: Date = new Date();
  ellapsedTime = '00:00';
  duration = '';

  exam: any = {};
  examId: string = "";

  dialogRef!: MatDialogRef<ExamCompleteModalComponent>;
  user = JSON.parse(localStorage.getItem('user')!);

  constructor(private quizService: ExamService,
    private dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.activateRoute.params.subscribe(res => {
      this.examId = res["id"];
      this.getExamList();
    });
  }

  getExamList(): void {
    this.quizService.getExamList().subscribe((res: any) => {
      this.exam = res.exams.find((x: any) => x.id === this.examId);
      let examIndex = res.exams.findIndex((x: any) => x.id === this.examId);
      console.log('this.exam', this.exam)
      if (this.exam) {
        this.quizName = this.quizes[examIndex].id;
        this.loadQuiz(this.quizName);
      }
    })
  }

  loadQuiz(quizName: string) {
    this.quizService.getQuestions(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions?.length ? this.quiz.questions?.length : 1;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.exam.time);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit() {
    let answers = [];
    this.quiz.questions?.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    this.quizService.addResult(this.quiz.questions, this.examId);
    this.mode = 'result';
    this.router.navigate([AppRoutes.mainExamResultUrl])

  }

  finishExam() {
    this.dialogRef = this.dialog.open(ExamCompleteModalComponent, {
      width: '450px',
    });

    this.dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.onSubmit();
      }
    })
  }

}
