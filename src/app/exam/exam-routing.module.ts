import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../shared/constant';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ExamComponent } from './exam.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {
    path: '',
    component:ExamComponent,
    children:[
      {
        path: AppRoutes.examListUrl,
        component: ExamListComponent
      },
      {
        path: AppRoutes.examResultUrl,
        component: ExamResultComponent
      },
      {
        path: AppRoutes.examQuizUrl + '/:id',
        component: QuizComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
