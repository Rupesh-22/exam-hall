import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';

import { ExamRoutingModule } from './exam-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ExamComponent } from './exam.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    QuizComponent,
    ExamListComponent,
    ExamResultComponent,
    ExamComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ExamRoutingModule
  ]
})
export class ExamModule { }
