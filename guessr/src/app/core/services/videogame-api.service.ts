import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VideogameAPIService {
  private clientId = environment.igdb_id;
  private clientSecret = environment.igdb_secret;
  private authUrl = 'https://id.twitch.tv/oauth2/token';
  private apiUrl = '/api';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) { }

  private getAccessToken(): Observable<string> {
    if (this.accessToken) {
      return new Observable<string>(observer => {
        observer.next(this.accessToken!);
        observer.complete();
      });
    }

    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('grant_type', 'client_credentials');

    return this.http.post<any>(`${this.authUrl}`, null, { params }).pipe(
      switchMap(response => {
        this.accessToken = response.access_token;
        return new Observable<string>(observer => {
          observer.next(this.accessToken!);
          observer.complete();
        });
      })
    );
  }

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Client-ID': this.clientId,
      'Authorization': `Bearer ${token}`,
    });
  }

  getGames(gameName: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = this.getHeaders(token);
        //const body = `fields *; search "${gameName}"; limit 10;`;
        const body = `fields name, first_release_date; search "${gameName}"; limit 20;`;

        return this.http.post<any[]>(`${this.apiUrl}/games`, body, { headers });
      })
    );
  }

  getGameID(gameName: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((token: string) => {
        const headers = this.getHeaders(token);
        const body = `fields *; search "${gameName}";`;
        return this.http.post<any>(`${this.apiUrl}/games`, body, { headers });
      })
    );
  }

  // Método para buscar informações do jogo
  getGameDetails(gameId: number): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = this.getHeaders(token);
        const body = `fields *; where id = ${gameId};`;
        return this.http.post<any>(`${this.apiUrl}/games`, body, { headers });
      })
    );
  }

  // Método para buscar capa do jogo
  getGameCover(gameId: number): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = this.getHeaders(token);
        const body = `fields *; where game = ${gameId};`;
        return this.http.post<any[]>(`${this.apiUrl}/covers`, body, { headers });
      })
    );
  }

}