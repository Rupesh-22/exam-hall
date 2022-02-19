import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-exam-complete-modal',
  templateUrl: './exam-complete-modal.component.html',
  styleUrls: ['./exam-complete-modal.component.scss']
})
export class ExamCompleteModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ExamCompleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
  }

  ngOnInit(): void {
  }

  closeDialog(isClosed: boolean = false) {
    this.dialogRef.close(isClosed);
  }

}
