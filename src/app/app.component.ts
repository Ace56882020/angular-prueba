import { Component } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BookService } from './services/book.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  displayedColumns: string[] = ['action','name', 'description', 'author', 'date','numbercopies','cost'];
  dataSource = new MatTableDataSource([
    {
      "id": 3,
      "name": "constumbres",
      "description": "temas varios",
      "author": "ace",
      "date": "02/07/2019",
      "numbercopies": 12,
      "cost": 1220
    },
    {
      "id": 2,
      "name": "laberito",
      "description": "cuentos",
      "author": "string",
      "date": "02/07/2022",
      "numbercopies": 120,
      "cost": 120
    },
    {
      "id": 3,
      "name": "constumbres",
      "description": "temas varios",
      "author": "ace",
      "date": "02/07/2019",
      "numbercopies": 12,
      "cost": 1220
    },
    {
      "id": 2,
      "name": "laberito",
      "description": "cuentos",
      "author": "string",
      "date": "02/07/2022",
      "numbercopies": 120,
      "cost": 120
    },
    {
      "id": 3,
      "name": "constumbres",
      "description": "temas varios",
      "author": "ace",
      "date": "02/07/2019",
      "numbercopies": 12,
      "cost": 1220
    },
    {
      "id": 2,
      "name": "laberito",
      "description": "cuentos",
      "author": "string",
      "date": "02/07/2022",
      "numbercopies": 120,
      "cost": 120
    },
  ]);
  public active:boolean
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private bookSrv:BookService,
    public dialog: MatDialog
    ) {
      this.active=true
    }
  @ViewChild('table') table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllBooks()
    this.getBookId()
  }
  getAllBooks(){
    this.bookSrv.getAllBooks().subscribe((resp)=>{
      console.log(resp)
    })
  }

  getBookId(){
    const data={
      id:3
    }
    this.bookSrv.getBookId(data).subscribe((resp)=>{
      console.log(resp)
    })
  }

  announceSortChange(sortState: Sort) {
  
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  actionOpen(){

  }

  new(){
    this.active=false
  }
  doAction(f:any) {
    console.log(f.value)
    this.active=true
    this.dataSource = new MatTableDataSource(f.value);
   }
 
   closeDialog() {
    this.active=true
   }
}
