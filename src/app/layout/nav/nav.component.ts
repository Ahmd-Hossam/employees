import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.Logout()
  }
}
