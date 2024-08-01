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

  @Input() mangaToGuessId: number = 0;
  @Output() mangaSelected = new EventEmitter<any>();
  @Output() submitMangaEvent = new EventEmitter<boolean>(); // Evento para notificar o componente pai se o filme foi submetido com sucesso

  constructor(private mangaAPIService: MangaAPIService) {}

  ngOnInit(): void {console.log('Manga id: '+ this.mangaToGuessId)}
 
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
          console.log('Nao foi. MangaID: ', mangaId, 'Manga to guess: ', this.mangaToGuessId);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    } else {
      console.log('Input is null')
    }
  }

  async wrongManga() {
    // Chamar a função para buscar informações do filme pelo ID
    this.mangaAPIService.getMangaDetails((this.mangaToGuessId).toString())
    .then((mangaDetails: any) => {
      console.log('Detalhes do filme:');
      console.log(mangaDetails);
      console.log(mangaDetails);
      console.log(mangaDetails);

      // // Obter o ano do release_date
      // const releaseYear = new Date(mangaDetails.release_date).getFullYear();

      // // Chamar a função para buscar os créditos do filme pelo ID
      // this.mangaAPIService.getMangaDetails(this.mangaToGuessId.toString())
      //   .then((mangaCredits: any) => {
      //     const directors = mangaCredits.crew.filter((member: { name: string, department: string, job: string }) => member.department === "Directing" && member.job === "Director");
      //     console.log("Direção:");
      //     const directorNames = directors.map((director: { name: string; }) => director.name);
      //     console.log(directorNames);

      //     // Detalhes do filme
      //     const details = {
      //       title: mangaDetails.title,
      //       releaseYear: releaseYear,
      //       director: directorNames.join(', ') // Convertendo a array de nomes em uma string separada por vírgulas
      //     };
          
      //     // Emitir os detalhes do filme
      //     this.mangaSelected.emit(details);
      //   })
      //   .catch((error: any) => {
      //     console.error('Erro ao buscar detalhes do filme:', error);
      //   });
    })
 
  }

}
