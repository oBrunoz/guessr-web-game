import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {
  private access_token?: string;

  /*
  constructor() {
    this.access_token = process.env['TMDB_API_KEY'];
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
  */

  constructor(private http: HttpClient) {
    this.loadAccessToken();
  }

  // Método para carregar o token de acesso da API Serverless
  private async loadAccessToken(): Promise<void> {
    try {
      const response = await this.http.get<{ access_token: string }>('/api/getToken').toPromise();
      this.access_token = response?.access_token;
    } catch (error) {
      console.error('Erro ao carregar o token de acesso: ', error);
      throw new Error('Falha ao carregar o token de acesso.');
    }
  }

  // Método para garantir que o token está carregado
  private async ensureTokenLoaded(): Promise<void> {
    if (!this.access_token) {
      await this.loadAccessToken(); // Aguarda o carregamento do token se não estiver disponível
    }
  }

  // Exemplo: Função que faz requisições, garantindo que o token está carregado
  async fetchSuggestions(query: string, language = 'pt-br'): Promise<any[]> {
    await this.ensureTokenLoaded(); // Certifica-se que o token foi carregado

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=${language}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.access_token,
          },
        }
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Ocorreu um erro ao retornar sugestões: ', error);
      throw new Error('Falha ao buscar sugestões.');
    }
  }

  // Método para buscar imagens de um filme
  async getMovieImage(movie_id: number, language = ''): Promise<any> {
    await this.ensureTokenLoaded();

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/images?language=${language}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.access_token,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ocorreu um erro ao recuperar imagens: ', error);
      throw new Error('Erro ao recuperar imagens da API.');
    }
  }

    // Método para buscar a ficha técnica de um filme
    async getMovieDetails(movie_id: number, language = 'pt-br'): Promise<any> {
      await this.ensureTokenLoaded(); // Certifica-se que o token foi carregado
  
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}?language=${language}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + this.access_token,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Ocorreu um erro ao recuperar informações do filme: ', error);
        throw new Error('Erro ao recuperar informações do filme.');
      }
    }

  // Método para buscar créditos de um filme
  async getMovieCredits(movie_id: number, language = 'pt-br'): Promise<any> {
    await this.ensureTokenLoaded();

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=${language}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.access_token,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ocorreu um erro ao recuperar créditos do filme: ', error);
      throw new Error('Erro ao recuperar créditos do filme.');
    }
  }

}