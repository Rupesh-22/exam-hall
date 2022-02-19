import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamCompleteModalComponent } from './modal/exam-complete-modal/exam-complete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ExamCompleteModalComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [ExamCompleteModalComponent]
})
export class SharedModule { }
