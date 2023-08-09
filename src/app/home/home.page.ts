import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users = [];
  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get('https://randomuser.me/api/?results=20&seed=simonics')
      .subscribe((res: any) => {
        this.users = res.results;
        console.log(this.users);
      });

  }
  selectChanged(event: any) {
    console.log('CHANGED', event);

  }

}
