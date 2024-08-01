import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-buttons',
  standalone: true,
  imports: [],
  templateUrl: './game-buttons.component.html',
  styleUrl: './game-buttons.component.css'
})
export class GameButtonsComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

  return(): void {

    // Obtém o tipo de jogo da URL
    const gameType = this.route.snapshot.url[0].path;
    console.log(gameType)

    // Navegar para a rota da fase selecionada
    this.router.navigate(['/level-selector', gameType]);
  }

  next(): void {

    // Obtém o número da fase da URL
    const gameLevel = this.route.snapshot.url[1].path;
    console.log(gameLevel)

    const nextLevel = parseInt(gameLevel) + 1

    // Obtém o tipo de jogo da URL
    const gameType = this.route.snapshot.url[0].path;
    console.log(gameType)

    // Navegar para a rota da fase selecionada
    if (nextLevel <= 100) {
      this.router.navigate([gameType, nextLevel]);
    }
  }

  previous(): void {

    // Obtém o número da fase da URL
    const gameLevel = this.route.snapshot.url[1].path;

    const previousLevel = parseInt(gameLevel) - 1

    // Obtém o tipo de jogo da URL
    const gameType = this.route.snapshot.url[0].path;

    // Navegar para a rota da fase selecionada
    if (previousLevel >= 1) {
      this.router.navigate([gameType, previousLevel]);
    }
  }

  isFirstLevel(): boolean {
    // Obtém o número da fase da URL
    const gameLevel = parseInt(this.route.snapshot.url[1].path);
    // Retorna true se o número da fase for 1, indicando que é a primeira fase
    return gameLevel === 1;
  }

  isLastLevel(): boolean {
      // Obtém o número da fase da URL
      const gameLevel = parseInt(this.route.snapshot.url[1].path);
      // Retorna true se o número da fase for 100, indicando que é a última fase
      return gameLevel === 100;
  }

}