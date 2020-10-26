import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Note} from "../../models/Note";
import {NotificationsComponent} from "../notifications/notifications.component";
import {ConfirmationModalComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {AfterViewInit} from "@angular/core";
import { AddUpdateNoteComponent } from '../add-update-note/add-update-note.component';
import { SwalComponent } from '@toverux/ngx-sweetalert2';


@Component({
    selector: 'notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, AfterViewInit {
    @ViewChild('addUpdateModal',{static: true}) addUpdateModal: AddUpdateNoteComponent;
    @ViewChild('notification',{static: true}) notification: NotificationsComponent;
    @ViewChild('successSwal',{static: true}) private successSwal: SwalComponent;
    @ViewChild('confirmModal',{static: true}) confirm: ConfirmationModalComponent;
    Notes: Note[];
    selectedNote: Note;
    NoteToDelete: Note;

    alertType: string;
    alertMessage: string;
    alertClass: string;

    constructor(private service: GlobalService) {
        this.service.NotesListOnUpdate().subscribe((data: any) => {
            this.setNotification(data.error);
            this.notification.show();
            this.Notes = data.Notes;
            this.NoteToDelete = null;
        });

    }

    setNotification(error: any) {
        this.alertClass = error ? 'alert-danger' : 'alert-success';
        this.alertType = error ? 'Error' : 'Success';
        this.alertMessage = error || 'Notes list was updated successfully';

    }

    ngOnInit() {
        this.service.getNotes().subscribe((Notes: Note[]) => {
            this.Notes = Notes;
        });

    }

    ngAfterViewInit() {
        this.confirm.onClose.subscribe(result => {
            if (result === true) {
                this.service.deleteNote(this.NoteToDelete);
            }
        });
    }

    onEdit(Note: Note) {
        this.selectedNote = Note;
        this.addUpdateModal.openModal(this.selectedNote);
    }

    onDelete(Note: Note) {
        this.NoteToDelete = Note;
        this.confirm.showConfirmationModal('Are you sure?', '');

    }


}
