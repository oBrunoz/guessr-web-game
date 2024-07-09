import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-movie-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-movie-img.component.html',
  styleUrl: './game-movie-img.component.css'
})

export class GameMovieImgComponent {
  @Input() movieImageUrl!: string; // Propriedade de entrada para a URL da imagem
  @Input() lives: number = 4; // Número inicial de vidas
  @Input() guessedCorrectly: boolean = false; // Estado inicial de acerto
}

