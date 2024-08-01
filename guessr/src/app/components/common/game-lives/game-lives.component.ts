import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-lives',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './game-lives.component.html',
  styleUrl: './game-lives.component.css'
})

export class GameLivesComponent {
  @Input() lives: number = 4; // Número inicial de vidas

  constructor() {}

  getLifeClass(index: number): string {
    return index < this.lives ? 'fa-solid fa-star filled' : 'fa-solid fa-star';
  }
}