import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class PhotosComponent implements OnInit, OnDestroy, OnChanges {
  title = 'Album Selected on Display';
  images; // variable to contain image list
  header; // variable to display album header
  @Input() selectedAlbums: any; // Input variable containing selected albums from Parent component : Albums
  @Input() albumList: any; // Input variable for list of album from parent component : Albums
  private $photoSub: Subscription; // subscription reference api call for getting photos
  private $timerSub: Subscription; // subscription reference for Timer
  counter; // counter variable
  displayCondition;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unSubscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedAlbums']) {
      this.counter = 0;
      this.images = [];
      this.unSubscription();
    }
  }
  // This methods gets called from parent : Album Component on click of Show Photos button
  displayPhoto() {
    this.counter = 0;
    if (this.selectedAlbums) {
      if (this.selectedAlbums.length > 1) {
        // starting timer with interval 20sec
        this.$timerSub = timer(0, 20000).subscribe(() => {
          this.displayCondition = this.counter % 2;
          this.apiRequest(this.displayCondition);
          this.counter += 1;
        });
      } else {
        this.displayCondition = 0;
        this.apiRequest(this.displayCondition);
        this.counter = 1;
      }
    }
  }
  // method to retrieve photos data from api call
  apiRequest(displayCondition) {
    this.$photoSub = this.dataService.fetchPhotos(this.selectedAlbums[displayCondition])
      .subscribe(res => {
        this.images = res;
        const albumSelected = this.albumList.filter(x => x.id === this.selectedAlbums[displayCondition]);
        this.header = albumSelected[0]['title'];
      });
  }

  unSubscription() {
    // Unsubscribing active subscriptions
    if (this.$photoSub) {
      this.$photoSub.unsubscribe();
    }
    if (this.$timerSub) {
      this.$timerSub.unsubscribe();
    }
  }

}
