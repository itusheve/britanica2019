export class Note {
  id: number;
  author: string;
  content:string;
  date: Date;

  static counter = 0;

  constructor(_id: number, _author: string, _date: Date, _content: string) {
    this.id = _id;
    this.author = _author;
    this.content = _content;
    this.date = _date;
  }
}
