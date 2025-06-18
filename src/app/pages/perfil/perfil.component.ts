import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  user: any = {};
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Obtener usuario desde localStorage
    this.user = {
      id: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      imageUrl: localStorage.getItem('imageUrl') || null
    };
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  subirFoto(): void {
    if (!this.selectedFile || !this.user.id) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post<any>(`${environment.apiUrl}/upload/profile/${this.user.id}`, formData)
      .subscribe({
        next: (res) => {
          this.user.imageUrl = res.imageUrl;
          localStorage.setItem('imageUrl', res.imageUrl);
        },
        error: (err) => {
          console.error('Error al subir imagen:', err);
          alert('No se pudo subir la imagen.');
        }
      });
  }
}
