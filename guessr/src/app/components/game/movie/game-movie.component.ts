import { Component, OnInit } from '@angular/core';
import { GameMovieImgComponent } from "./game-movie-img/game-movie-img.component";
import { GameMovieLivesComponent } from './game-movie-lives/game-movie-lives.component';
import { GameMovieEntryComponent } from './game-movie-entry/game-movie-entry.component';
import { GameMovieInfoComponent } from './game-movie-info/game-movie-info.component';
import { GameMovieButtonsComponent } from './game-movie-buttons/game-movie-buttons.component';
import { CommonModule } from '@angular/common';
import { MovieAPIService } from '../../../core/services/movie-api.service';
import { LevelSelectorService } from '../../../core/services/level-selector.service';

@Component({
    selector: 'app-game-movie',
    standalone: true,
    templateUrl: './game-movie.component.html',
    styleUrl: './game-movie.component.css',
    imports: [ GameMovieImgComponent, GameMovieLivesComponent, GameMovieEntryComponent, GameMovieInfoComponent, GameMovieButtonsComponent, CommonModule ]
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

    constructor(private movieAPIService: MovieAPIService, private levelSelectorService: LevelSelectorService ) {}

    ngOnInit() {
        this.movieToGuessId = this.levelSelectorService.getSelectedMovieId();
        this.fetchMovieImage();
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
          console.log(movieImageResponse);
        
          const moviePoster = movieImageResponse.posters[0].file_path;
          console.log(moviePoster);

          this.movieImageUrl = `https://www.themoviedb.org/t/p/original${moviePoster}`;
          
        } catch (error) {
          console.error('Erro ao obter a imagem do filme:', error);
        }
    }


}
