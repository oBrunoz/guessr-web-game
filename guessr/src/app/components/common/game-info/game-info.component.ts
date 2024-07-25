import { Component, Input } from '@angular/core';
import { GameMovieEntryComponent } from '../../game/movie/game-movie-entry/game-movie-entry.component';


@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [GameMovieEntryComponent],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.css'
})

export class GameInfoComponent {
  @Input() workTitle: string = '';
  @Input() releaseYear: number | undefined;
  @Input() producer: string = '';
}