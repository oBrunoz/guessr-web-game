import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';

import { GameMovieComponent } from './components/game/movie/game-movie.component';
import { GameLivesComponent } from './components/common/game-lives/game-lives.component';
import { GameMovieEntryComponent } from './components/game/movie/game-movie-entry/game-movie-entry.component';
import { GameInfoComponent } from './components/common/game-info/game-info.component';
import { GameImgComponent } from './components/common/game-img/game-img.component';
import { GameMusicComponent } from './components/game/music/game-music.component';
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
    GameLivesComponent,
    GameMovieEntryComponent,
    GameInfoComponent,
    GameImgComponent,
    GameMusicComponent,
    LevelSelectorComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'guessr';
}
