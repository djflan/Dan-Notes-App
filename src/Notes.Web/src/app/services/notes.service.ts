import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  id: number;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl = 'https://localhost:7248/api/notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  addNote(content: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, { id:0, content });
  }
}
