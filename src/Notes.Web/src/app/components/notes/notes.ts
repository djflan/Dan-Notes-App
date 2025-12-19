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

  loadNotes(): void {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  addNote(): void {
    const trimmed = this.newContent.trim();
    if (!trimmed) return;

    this.notesService.addNote(trimmed).subscribe(() => {
      this.newContent = '';
      this.loadNotes();
    });
  }
}
