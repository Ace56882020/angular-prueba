import { Component } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BookService } from './services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { bookModel } from "./core/book.model";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  displayedColumns: string[] = ['action','name', 'description', 'author', 'date','numbercopies','cost'];
  dataSource = new MatTableDataSource();
  public title!:string
  public bookModel!:bookModel
  public active:boolean
  @ViewChild('table') table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private bookSrv:BookService,
    public dialog: MatDialog
    ) {
      this.active=true
      this.bookModel={
        authorbook:"",
        cost: 0,
        descriptionbook: "",
        id: "",
        nameBook: "",
        numberCopies: 0,
        publicationDate: ""
      }
    }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllBooks()
  }

  //busca todos los libros registrados
  getAllBooks(){
    this.bookSrv.getAllBooks().subscribe((resp)=>{
      
      this.dataSource = new MatTableDataSource(resp);
    })
  }

  //busca el libro seleccionado
  editBook(id:any){
    this.active=false
    this.title='Editar libro'
    const data={
      id:id
    }
    this.bookSrv.getBookId(data).subscribe((resp)=>{
      
      this.bookModel.authorbook=resp.authorbook
      this.bookModel.cost=resp.cost
      this.bookModel.descriptionbook=resp.descriptionbook
      this.bookModel.id=resp.id
      this.bookModel.nameBook=resp.nameBook
      this.bookModel.numberCopies=resp.numberCopies
      this.bookModel.publicationDate=resp.publicationDate
    })
  }

  announceSortChange(sortState: Sort) {
  
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

//nuevo libro
  new(){
    this.active=false
    this.title='Ingreso de un nuevo libro'
  }

  //envia la peticion a la base
  submit(f:any) {
    console.log(f.value)
    if(this.bookModel.id===''){
      this.bookSrv.createBook(f.value).subscribe((resp)=>{
        
          this.getAllBooks()
          this.active=true
      })
    }else{
      f.value.id=this.bookModel.id
      this.bookSrv.updateBook(f.value).subscribe((resp)=>{
        
          this.getAllBooks()
          this.active=true
      })
    }

   
    // this.dataSource = new MatTableDataSource(this.paramters);
   }
 
   close() {
    this.active=true
   }

   deleteBook(book:any){
    const data={
      id:book
    }
    this.bookSrv.deleteBookId(data).subscribe((resp)=>{
      
      this.getAllBooks()
      alert("eliminado")
    })
      
   }
}
