import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private notesService: NotesService,
    private cdr: ChangeDetectorRef
  ) {}

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

    this.notesService.addNote(trimmed).subscribe({
      next: (created) => {
        console.log('ADD returned', created);
        console.log('BEFORE notes length', this.notes.length);

        // update notes here...
        this.notes = [...this.notes, created];
        this.cdr.detectChanges();

        console.log('AFTER notes length', this.notes.length);
      },
    });
  }
}
