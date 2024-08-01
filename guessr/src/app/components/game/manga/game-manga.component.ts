import { Component, OnInit, ViewChild } from '@angular/core';
import { MangaAPIService } from '../../../core/services/manga-api-service';
import { GameMangaEntryComponent } from './game-manga-entry/game-manga-entry.component';
import { CommonModule } from '@angular/common';
import { LevelSelectorService } from '../../../core/services/level-selector.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GameImgComponent } from '../../common/game-img/game-img.component';
import { GameInfoComponent } from '../../common/game-info/game-info.component';
import { GameButtonsComponent } from '../../common/game-buttons/game-buttons.component';
import { GameLivesComponent } from '../../common/game-lives/game-lives.component';

@Component({
  selector: 'app-game-manga',
  standalone: true,
  templateUrl: './game-manga.component.html',
  styleUrl: './game-manga.component.css',
  imports: [
    GameImgComponent,
    GameLivesComponent,
    GameMangaEntryComponent,
    GameInfoComponent,
    GameButtonsComponent,
    CommonModule
  ]
})

export class GameMangaComponent implements OnInit {
  mangaSelected: boolean = false;
  selectedMangaTitle: string = '';
  selectedMangaReleaseYear: number | undefined;
  selectedMangaDirector: string = '';
  coverArtId!: string;

  mangaToGuessId!: number; // Define a ID do filme a ser descoberto
  mangaImageUrl!: string;

  livesRemaining: number = 4; // Número inicial de vidas
  guessedCorrectly: boolean = false; // Indica se o filme foi adivinhado corretamente

  @ViewChild(GameMangaEntryComponent) gameMangaEntryComponent!: GameMangaEntryComponent;

  constructor(private mangaAPIService: MangaAPIService, private levelSelectorService: LevelSelectorService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Recuperar o número da fase da URL
    this.route.params.subscribe(params => {
      const faseNumero = + params['phaseNumber']; // + converte para número
      console.log(faseNumero);

      // Fazer uma requisição HTTP para carregar o arquivo JSON
      this.http.get<any[]>('assets/manga-ids.json').subscribe(data => {
        // Processar os dados do JSON
        const faseIdMapping = data;

        const manga = faseIdMapping.find(m => m.id === faseNumero);

        if (manga) {

          this.mangaToGuessId = manga.manga_id;
          this.coverArtId = manga.cover_art_id;

          this.livesRemaining = 4;
          this.guessedCorrectly = false;
          this.mangaSelected = false;

          console.log('Manga to guess id: ', this.mangaToGuessId)
          console.log('Manga to guess id: ', this.coverArtId)

          // Usar o ID do filme para recuperar a imagem
          this.fetchMangaImage();
        }
      });
    });
  }

  async submitMangaHandler(submittedCorrectly: boolean) {
    if (submittedCorrectly) {
      this.guessedCorrectly = true;
    }
    else {
      this.livesRemaining--; // Reduz o número de vidas, caso submetido incorretamente
    }
    if (this.livesRemaining < 1) {
      this.gameMangaEntryComponent.wrongManga();
    }
  }

  onMangaSelected(details: any) {
    this.selectedMangaTitle = details.title;
    this.selectedMangaReleaseYear = details.releaseYear;
    this.selectedMangaDirector = details.director;
    this.mangaSelected = true;
  }

  async fetchMangaImage() {
    try {
      const mangaImageResponse = await this.mangaAPIService.getMangaImages(this.mangaToGuessId.toString(), this.coverArtId);
      console.log(mangaImageResponse)
      this.mangaImageUrl = mangaImageResponse;
    } catch (error) {
      console.error('Erro ao obter a imagem do filme:', error);
    }
  }

}
