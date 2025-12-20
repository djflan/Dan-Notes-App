import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService, Note } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newContent: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  onTextChanged(value: string): void {
  console.log('ngModelChange:', value);
}

  trackById(_: number, note: { id: number }) {
    return note.id;
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  addNote(): void {
    const trimmed = this.newContent.trim();
    if (!trimmed) return;

    this.notesService.addNote(trimmed).subscribe((created: Note) => {
      this.newContent = '';
      this.notes = [...this.notes, created];
    });
  }
}
