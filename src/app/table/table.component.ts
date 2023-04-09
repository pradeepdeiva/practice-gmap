import { Component, ViewChild, AfterViewInit, OnInit, IterableDiffers } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { PeriodicElement, travelDeatils } from '../model';
import { GoogleService } from '../google.service';
import { ComponentService } from '../component.service';
import { tap } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit,OnInit {

  //dataSource:ComponentService = {} as ComponentService;

  dataSource = new MatTableDataSource<travelDeatils>();

  iterates: IterableDiffers = {} as IterableDiffers

  constructor(private gService: GoogleService){
  }

  id:any;


  ngOnInit(): void {
    // this.dataSource = new ComponentService(this.gService)
    // this.dataSource.loadLessons();
    this.gService.getTravelDetails().subscribe( (value:travelDeatils[]) => {
      this.dataSource.data = value;
    })

    this.id = setInterval(() => {
      this.loadPage();
    }, 1000);

  //  this.dataSource = new MatTableDataSource<travelDeatils>(this.gService.travelDetails);
  //  console.log(this.dataSource)

   
   
  }

  


  displayedColumns: string[] = ['source', 'destination', 'distance', 'duration','orginActualAddress','destinationActualAddress'];
  //dataSource = new MatTableDataSource<travelDeatils>(this.gService.travelDetails);

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  //   this.paginator.page
  //   .pipe(
  //     tap(() => this.loadPage())
  //   )
  //   .subscribe();
  }

  get data(){
    console.log(this.dataSource)
    return this.dataSource;
  }


  public loadPage()
  {
    //this.dataSource.loadLessons();
    this.dataSource.paginator = this.paginator;
  }

  onRowClick(row:any){
    console.log(row)
  }

}



