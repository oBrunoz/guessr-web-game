import { Component, OnInit } from '@angular/core';
import { GameMovieImgComponent } from "./game-movie-img/game-movie-img.component";
import { GameMovieLivesComponent } from './game-movie-lives/game-movie-lives.component';
import { GameMovieEntryComponent } from './game-movie-entry/game-movie-entry.component';
import { GameMovieInfoComponent } from './game-movie-info/game-movie-info.component';
import { GameMovieButtonsComponent } from './game-movie-buttons/game-movie-buttons.component';
import { CommonModule } from '@angular/common';
import { MovieAPIService } from '../../../core/services/movie-api.service';
import { LevelSelectorService } from '../../../core/services/level-selector.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-game-movie',
    standalone: true,
    templateUrl: './game-movie.component.html',
    styleUrl: './game-movie.component.css',
    imports: [ GameMovieImgComponent, GameMovieLivesComponent, GameMovieEntryComponent, GameMovieInfoComponent, GameMovieButtonsComponent, CommonModule ],
})

export class GameMovieComponent implements OnInit {
    movieSelected: boolean = false;
    selectedMovieTitle: string = '';
    selectedMovieReleaseYear: number | undefined;
    selectedMovieDirector: string = '';

    movieToGuessId!: number; // Define a ID do filme a ser descoberto
    movieImageUrl!: string;
    
    livesRemaining: number = 4; // Número inicial de vidas
    guessedCorrectly: boolean = false; // Indica se o filme foi adivinhado corretamente

    constructor(private movieAPIService: MovieAPIService, private levelSelectorService: LevelSelectorService, private route: ActivatedRoute, private http: HttpClient) {}

    ngOnInit(): void {
        // Recuperar o número da fase da URL
        this.route.params.subscribe(params => {
            const faseNumero = +params['levelNumber']; // + converte para número
            console.log(faseNumero);
            // Fazer uma requisição HTTP para carregar o arquivo JSON
            this.http.get<any>('assets/movie-ids.json').subscribe(data => {
              // Processar os dados do JSON
              const faseIdMapping = data;
              // Obter o ID do filme correspondente ao número da fase
              this.movieToGuessId = faseIdMapping[faseNumero];
              // Usar o ID do filme para recuperar a imagem
              this.fetchMovieImage();
          });
        });
      }

    async submitMovieHandler(submittedCorrectly: boolean) {
        if (!submittedCorrectly) {
            this.livesRemaining--; // Reduz o número de vidas se o filme foi submetido incorretamente
          }
      }

    onMovieSelected(details: any) {
        this.selectedMovieTitle = details.title;
        this.selectedMovieReleaseYear = details.releaseYear;
        this.selectedMovieDirector = details.director;
        this.movieSelected = true;
    }

    async fetchMovieImage() {
        try {
          const movieImageResponse = await this.movieAPIService.getMovieImage(this.movieToGuessId);
          console.log(movieImageResponse)
          const moviePoster = movieImageResponse.posters[0].file_path;
          console.log(moviePoster)
          this.movieImageUrl = `https://www.themoviedb.org/t/p/original${moviePoster}`;
        } catch (error) {
          console.error('Erro ao obter a imagem do filme:', error);
        }
      }

}
