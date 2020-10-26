import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {BsModalService} from "ngx-bootstrap";
import { Note } from '../../models/Note';

@Component({
  selector: 'app-note-popup',
  templateUrl: './note-popup.component.html',
  styleUrls: ['./note-popup.component.css']
})
export class NotePopupComponent implements OnInit {

   modalRef: BsModalRef;
   note:Note;
  @ViewChild('popupModal',{static: true}) modal: TemplateRef<any>;

  constructor(private modalService: BsModalService) { 
    
  }

  ngOnInit() {
  }

  showPopup(note:Note){
    this.note = note;
    this.modalRef = this.modalService.show(this.modal);
  }

}
