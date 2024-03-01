import { Component } from '@angular/core';
import { GameMovieImgComponent } from "./game-movie-img/game-movie-img.component";
import { GameMovieLivesComponent } from './game-movie-lives/game-movie-lives.component';
import { GameMovieEntryComponent } from './game-movie-entry/game-movie-entry.component';
import { GameMovieInfoComponent } from './game-movie-info/game-movie-info.component';
import { GameMovieButtonsComponent } from './game-movie-buttons/game-movie-buttons.component';

@Component({
    selector: 'app-game-movie',
    standalone: true,
    templateUrl: './game-movie.component.html',
    styleUrl: './game-movie.component.css',
    imports: [GameMovieImgComponent, GameMovieLivesComponent, GameMovieEntryComponent, GameMovieInfoComponent, GameMovieButtonsComponent]
})
export class GameMovieComponent {

}
