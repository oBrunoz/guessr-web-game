import { Component, OnInit } from '@angular/core';
import { GameMovieButtonsComponent } from '../movie/game-movie-buttons/game-movie-buttons.component';
import { GameMovieEntryComponent } from '../movie/game-movie-entry/game-movie-entry.component';
import { GameMovieImgComponent } from '../movie/game-movie-img/game-movie-img.component';
import { GameMovieInfoComponent } from '../movie/game-movie-info/game-movie-info.component';
import { GameMovieLivesComponent } from '../movie/game-movie-lives/game-movie-lives.component';
import { MangaAPIService } from '../../../core/services/manga-api-service';
import { GameMangaImgComponent } from './game-manga-img/game-manga-img.component';
import { GameMangaEntryComponent } from './game-manga-entry/game-manga-entry.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-manga',
  standalone: true,
  imports: [
    GameMovieButtonsComponent,
    GameMangaEntryComponent,
    GameMovieInfoComponent,
    GameMovieLivesComponent,
    GameMangaImgComponent,
    CommonModule
  ],
  templateUrl: './game-manga.component.html',
  styleUrl: './game-manga.component.css'
})
export class GameMangaComponent {
  constructor(private mangaAPIService: MangaAPIService) {}
}
