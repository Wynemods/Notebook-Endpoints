import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="notes-container" *ngIf="authService.isLoggedIn(); else loginPrompt">
    <h2>Your Notes</h2>

    <form (submit)="addNote(); $event.preventDefault();">
      <input type="text" [(ngModel)]="newNote.title" name="title" placeholder="Title" required />
      <textarea [(ngModel)]="newNote.content" name="content" placeholder="Content" required></textarea>
      <button type="submit">Add Note</button>
    </form>

    <div *ngIf="notes.length === 0">No notes found.</div>

    <ul>
      <li *ngFor="let note of notes">
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>
        <small>Created at: {{ note.createdAt | date:'short' }}</small>
        <button (click)="editNote(note)">Edit</button>
        <button (click)="deleteNote(note.id)">Delete</button>
      </li>
    </ul>

    <div *ngIf="editingNote">
      <h3>Edit Note</h3>
      <form (submit)="updateNote(); $event.preventDefault();">
        <input type="text" [(ngModel)]="editingNote!.title" name="editTitle" required />
        <textarea [(ngModel)]="editingNote!.content" name="editContent" required></textarea>
        <button type="submit">Update Note</button>
        <button type="button" (click)="cancelEdit()">Cancel</button>
      </form>
    </div>
  </div>

  <ng-template #loginPrompt>
    <p>Please log in to manage your notes.</p>
  </ng-template>
  `,
  styles: [`
    .notes-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    form {
      margin-bottom: 1rem;
    }
    input, textarea {
      display: block;
      width: 100%;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
    }
    button {
      margin-right: 0.5rem;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      border: 1px solid #ccc;
      padding: 1rem;
      margin-bottom: 1rem;
    }
  `]
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newNote: Partial<Note> = { title: '', content: '' };
  editingNote: Note | null = null;

  constructor(public apiService: ApiService, public authService: AuthService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.apiService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (err) => {
        console.error('Error loading notes', err);
      }
    });
  }

  addNote() {
    if (!this.newNote.title || !this.newNote.content) return;
    this.apiService.createNote({ title: this.newNote.title, content: this.newNote.content }).subscribe({
      next: (note) => {
        this.notes.push(note);
        this.newNote = { title: '', content: '' };
      },
      error: (err) => {
        console.error('Error creating note', err);
      }
    });
  }

  editNote(note: Note) {
    this.editingNote = { ...note };
  }

  updateNote() {
    if (!this.editingNote) return;
    this.apiService.updateNote(this.editingNote.id, { title: this.editingNote.title, content: this.editingNote.content }).subscribe({
      next: (updatedNote) => {
        const index = this.notes.findIndex(n => n.id === updatedNote.id);
        if (index !== -1) {
          this.notes[index] = updatedNote;
        }
        this.editingNote = null;
      },
      error: (err) => {
        console.error('Error updating note', err);
      }
    });
  }

  cancelEdit() {
    this.editingNote = null;
  }

  deleteNote(id: number) {
    this.apiService.deleteNote(id).subscribe({
      next: () => {
        this.notes = this.notes.filter(n => n.id !== id);
      },
      error: (err) => {
        console.error('Error deleting note', err);
      }
    });
  }
}
