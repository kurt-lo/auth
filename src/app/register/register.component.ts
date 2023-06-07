import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import configurl from '../../assets/config/config.json';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  url = configurl.apiServer.url + '/api/Expense/';
registrationError: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  public register(form: NgForm) {
    const user = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
    };

    this.http
      .post(this.url + 'register', JSON.stringify(user), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .subscribe(
        response => {
          this.toastr.success('Registration successful');
          this.router.navigate(['/login']);
        },
        err => {
          this.toastr.error('Registration failed');
        }
      );
  }
}
