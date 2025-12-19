import { Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NotesComponent }
];