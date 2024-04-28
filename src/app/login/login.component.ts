import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.http.get<any[]>('http://localhost:3000/users?username=' + this.username + '&password=' + this.password)
      .subscribe(users => {
        if (users.length > 0) {
          //alert('Login successful!');
          // Redirect to dashboard or desired page
          this.router.navigate(['/items']);
        } else {
          alert('Invalid username or password');
        }
      });
  }
}
