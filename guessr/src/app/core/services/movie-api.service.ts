import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {
  private access_token?: string;

  constructor() {
    this.access_token = environment.tmdb_pass;
  }

  async getToken(): Promise<string> {
    try {
      const credentials = 'CredentialKey';
      const response = await fetch('https://api.themoviedb.org/3/authentication', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials,
        },
      });

      const data = await response.json();
      return credentials;
    } catch (error) {
      console.error('Ocorreu um erro de autorização da API: ', error);
      throw new Error('Erro de autenticação com API.');
    }
  }

  async fetchSuggestions(query: string, language = 'pt-br'): Promise<any[]> {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=${language}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.access_token,
        },
      });
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Ocorreu um erro ao retornar sugestões: ', error);
      throw new Error('Falha ao buscar sugestões.');
    }
  }

  async getMovieImage(movie_id: number, language = ''): Promise<any> {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/images?language=${language}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.access_token,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ocorreu um erro ao recuperar valores de imagens: ', error);
      throw new Error('Erro ao recuperar imagens da API.');
    }
  }

  async getMovieDetails(movie_id: number, language = 'pt-br'): Promise<any> {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=${language}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.access_token,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ocorreu um erro ao recuperar informações do filme: ', error);
      throw new Error('Erro ao recuperar informações do filme.');
    }
  }

  async getMovieCredits(movie_id: number, language = 'pt-br'): Promise<any> {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=${language}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.access_token,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ocorreu um erro ao recuperar informações do filme: ', error);
      throw new Error('Erro ao recuperar informações do filme.');
    }
  }
}