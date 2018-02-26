import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  title = 'Users List';
  users: any;
  $userSub: Subscription;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.$userSub = this.dataService.fetchUsers().subscribe(res => { this.users = res; });
  }

  ngOnDestroy() {
    if (this.$userSub) {
      this.$userSub.unsubscribe();
    }
  }

}
