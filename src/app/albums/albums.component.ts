import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';
import { PhotosComponent } from '../photos/photos.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  title = 'Album List';
  albums: any[];
  constructor(private dataService: DataService, private route: ActivatedRoute) { }
  selectedAlbums: string[] = [];
  $albumSub: Subscription;
  @Input() userId: any;
  ngOnInit() {
    this.getAlbumByUserId(this.route.snapshot.params['id']);
  }

  ngOnDestroy() {
    if (this.$albumSub) {
      this.$albumSub.unsubscribe();
    }
  }

  getAlbumByUserId(userId) {
    this.$albumSub = this.dataService.fetchAlbums(userId).subscribe(res => { this.albums = res; });
  }


}
