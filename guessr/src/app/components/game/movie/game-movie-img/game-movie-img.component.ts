import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-movie-img',
  standalone: true,
  imports: [],
  templateUrl: './game-movie-img.component.html',
  styleUrl: './game-movie-img.component.css'
})

export class GameMovieImgComponent {
  @Input() movieImageUrl!: string; // Propriedade de entrada para a URL da imagem
}

