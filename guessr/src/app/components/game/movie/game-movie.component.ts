import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { LevelSelectorService } from '../../../core/services/level-selector.service';
import { MovieAPIService } from '../../../core/services/movie-api.service';
import { GameImgComponent } from "../../common/game-img/game-img.component";
import { GameLivesComponent } from '../../common/game-lives/game-lives.component';
import { GameMovieEntryComponent } from './game-movie-entry/game-movie-entry.component';
import { GameInfoComponent } from '../../common/game-info/game-info.component';
import { GameButtonsComponent } from '../../common/game-buttons/game-buttons.component';

@Component({
  selector: 'app-game-movie',
  standalone: true,
  imports: [GameImgComponent, GameLivesComponent, GameMovieEntryComponent, GameInfoComponent, GameButtonsComponent, CommonModule],
  templateUrl: './game-movie.component.html',
  styleUrl: './game-movie.component.css'
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

  @ViewChild(GameMovieEntryComponent) gameMovieEntryComponent!: GameMovieEntryComponent;

  constructor(private movieAPIService: MovieAPIService, private levelSelectorService: LevelSelectorService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Recuperar o número da fase da URL
    this.route.params.subscribe(params => {
      const levelNumber = +params['levelNumber']; // + converte para número
      console.log(levelNumber);
      // Fazer uma requisição HTTP para carregar o arquivo JSON
      this.http.get<any>('assets/movie-ids.json').subscribe(data => {
        // Processar os dados do JSON
        const faseIdMapping = data;
        // Obter o ID do filme correspondente ao número da fase
        this.movieToGuessId = faseIdMapping[levelNumber];

        // Resetar a quantidade de vidas e o estado de acerto
        this.livesRemaining = 4;
        this.guessedCorrectly = false;
        this.movieSelected = false

        // Usar o ID do filme para recuperar a imagem
        this.fetchMovieImage();
      });
    });
  }

  async submitMovieHandler(submittedCorrectly: boolean) {
    if (submittedCorrectly) {
      this.guessedCorrectly = true;
    }
    if (!submittedCorrectly) {
      this.livesRemaining--; // Reduz o número de vidas se o filme foi submetido incorretamente
    }
    if (this.livesRemaining < 1) {
      this.gameMovieEntryComponent.wrongMovie();
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
      const movieImageResponse = await this.movieAPIService.getMovieDetails(this.movieToGuessId, "en");
      console.log(movieImageResponse)
      const moviePoster = movieImageResponse.poster_path;
      console.log(moviePoster)
      this.movieImageUrl = `https://www.themoviedb.org/t/p/original${moviePoster}`;
    } catch (error) {
      console.error('Erro ao obter a imagem do filme:', error);
    }
  }

}