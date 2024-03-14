import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MangaAPIService } from '../../../../core/services/manga-api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-manga-entry',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './game-manga-entry.component.html',
  styleUrl: './game-manga-entry.component.css'
})
export class GameMangaEntryComponent implements OnInit {
  mangaSuggestions: any[] = [];
  selectedManga: any;
  selectedMangaTitle: string = '';
  showSuggestions: boolean = false;

  @Input() mangaToGuessId: string = '304ceac3-8cdb-4fe7-acf7-2b6ff7a60613'; 
  @Output() mangaSelected = new EventEmitter<any>();
  @Output() submitMangaEvent = new EventEmitter<boolean>(); // Evento para notificar o componente pai se o filme foi submetido com sucesso

  constructor(private mangaAPIService: MangaAPIService) {}

  ngOnInit(): void {}

  async searchManga(event: any) {
    const query = event.target.value;
    if(query) {
      try {
        this.mangaSuggestions = await this.mangaAPIService.fetchSuggestions(query);
        this.showSuggestions = true;
      } catch(error) {
        console.error('Erro ao buscar sugestões de mangas: ', error);
      }
    } else {
      this.mangaSuggestions = [];
      this.showSuggestions = false;
    }
  }

  selectManga(manga: any) {
    this.selectedManga = manga;
    this.selectedMangaTitle = `${manga.title} (${manga.year})`; // Atualiza o título do filme selecionado
    this.mangaSuggestions = []; // Limpar a lista de sugestões após selecionar o filme
  }

  async submitManga() {
    if (this.selectedManga) {
      const mangaId = this.selectedManga.manga_id;
      console.log(mangaId)
      try {
        // Verifica se a ID do filme enviado corresponde à ID do filme a ser descoberto
        if (mangaId === this.mangaToGuessId) {
          const imageUrl = await this.mangaAPIService.getMangaImages(mangaId, this.selectedManga.manga_cover_id);
          const authorInfo = await this.mangaAPIService.getMangaAuthor(this.selectedManga.author)
          this.submitMangaEvent.emit(true); // Emite um evento para indicar que o filme foi submetido corretamente
          this.mangaSelected.emit(imageUrl);
          console.log('URL DA IMAGEM: ', imageUrl);
          console.log('Detalhes do filme:');

          console.log(this.selectedManga.title);
          console.log(this.selectedManga.year);
          console.log(authorInfo);
        } else {
          this.submitMangaEvent.emit(false); // Emite um evento para indicar que o filme foi submetido incorretamente

        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    } else {
      console.log('Input is null')
    }
  }

}
