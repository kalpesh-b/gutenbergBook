import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable, of, fromEvent } from "rxjs";
import { BooksAPIModel } from "src/app/Models/books.model";
import { BooksApiService } from "src/app/services/books-api-service.service";
import { ActivatedRoute } from "@angular/router";
import { distinctUntilChanged, map, tap, debounceTime } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  public bookList$: Observable<BooksAPIModel>;
  public genre: string;
  public currentPage = 1;
  public isRecordFound: boolean;

  constructor(
    private booksService: BooksApiService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.genre = this.activatedRoute.snapshot.queryParams.topic;
    this.bookList$ = this.getBooksByQuery({
      page: this.currentPage,
      topic: this.genre
    });

    this.subscribeSearchIput();
  }

  subscribeSearchIput() {
    const searchBox = document.getElementById("search-input");

    fromEvent(searchBox, "keyup")
      .pipe(
        map((e: KeyboardEvent) => e.target["value"]),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(serchInput => {
        console.log("serchInput : ", serchInput);

        this.bookList$ = this.getBooksByQuery({
          page: 1,
          topic: this.genre,
          search: encodeURIComponent(serchInput)
        });
      });
  }

  getBooksByQuery = query =>
    this.booksService.getBooksByQuery(query).pipe(
      distinctUntilChanged(),
      map(bookApi => {
        return bookApi.results.map(book => {
          return {
            ...book,
            ...{
              img:
                book.formats && book.formats["image/jpeg"]
                  ? book.formats["image/jpeg"]
                  : `/assets/images/${this.genre}.svg`
            }
          };
        });
      }),
      tap(books => (this.isRecordFound = books.length ? true : false))
    );

  allArraysAreEmpty = books => books.results.length;

  openBook(selectedBook) {
    let isFound = false;
    const values: Array<string> = Object.values(selectedBook.formats);
    const allowedFormats = ["html", "htm", "pdf", "txt"];
    let url: string;
    let i = 0;
    while (i < allowedFormats.length && !isFound) {
      url = values.find(
        file_name =>
          file_name.substr(file_name.lastIndexOf(".") + 1) === allowedFormats[i]
      );

      if (url !== undefined) {
        isFound = true;
        window.open(url, "_blank");
      }
      i++;
    }
    if (url === undefined) {
      this.showToaster();
    }
  }

  showToaster() {
    this.toastr.error("No viewable version available.");
  }

  clearSearchInput(searchInput) {
    searchInput.value = null;
    this.bookList$ = this.getBooksByQuery({
      page: 1,
      topic: this.genre
    });
  }
}
