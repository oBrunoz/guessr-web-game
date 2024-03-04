import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../../../../core/services/movie-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-movie-entry',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './game-movie-entry.component.html',
  styleUrls: ['./game-movie-entry.component.css']
})

export class GameMovieEntryComponent implements OnInit {
  movieSuggestions: any[] = [];
  selectedMovie: any;
  selectedMovieTitle: string = '';
  showSuggestions: boolean = false;

  constructor( private movieAPIService: MovieAPIService) {}

  ngOnInit(): void {
  }

  async searchMovies(event: any) {
    const query = event.target.value;
    if (query) {
      try {
        this.movieSuggestions = await this.movieAPIService.fetchSuggestions(query);
        this.showSuggestions = true; 
      } catch (error) {
        console.error('Erro ao buscar sugestões de filmes:', error);
      }
    } else {
      this.movieSuggestions = []; // Limpa a lista de sugestões se a consulta estiver vazia
      this.showSuggestions = false;
    }
  }

  selectMovie(movie: any) {
    this.selectedMovie = movie;
    this.selectedMovieTitle = movie.title; // Atualiza o título do filme selecionado
    this.movieSuggestions = []; // Limpar a lista de sugestões após selecionar o filme
  }

  submitMovie(event: any) {
    if (this.selectedMovie) {
      const movieId = this.selectedMovie.id; // Obtém a ID do filme selecionado
      console.log('ID do filme selecionado:', movieId);
      
      // Chamar a função para buscar informações do filme pelo ID
    this.movieAPIService.getMovieDetails(movieId)
    .then((movieDetails: any) => {
      console.log('Detalhes do filme:');
      console.log(movieDetails.title);
      console.log(movieDetails.release_date);
      console.log(movieDetails.poster_path);
    })

    this.movieAPIService.getMovieCredits(movieId)
    .then((movieCredits: any) => {
      //const director = movieCredits.crew.find((member: { name: string, department: string }) => member.department === "Directing");
      //console.log("Nome do diretor:", director.name);
      const directors = movieCredits.crew.filter((member: { name: string, department: string, job: string }) => member.department === "Directing" && member.job === "Director");
      console.log("Direção:");
      directors.forEach((director: { name: any; }) => {
        console.log(director.name);
      });
    })
    .catch((error: any) => {
      console.error('Erro ao buscar detalhes do filme:', error);
    });
    }
  }


}