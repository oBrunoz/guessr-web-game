import { Component } from '@angular/core';
import { GameMovieImgComponent } from "./game-movie-img/game-movie-img.component";
import { GameMovieLivesComponent } from './game-movie-lives/game-movie-lives.component';
import { GameMovieEntryComponent } from './game-movie-entry/game-movie-entry.component';
import { GameMovieInfoComponent } from './game-movie-info/game-movie-info.component';
import { GameMovieButtonsComponent } from './game-movie-buttons/game-movie-buttons.component';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-game-movie',
    standalone: true,
    templateUrl: './game-movie.component.html',
    styleUrl: './game-movie.component.css',
    imports: [GameMovieImgComponent, GameMovieLivesComponent, GameMovieEntryComponent, GameMovieInfoComponent, GameMovieButtonsComponent, CommonModule ]
})

export class GameMovieComponent {
    movieSelected: boolean = false;
    selectedMovieTitle: string = '';
    selectedMovieReleaseYear: number | undefined;
    selectedMovieDirector: string = '';

    onMovieSelected(details: any) {
        this.selectedMovieTitle = details.title;
        this.selectedMovieReleaseYear = details.releaseYear;
        this.selectedMovieDirector = details.director;
        this.movieSelected = true;
    }
}
