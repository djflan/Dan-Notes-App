import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService, Note } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
})
export class NotesComponent {
  notes = signal<Note[]>([]);
  newContent = signal('');

  constructor(private readonly notesService: NotesService) {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe((items) => {
      this.notes.set(items);
    });
  }

  addNote(): void {
    const trimmed = this.newContent().trim();
    if (!trimmed) return;

    // instant feedback
    this.newContent.set('');

    this.notesService.addNote(trimmed).subscribe((created) => {
      // IMPORTANT: replace list immutably
      this.notes.update((curr) => [...curr, created]);
    });
  }

  trackById(_: number, note: Note) {
    return note.id;
  }
}
