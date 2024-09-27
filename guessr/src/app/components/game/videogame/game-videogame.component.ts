import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { LevelSelectorService } from '../../../core/services/level-selector.service';
import { VideogameAPIService } from '../../../core/services/videogame-api.service';
import { GameImgComponent } from '../../common/game-img/game-img.component';
import { GameLivesComponent } from '../../common/game-lives/game-lives.component';
import { GameVideogameEntryComponent } from './game-videogame-entry/game-videogame-entry.component';
import { GameInfoComponent } from '../../common/game-info/game-info.component';
import { GameButtonsComponent } from '../../common/game-buttons/game-buttons.component';

@Component({
  selector: 'app-game-videogame',
  standalone: true,
  imports: [GameImgComponent, GameLivesComponent, GameInfoComponent, GameButtonsComponent, GameVideogameEntryComponent, CommonModule],
  templateUrl: './game-videogame.component.html',
  styleUrl: './game-videogame.component.css'
})

export class GameVideogameComponent implements OnInit  {
  videogameSelected: boolean = false;
  selectedVideogameTitle: string = '';
  selectedVideogameReleaseYear: number | undefined;
  selectedVideogameCompany: string = '';

  videogameToGuessId!: number; // Define a ID do videogame a ser descoberto
  videogameDetails: any;
  videogameCoverUrl: string = "";

  livesRemaining: number = 4; // Número inicial de vidas
  guessedCorrectly: boolean = false; // Indica se o videogame foi adivinhado corretamente

  @ViewChild(GameVideogameEntryComponent) gameVideogameEntryComponent!: GameVideogameEntryComponent;

  constructor(private videogameAPIService: VideogameAPIService, private levelSelectorService: LevelSelectorService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Recuperar o número da fase da URL
    this.route.params.subscribe(params => {
      const levelNumber = +params['levelNumber']; // + converte para número
      console.log(levelNumber);
      // Fazer uma requisição HTTP para carregar o arquivo JSON
      this.http.get<any>('assets/videogame-ids.json').subscribe(data => {
        // Processar os dados do JSON
        const faseIdMapping = data;
        // Obter o ID do videogame correspondente ao número da fase
        this.videogameToGuessId = faseIdMapping[levelNumber];

        // Resetar a quantidade de vidas e o estado de acerto
        this.livesRemaining = 4;
        this.guessedCorrectly = false;
        this.videogameSelected = false

        // Usar o ID do videogame para recuperar a imagem
        this.fetchGameDetailsAndCover(this.videogameToGuessId);
      });
    });
  }

  async submitVideogameHandler(submittedCorrectly: boolean) {
    if (submittedCorrectly) {
      this.guessedCorrectly = true;
    }
    if (!submittedCorrectly) {
      this.livesRemaining--; // Reduz o número de vidas se o álbum foi submetido incorretamente
    }
    if (this.livesRemaining < 1) {
      this.gameVideogameEntryComponent.wrongVideogame();
    }
  }

  onVideogameSelected(details: any) {
    this.selectedVideogameTitle = details.title;
    this.selectedVideogameReleaseYear = details.releaseYear;
    // this.selectedVideogameCompany = details.artist;
    this.videogameSelected = true;
  }

  fetchGameDetailsAndCover(gameId: number): void {
    // Primeiro, busque os detalhes do jogo
    this.videogameAPIService.getGameDetails(gameId).subscribe(
      (details: any) => {
        this.videogameDetails = details;
        console.log('Detalhes do jogo:', this.videogameDetails);

        // Em seguida, busque a capa do jogo
        this.videogameAPIService.getGameCover(gameId).subscribe(
          (covers: any[]) => {
            if (covers.length > 0) {
              const coverId = covers[0].image_id;
              this.videogameCoverUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${coverId}.jpg`;
              console.log('URL da capa do jogo:', this.videogameCoverUrl);
            } else {
              console.log('Nenhuma capa encontrada para o jogo.');
            }
          },
          (error: any) => {
            console.error('Erro ao buscar capa do jogo:', error);
          }
        );
      },
      (error: any) => {
        console.error('Erro ao buscar detalhes do jogo:', error);
      }
    );
  }

}