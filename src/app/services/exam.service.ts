import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const examListurl = '../../assets/json/exams.json';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  getExamList(): Observable<any> {
    return this.http.get(examListurl);
  }

  getQuestions(url: string): Observable<any> {
    return this.http.get(url);
  }

  getAll(): any {
    return [
      { id: 'assets/json/questions.json', name: 'JavaScript' },
      { id: 'assets/json/csharp.json', name: 'C Sharp' },
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' }
    ];
  }

  addResult(data: any, examId: string): void {
   // localStorage.removeItem('userExam')
    let user = JSON.parse(localStorage.getItem('user')!);
    let storeData = {
      ...user,
      examId,
      result: data
    }
    let result = JSON.parse(localStorage.getItem('userExam')!);
    if (result) {
      let index = result.findIndex((x: any) => x.examId === examId && x.id === user.id);
      if (index > -1) {
        result[index] = storeData;
      } else
        result.push(storeData);
    } else {
      result = [storeData]
    }
    localStorage.setItem('userExam', JSON.stringify(result));
    console.log('result', result)
  }

}
