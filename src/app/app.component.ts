import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GoogleMapsModule } from '@angular/google-maps';
import { latLngAdd, travelDeatils } from './model';
import { GoogleService } from './google.service';
import { TableComponent } from './table/table.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { customValidator } from './custom-validator.directive';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PracticeMap';

  // myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]> | undefined;

  constructor(private gService: GoogleService) { }

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  option: any

  //geocoder = new google.maps.Geocoder();
  geocoder = new google.maps.Geocoder();

  source: latLngAdd = {} as latLngAdd

  destination: latLngAdd = {} as latLngAdd

  travelDeatils: travelDeatils = {} as travelDeatils

  @ViewChild('place', { static: true })
  sourcePlace: ElementRef = {} as ElementRef;

  place:string = '';

  @ViewChild('destinationPlace', { static: true })
  destinationPlace: ElementRef = {} as ElementRef;

  @ViewChild("sourcePlacesRef") placesRef: GooglePlaceDirective | undefined;

  checkSource = new FormControl('', [Validators.required]);
  checkValidate: string = 'yes'
  //matcher = new MyErrorStateMatcher();

  async onChangeEvent(event:any){
    console.log("OnChange: "+event.target.value)
    let val: boolean = false
    let geocoder = new google.maps.Geocoder();
    let value = await geocoder.geocode({ address: event.target.value }, (results: any, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.source.lat = results[0].geometry.location.lat();
        this.source.lng = results[0].geometry.location.lng();
        this.source.address = event.target.value//address.formatted_address;
        console.log("Latitude:", this.source.lat);
        console.log("Longitude:", this.source.lng);
        val = false;
      } else {
        this.source = {} as latLngAdd;
        console.log("Geocode was not successful for the following reason: " + status);
        val=true
        console.log(val)
      }
    }).catch(err => {
      console.log(err.code)
    });

    
      this.checkValidate = val ? 'no' : 'yes'
      console.log(this.source)
      console.log(this.checkValidate)

  }

  public handleAddressChange(address: Address) {

    console.log(address.formatted_address);
    console.log(this.sourcePlace.nativeElement.value)


    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.sourcePlace.nativeElement.value }, (results: any, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.source.lat = results[0].geometry.location.lat();
        this.source.lng = results[0].geometry.location.lng();
        this.source.address = this.sourcePlace.nativeElement.value//address.formatted_address;
        console.log("Latitude:", this.source.lat);
        console.log("Longitude:", this.source.lng);
      } else {
        this.source = {} as latLngAdd;
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  @ViewChild("destinationPlacesRef") destinationPlacesRef: GooglePlaceDirective | undefined;

  public handleAddressChange_2(address: Address) {

    console.log(address.formatted_address);


    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.destinationPlace.nativeElement.value }, (results: any, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.destination.lat = results[0].geometry.location.lat();
        this.destination.lng = results[0].geometry.location.lng();
        this.destination.address = this.destinationPlace.nativeElement.value//address.formatted_address;
        console.log("Latitude:", this.destination.lat);
        console.log("Longitude:", this.destination.lng);
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  findDistance() {

    var sourceA = new google.maps.LatLng(this.source.lat, this.source.lat);
    var sourceB = this.source.address;
    var destinationA = new google.maps.LatLng(this.destination.lat, this.destination.lng);
    var destinationB = this.destination.address;

    var service = new google.maps.DistanceMatrixService();

    var ss = new google.maps.DirectionsService();

    var mode = google.maps.TravelMode.DRIVING

    this.travelDeatils = {} as travelDeatils

    service.getDistanceMatrix({
      origins: [sourceA, sourceB],
      destinations: [destinationA, destinationB],
      travelMode: mode,
      unitSystem: 0,
      avoidHighways: false,
      avoidTolls: false
    }
      , (results: any, status) => {
        console.log(results)
        if (status == google.maps.DistanceMatrixStatus.OK) {
          let distance = results.rows[1].elements[0].distance.text
          let duration = results.rows[1].elements[0].duration.text
          let orginAddress = results.originAddresses[1]
          let destinationAddress = results.destinationAddresses[1]

          this.travelDeatils.source = sourceB
          this.travelDeatils.destination = destinationB
          this.travelDeatils.distance = distance
          this.travelDeatils.duration = duration
          this.travelDeatils.orginActualAddress = orginAddress
          this.travelDeatils.destinationActualAddress = destinationAddress

          this.gService.setTraveDetails(this.travelDeatils)

          console.log(distance + ' ' + duration + ' ' + orginAddress + ' ' + destinationAddress)
        } else {
          console.log("Distance was not successful for the following reason: " + status);
        }
        return true;
      })
  }

}



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // console.log(control?.dirty);
    // console.log(control?.touched);
    // console.log(isSubmitted);
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

