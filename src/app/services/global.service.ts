import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable,from,of} from 'rxjs';

import 'rxjs/Rx';
import {Subject} from 'rxjs';
import {Note} from '../models/Note';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class GlobalService {

    private NoteSubject = new Subject<any>();

    private Notes: Note[] = [
        {
            "id": 1,
            "author": "Dante Alighieri",
            "content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "date": new Date()
        },
        {
            "id": 2,
            "author": "Chinua Achebe",
            "content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "date": new Date()
        },
        {
            "id": 3,
            "author": "Hans Christian Andersen",
            "content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "date": new Date()
        },
        {
            "id": 4,
            "author": "Hans Christian Andersen",
            "content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "date": new Date()
        }
    ];

    constructor(private http: HttpClient) {

    }

    getNotes(): Observable<Note[]> {

        return of(this.Notes);
    }

    addNote(Note: Note) {

        let founded = this.Notes.find((b: Note) => {
            return b.id === Note.id;
        });
        if (founded) {
            this.NoteSubject.next({Notes: this.Notes,error:'Note with the same title already exist'});
            return;
        }
        Note.id = this.Notes[this.Notes.length - 1].id++;
        this.Notes.push(Note);


        this.NoteSubject.next({Notes: this.Notes});
    }

    updateNote(Note: Note) {


        const foundedNote = this.Notes.find((b) => {
            return b.id === Note.id;
        });

        foundedNote.author = Note.author;
        foundedNote.content = Note.content;
        foundedNote.date = Note.date;

        this.NoteSubject.next({Notes: this.Notes});
    }

    deleteNote(Note: Note) {

        let index = this.Notes.findIndex(x => x.id == Note.id);

        if (index > -1) {
            this.Notes.splice(index, 1);


            this.NoteSubject.next({Notes: this.Notes});
        }
    }

    NotesListOnUpdate(): Observable<Note[]> {
        return this.NoteSubject.asObservable();
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
