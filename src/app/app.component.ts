import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from './services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { bookModel } from './core/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'action',
    'nameBook',
    'descriptionbook',
    'authorbook',
    'publicationDate',
    'numbercopies',
    'cost',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public title!: string;
  public bookModel!: bookModel;
  public active: boolean;
  public minDate!: any;
  public dateNow: any;
  constructor(private bookSrv: BookService, public dialog: MatDialog) {
    this.active = true;
    this.bookModel = {
      authorbook: '',
      cost: 0,
      descriptionbook: '',
      id: '',
      nameBook: '',
      numberCopies: 0,
      publicationDate: '',
    };
    const getDate = new Date();
    const year = getDate.getFullYear() - 10;
    const dateN = getDate.getDate();
    const mounth = getDate.getMonth();
    this.minDate = new Date(year, mounth, dateN);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refesh() {
    this.bookModel = {
      authorbook: '',
      cost: 0.0000,
      descriptionbook: '',
      id: '',
      nameBook: '',
      numberCopies: 0,
      publicationDate: '',
    };
  }
  ngAfterViewInit() {
    this.getAllBooks();
  }
  //busca todos los libros registrados
  getAllBooks() {
    this.bookSrv.getAllBooks().subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //busca el libro seleccionado
  editBook(id: any) {
    this.refesh()
    this.active = false;
    this.title = 'Editar libro';
    const data = {
      id: id,
    };
    this.bookSrv.getBookId(data).subscribe((resp) => {
      this.bookModel.authorbook = resp.authorbook;
      this.bookModel.cost = resp.cost;
      this.bookModel.descriptionbook = resp.descriptionbook;
      this.bookModel.id = resp.id;
      this.bookModel.nameBook = resp.nameBook;
      this.bookModel.numberCopies = resp.numberCopies;
      this.bookModel.publicationDate = resp.publicationDate;
    });
  }

  //nuevo libro
  new() {
    this.active = false;
    this.title = 'Ingreso de un nuevo libro';
    this.refesh();
  }

  //envia la peticion a la base
  submit(f: any) {
    console.log(f.value);
    if (this.bookModel.id === '') {
      this.bookSrv.createBook(f.value).subscribe((resp) => {
        this.getAllBooks();
        this.active = true;
        this.refesh();
      });
    } else {
      f.value.id = this.bookModel.id;
      this.bookSrv.updateBook(f.value).subscribe((resp) => {
        this.refesh();
        this.getAllBooks();
        this.active = true;
      });
    }
  }

  close() {
    this.active = true;
    this.getAllBooks()
  }

  deleteBook(book: any) {
    const data = {
      id: book,
    };
    this.bookSrv.deleteBookId(data).subscribe((resp) => {
      this.getAllBooks();
      alert('eliminado');
    });
  }
  date(event: any) {
    console.log(event);
  }
}
