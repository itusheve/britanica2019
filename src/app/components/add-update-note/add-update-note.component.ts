import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {BsModalService} from "ngx-bootstrap";
import {ViewChild} from '@angular/core';

import {GlobalService} from "../../services/global.service";
import {Note} from "../../models/Note";
import * as moment from 'moment';

@Component({
    selector: 'app-add-update-note',
    templateUrl: './add-update-note.component.html',
    styleUrls: ['./add-update-note.component.css']
})
export class AddUpdateNoteComponent implements OnInit {
    NoteModel: any = new Note(null, null, null, null);
    mode: string = 'new';
    modalRef: BsModalRef;
    btnText: string = 'Save';
    isFormSubmited = false;
    @ViewChild('modal',{static: true}) modal: TemplateRef<any>;
    options = {
        format: "DD.MM.YYYY",
        maxDate: moment()
    };

    constructor(private modalService: BsModalService, private service: GlobalService) {
    }

    ngOnInit() {
    }

    reset() {
        this.NoteModel = new Note(null, null, null, null);
        this.mode = 'new';
        this.btnText = 'Save';
    }

    openModal(Note: Note) {
        this.reset();

        if (Note) {
            this.mode = 'edit';
            this.btnText = 'Update';
            this.NoteModel.author = Note.author;
            this.NoteModel.content = Note.content;
            this.NoteModel.date = Note.date;
            this.NoteModel.id = Note.id;

        } else {
            this.NoteModel.date = new Date();
        }
        this.modalRef = this.modalService.show(this.modal);
    }

    saveOrUpdate(isValid: boolean) {
       
        this.isFormSubmited = true;
        if (!isValid) return;
        if (this.mode == 'edit') {
            this.service.updateNote(this.NoteModel);

        } else {
            this.service.addNote(this.NoteModel);
        }


        this.modalRef.hide();
    }


}
