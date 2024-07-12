import { Component } from '@angular/core';
import { VideogameAPIService } from '../../../core/services/videogame-api.service';

@Component({
  selector: 'app-game-videogame',
  standalone: true,
  imports: [],
  templateUrl: './game-videogame.component.html',
  styleUrl: './game-videogame.component.css'
})
export class GameVideogameComponent {
  games: any[] = [];
  gameId: number = 1942

  constructor(private videogameAPIService: VideogameAPIService) {}

  ngOnInit(): void {
    this.videogameAPIService.getGames().subscribe(
      (data: any) => {
        this.games = data;
        console.log(this.games);
      },
      (error: any) => {
        console.error('Erro ao buscar jogos:', error);
      }
    );

    this.getGameDetails(1942)
  }

  getGameDetails(gameId: number): void {
    this.videogameAPIService.getGameDetails(gameId).subscribe(
      (data: any) => {
        console.log('Detalhes do jogo:', data);
      },
      (error: any) => {
        console.error('Erro ao buscar detalhes do jogo:', error);
      }
    );
  }

}
