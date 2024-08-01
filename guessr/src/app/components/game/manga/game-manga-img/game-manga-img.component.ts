import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-manga-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-manga-img.component.html',
  styleUrl: './game-manga-img.component.css'
})
export class GameMangaImgComponent {
  @Input() mangaImageUrl: string = '';
}
