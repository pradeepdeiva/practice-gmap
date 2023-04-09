import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customValidator(result: any): ValidatorFn {

  let lat = 0;
  let lng = 0;
  // console.log(lat + " " + lng)
  console.log(result)
  return (control: AbstractControl): ValidationErrors | null => {

    lat = 0;
    lng = 0

    if (result == undefined) {

      return {value: true}

    } else {

      // console.log(lat + " " + lng)

      console.log(result)

      let geocoder = new google.maps.Geocoder();
      const val = geocoder.geocode({ address: result }, (results: any, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results)
          lat = results[0].geometry.location.lat();
          lng = results[0].geometry.location.lng();
          // this.destination.address = this.destinationPlace.nativeElement.value//address.formatted_address;
          // console.log("Latitude:", lat);
          // console.log("Longitude:", lng);
          return true;
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
          return false;
        }
      });

      // console.log(lat + " " + lng)

      // val.then((vale) => {
      //   console.log("Success")
      //   lat = vale.results[0].geometry.location.lat()
      //   lng = vale.results[0].geometry.location.lng()
      //   console.log(lat + " " + lng)
      //   console.log((lat != 0 && lng != 0) ? true : false)

      // }).catch(err => {
      //   console.log("Failed");
      //   return { value: true }
      // });

      return (lat != 0 && lng != 0) ? null : { value: true }
    }

  }

}