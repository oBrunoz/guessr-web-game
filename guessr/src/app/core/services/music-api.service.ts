import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicAPIService {

  private baseUrl: string = '/deezer-api'; // Usando a rota do proxy

  constructor(private http: HttpClient) { }

  fetchAlbumSuggestions(query: string): Observable<any[]> {
    const url = `${this.baseUrl}/search/album?q=${query}`;
    return this.http.get<any>(url).pipe(
      map(response => response.data ? response.data.map((album: any) => ({
        id: album.id,
        title: album.title,
        artist: album.artist.name,
        cover: album.cover_small
      })) : [])
    );
  }

  getAlbumInfo(albumId: number): Observable<any> {
    const url = `${this.baseUrl}/album/${albumId}`;
    return this.http.get<any>(url);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    throw new Error('Falha ao buscar dados da API do Deezer.');
  }
}