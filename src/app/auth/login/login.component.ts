import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutes } from 'src/app/shared/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  message: string = "";

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      if (user.type === 'Admin')
        this._router.navigate([AppRoutes.mainExamStudentUrl]);
      else {
        this._router.navigate([AppRoutes.mainExamListUrl]);
      }
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


  onSubmit(): void {
    console.log(this.loginForm.value);
    this.message = "";
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this._authService.loginUser().subscribe(res => {
        let users = res.users;
        let user = users.find((x: any) => x.email === email && x.password === password);
        console.log('user', user)
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          if (user.type === 'Admin')
            this._router.navigate([AppRoutes.mainExamStudentUrl]);
          else
            this._router.navigate([AppRoutes.mainExamListUrl]);
        } else {
          this.message = 'Invalid email or pasword'
        }
      });
    }
  }
}
