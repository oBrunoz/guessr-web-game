import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MusicAPIService } from '../../../../core/services/music-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-music-entry',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './game-music-entry.component.html',
  styleUrl: './game-music-entry.component.css'
})

export class GameMusicEntryComponent {
  albumSuggestions: any[] = [];
  selectedAlbum: any;
  selectedAlbumTitle: string = '';
  showSuggestions: boolean = false;

  @Input() albumToGuessId: number = 0; 
  @Output() albumSelected = new EventEmitter<any>();
  @Output() submitAlbumEvent = new EventEmitter<boolean>(); // Evento para notificar o componente pai se o álbum foi submetido com sucesso

  constructor( private musicAPIService: MusicAPIService) {}

  async searchAlbums(event: any) {
    const query = event.target.value;
    if (query) {
      try {
        const suggestions = await this.musicAPIService.fetchAlbumSuggestions(query).toPromise();
        this.albumSuggestions = suggestions || []; // Garante que sempre será um array
        this.showSuggestions = true;
      } catch (error) {
        console.error('Erro ao buscar sugestões de álbuns:', error);
        this.albumSuggestions = []; // Garante que a variável é um array mesmo em caso de erro
        this.showSuggestions = false;
      }
    } else {
      this.albumSuggestions = []; // Limpa a lista de sugestões se a consulta estiver vazia
      this.showSuggestions = false;
    }
  }

  selectAlbum(album: any) {
    this.selectedAlbum = album;
    this.selectedAlbumTitle = album.title; // Atualiza o título do álbum selecionado
    this.albumSuggestions = []; // Limpar a lista de sugestões após selecionar o álbum
    console.log(this.selectedAlbum)
  }

  async submitAlbum() {
    if (this.selectedAlbum) {
      const albumId = this.selectedAlbum.id;
      console.log(albumId);
      try {
        // Verifica se a ID do álbum enviado corresponde à ID do álbum a ser descoberto
        if (albumId === this.albumToGuessId) {
          this.submitAlbumEvent.emit(true); // Emite um evento para indicar que o álbum foi submetido corretamente

          // Chamar a função para buscar informações do álbum pelo ID
          this.musicAPIService.getAlbumInfo(albumId)
            .subscribe((albumDetails: any) => {
              console.log('Detalhes do álbum:');
              console.log(albumDetails.title);
              console.log(albumDetails.release_date);
              console.log(albumDetails.artist.name);

              // Obter o ano do release_date
              const releaseYear = new Date(albumDetails.release_date).getFullYear();
              console.log(releaseYear);

              // Detalhes do álbum
              const details = {
                title: albumDetails.title,
                releaseYear: releaseYear,
                artist: albumDetails.artist.name
              };
              console.log(details);

              // Emitir os detalhes do álbum
              this.albumSelected.emit(details);
            }, (error: any) => {
              console.error('Erro ao buscar detalhes do álbum:', error);
            });

        } else {
          this.submitAlbumEvent.emit(false); // Emite um evento para indicar que o álbum foi submetido incorretamente
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do álbum:', error);
      }
    }
  }

  async wrongAlbum() {
    // Chamar a função para buscar informações do álbum pelo ID
    this.musicAPIService.getAlbumInfo(this.albumToGuessId)
      .subscribe((albumDetails: any) => {
        console.log('Detalhes do álbum:');
        console.log(albumDetails.title);
        console.log(albumDetails.release_date);
        console.log(albumDetails.artist.name);

        // Obter o ano do release_date
        const releaseYear = new Date(albumDetails.release_date).getFullYear();
        console.log(releaseYear);

        // Detalhes do álbum
        const details = {
          title: albumDetails.title,
          releaseYear: releaseYear,
          artist: albumDetails.artist.name
        };
        console.log(details);

        // Emitir os detalhes do álbum
        this.albumSelected.emit(details);
      }, (error: any) => {
        console.error('Erro ao buscar detalhes do álbum:', error);
      });
  }


}
