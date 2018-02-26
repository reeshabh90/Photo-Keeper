import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  title = 'Album Selected on Display';
  images; // variable to contain image list
  header; // variable to display album header
  @Input() selectedAlbums: any; // Input variable containing selected albums from Parent component : Albums
  @Input() albumList: any; // Input variable for list of album from parent component : Albums
  private $photoSub: Subscription; // subscription reference api call for getting photos
  private $timerSub: Subscription; // subscription reference for Timer
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Destroying active subscription
    if (this.$photoSub) {
      this.$photoSub.unsubscribe();
    }
    if (this.$timerSub) {
      this.$timerSub.unsubscribe();
    }

  }
  // This methods gets called from parent : Album Component on click of Show Photos button
  displayPhoto() {
    let counter = 0; // setting counter to toggle between album selection as per odd/even values
    if (this.selectedAlbums) {
      // Check if more than 1 albums are selected
      if (this.selectedAlbums.length > 1) {
        // starting timer with interval 20sec
        this.$timerSub = timer(0, 20000).subscribe(() => {
          const displayCondition = counter % 2;
          // ON even condition, fetch 1st album
          if (displayCondition === 0) {
            this.$photoSub = this.dataService.fetchPhotos(this.selectedAlbums[displayCondition])
              .subscribe(res => {
                counter += 1; this.images = res;
                const albumSelected = this.albumList.filter(x => x.id === this.selectedAlbums[displayCondition]);
                this.header = albumSelected[0]['title'];
              });
          } else {
            // ON odd condition, fetch 2nd album
            this.$photoSub = this.dataService.fetchPhotos(this.selectedAlbums[displayCondition])
              .subscribe(res => {
                counter += 1; this.images = res;
                const albumSelected = this.albumList.filter(x => x.id === this.selectedAlbums[displayCondition]);
                this.header = albumSelected[0]['title'];
              });
          }

        });
      } else {
        this.$photoSub = this.dataService.fetchPhotos(this.selectedAlbums[0])
          .subscribe(res => {
            this.images = res;
            const albumSelected = this.albumList.filter(x => x.id === this.selectedAlbums[0]);
            this.header = albumSelected[0]['title'];
          });
      }
    }
  }

}
