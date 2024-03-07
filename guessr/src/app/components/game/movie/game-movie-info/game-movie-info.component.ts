import { Component, Input } from '@angular/core';
import { GameMovieEntryComponent } from '../game-movie-entry/game-movie-entry.component';


@Component({
  selector: 'app-game-movie-info',
  standalone: true,
  imports: [ GameMovieEntryComponent ],
  templateUrl: './game-movie-info.component.html',
  styleUrl: './game-movie-info.component.css'
})

export class GameMovieInfoComponent {
  @Input() movieTitle: string = '';
  @Input() releaseYear: number | undefined;
  @Input() director: string = '';
}
