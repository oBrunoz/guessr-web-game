import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';

import { GameMovieComponent } from './components/game/movie/game-movie.component';
import { GameMovieLivesComponent } from './components/game/movie/game-movie-lives/game-movie-lives.component';
import { GameMovieEntryComponent } from './components/game/movie/game-movie-entry/game-movie-entry.component';
import { GameMovieInfoComponent } from './components/game/movie/game-movie-info/game-movie-info.component';
import { GameMovieImgComponent } from './components/game/movie/game-movie-img/game-movie-img.component';
import { LevelSelectorComponent } from './components/level-selector/level-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    IndexComponent,
    GameMovieComponent,
    GameMovieLivesComponent,
    GameMovieEntryComponent,
    GameMovieInfoComponent,
    GameMovieImgComponent,
    LevelSelectorComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'guessr';
}
