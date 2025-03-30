import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  imports: [],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  userName : any = sessionStorage.getItem('username');
  constructor(private router: Router) {}
  signOut(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
