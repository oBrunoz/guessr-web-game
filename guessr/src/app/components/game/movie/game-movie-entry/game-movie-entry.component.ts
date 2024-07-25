import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieAPIService } from '../../../../core/services/movie-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-movie-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-movie-entry.component.html',
  styleUrls: ['./game-movie-entry.component.css']
})

export class GameMovieEntryComponent implements OnInit {
  movieSuggestions: any[] = [];
  selectedMovie: any;
  selectedMovieTitle: string = '';
  showSuggestions: boolean = false;

  @Input() movieToGuessId: number = 0;
  @Output() movieSelected = new EventEmitter<any>();
  @Output() submitMovieEvent = new EventEmitter<boolean>(); // Evento para notificar o componente pai se o filme foi submetido com sucesso

  constructor(private movieAPIService: MovieAPIService) { }

  ngOnInit(): void { }

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

  async submitMovie() {
    console.log(this.selectedMovie)
    console.log(this.selectedMovie.id)
    if (this.selectedMovie) {
      const movieId = this.selectedMovie.id;
      try {
        // Verifica se a ID do filme enviado corresponde à ID do filme a ser descoberto
        if (movieId === this.movieToGuessId) {
          this.submitMovieEvent.emit(true); // Emite um evento para indicar que o filme foi submetido corretamente

          // Chamar a função para buscar informações do filme pelo ID
          this.movieAPIService.getMovieDetails(movieId)
            .then((movieDetails: any) => {
              console.log('Detalhes do filme:');
              console.log(movieDetails.title);
              console.log(movieDetails.release_date);
              console.log(movieDetails.poster_path);

              // Obter o ano do release_date
              const releaseYear = new Date(movieDetails.release_date).getFullYear();

              // Chamar a função para buscar os créditos do filme pelo ID
              this.movieAPIService.getMovieCredits(movieId)
                .then((movieCredits: any) => {
                  const directors = movieCredits.crew.filter((member: { name: string, department: string, job: string }) => member.department === "Directing" && member.job === "Director");
                  console.log("Direção:");
                  const directorNames = directors.map((director: { name: string; }) => director.name);
                  console.log(directorNames);

                  // Detalhes do filme
                  const details = {
                    title: movieDetails.title,
                    releaseYear: releaseYear,
                    director: directorNames.join(', ') // Convertendo a array de nomes em uma string separada por vírgulas
                  };

                  // Emitir os detalhes do filme
                  this.movieSelected.emit(details);
                })
                .catch((error: any) => {
                  console.error('Erro ao buscar detalhes do filme:', error);
                });
            })

        } else {
          this.submitMovieEvent.emit(false); // Emite um evento para indicar que o filme foi submetido incorretamente
          console.log("erro")

        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    }
  }

  async wrongMovie() {
    // Chamar a função para buscar informações do filme pelo ID
    this.movieAPIService.getMovieDetails(this.movieToGuessId)
      .then((movieDetails: any) => {
        console.log('Detalhes do filme:');
        console.log(movieDetails.title);
        console.log(movieDetails.release_date);
        console.log(movieDetails.poster_path);

        // Obter o ano do release_date
        const releaseYear = new Date(movieDetails.release_date).getFullYear();

        // Chamar a função para buscar os créditos do filme pelo ID
        this.movieAPIService.getMovieCredits(this.movieToGuessId)
          .then((movieCredits: any) => {
            const directors = movieCredits.crew.filter((member: { name: string, department: string, job: string }) => member.department === "Directing" && member.job === "Director");
            console.log("Direção:");
            const directorNames = directors.map((director: { name: string; }) => director.name);
            console.log(directorNames);

            // Detalhes do filme
            const details = {
              title: movieDetails.title,
              releaseYear: releaseYear,
              director: directorNames.join(', ') // Convertendo a array de nomes em uma string separada por vírgulas
            };

            // Emitir os detalhes do filme
            this.movieSelected.emit(details);
          })
          .catch((error: any) => {
            console.error('Erro ao buscar detalhes do filme:', error);
          });
      })
  }

}