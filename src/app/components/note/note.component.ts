import {Component, OnInit, ViewChild} from '@angular/core';
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import { Note } from '../../models/Note';
import { NotePopupComponent } from '../note-popup/note-popup.component';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
    selector: 'note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
    @ViewChild('notePopupModal',{static: true}) notePopupModal: NotePopupComponent;
    @ViewChild('swalPopup',{static: true}) swalPopup: SwalComponent;
    @Input() Note : Note;
    @Input() onPopup:boolean;
    @Output() edit: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    editNote() {
        this.edit.emit(this.Note);
    }

    deleteNote() {
        this.delete.emit(this.Note);
    }

    ngOnInit() {
    }

    showContent(){
        console.log(this.Note);
       this.notePopupModal.showPopup(this.Note);
    }

}
