import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

  constructor(
      private router: Router,
      private navCtrl: NavController,
      private route: ActivatedRoute,
      private placesService: PlacesService,
      private modalController: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }
      this.place = this.placesService.getplace(paramMap.get('placeId'));
    }
    );
  }

  onBookPlace() {
   this.modalController.create({
     component: CreateBookingComponent,
     componentProps: {selectedPlace: this.place}})
   .then(modalEl => {
     modalEl.present();
     return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role === 'confirm') {
        console.log('Booked');
      }
    });
  }

}
