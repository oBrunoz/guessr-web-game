import { Component, Input } from '@angular/core';
import { GameMangaEntryComponent } from '../../game/manga/game-manga-entry/game-manga-entry.component';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [ GameMangaEntryComponent ],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.css'
})

export class GameInfoComponent {
  @Input() mangaTitle: string = '';
  @Input() releaseYear: number | undefined;
  @Input() producer: string = '';
}