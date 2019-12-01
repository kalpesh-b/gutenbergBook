export class BooksAPIModel {
  count: number;
  next: string;
  previous: string;
  results: BooksModel[];
}

export class BooksModel {
  id: number;
  authors: any[];
  bookshelves: any[];
  download_count: number;
  formats: any[];
  languages: any[];
  media_type: string;
  subjects: any[];
  title: string;
  img?: string;
}

export const defaultBooksAPIModel: BooksAPIModel = {
  count: 0,
  next: "",
  previous: "",
  results: []
};
