import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {GlobalService} from './services/global.service';
import {ModalModule} from 'ngx-bootstrap';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {NoteComponent} from './components/note/note.component';
import {NotesComponent} from './components/notes/notes.component';
import {AddUpdateNoteComponent} from './components/add-update-note/add-update-note.component';
import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';
import {TitlePipe} from './pipes/title/title.pipe';
import { ConfirmationModalComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NotePopupComponent } from './components/note-popup/note-popup.component';
import {HttpClientModule} from '@angular/common/http';


const appRoutes: Routes = [
  {path: '', component: NotesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    NoteComponent,
    NotesComponent,
    AddUpdateNoteComponent,
    TitlePipe,
    ConfirmationModalComponent,
    NotePopupComponent
  ],
  imports: [
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    A2Edatetimepicker
  ],
  providers: [
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
