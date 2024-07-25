import { Component, OnInit, ViewChild } from '@angular/core';
import { GameButtonsComponent } from '../../common/game-buttons/game-buttons.component';
import { GameMusicEntryComponent } from './game-music-entry/game-music-entry.component';
import { GameImgComponent } from '../../common/game-img/game-img.component';
import { GameInfoComponent } from '../../common/game-info/game-info.component';
import { GameLivesComponent } from '../../common/game-lives/game-lives.component';
import { CommonModule } from '@angular/common';
import { MusicAPIService } from '../../../core/services/music-api.service';
import { LevelSelectorService } from '../../../core/services/level-selector.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game-music',
  standalone: true,
  templateUrl: './game-music.component.html',
  styleUrl: './game-music.component.css',
  imports: [GameImgComponent, GameLivesComponent, GameMusicEntryComponent, GameInfoComponent, GameButtonsComponent, CommonModule],
})

export class GameMusicComponent implements OnInit {
  albumSelected: boolean = false;
  selectedAlbumTitle: string = '';
  selectedAlbumReleaseYear: number | undefined;
  selectedAlbumArtist: string = '';

  albumToGuessId!: number; // Define a ID do álbum a ser descoberto
  albumImageUrl!: string;
    
  livesRemaining: number = 4; // Número inicial de vidas
  guessedCorrectly: boolean = false; // Indica se o filme foi adivinhado corretamente

  @ViewChild(GameMusicEntryComponent) gameMusicEntryComponent!: GameMusicEntryComponent;

  constructor(private musicAPIService: MusicAPIService, private levelSelectorService: LevelSelectorService, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Recuperar o número da fase da URL
    this.route.params.subscribe(params => {
      const levelNumber = +params['levelNumber']; // + converte para número
      console.log(levelNumber);
      // Fazer uma requisição HTTP para carregar o arquivo JSON
      this.http.get<any>('assets/album-ids.json').subscribe(data => {
        // Processar os dados do JSON
        const faseIdMapping = data;
        // Obter o ID do álbum correspondente ao número da fase
        this.albumToGuessId = faseIdMapping[levelNumber];

        // Resetar a quantidade de vidas e o estado de acerto
        this.livesRemaining = 4;
        this.guessedCorrectly = false;
        this.albumSelected = false

        // Usar o ID do álbum para recuperar a imagem
        this.fetchAlbumCover();
      });
    });
  }

  async submitAlbumHandler(submittedCorrectly: boolean) {
    if (submittedCorrectly) {
      this.guessedCorrectly = true; 
    }
    if (!submittedCorrectly) {
        this.livesRemaining--; // Reduz o número de vidas se o álbum foi submetido incorretamente
      }
    if (this.livesRemaining < 1) {
      this.gameMusicEntryComponent.wrongAlbum();
    }
  }


  onAlbumSelected(details: any) {
      this.selectedAlbumTitle = details.title;
      this.selectedAlbumReleaseYear = details.releaseYear;
      this.selectedAlbumArtist = details.artist;
      this.albumSelected = true;
  }


  async fetchAlbumCover(): Promise<void> {
    try {
      const albumInfo = await this.musicAPIService.getAlbumInfo(this.albumToGuessId).toPromise();
      this.albumImageUrl = albumInfo.cover_xl; // URL da capa em alta resolução
      console.log(this.albumImageUrl);
    } catch (error) {
      console.error('Erro ao obter a capa do álbum:', error);
    }
  }

}
