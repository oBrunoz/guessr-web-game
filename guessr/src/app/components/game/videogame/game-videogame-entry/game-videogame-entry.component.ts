import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideogameAPIService } from '../../../../core/services/videogame-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-videogame-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-videogame-entry.component.html',
  styleUrl: './game-videogame-entry.component.css'
})

export class GameVideogameEntryComponent {
  videogameSuggestions: any[] = [];
  selectedVideogame: any;
  selectedVideogameTitle: string = '';
  showSuggestions: boolean = false;

  @Input() videogameToGuessId: number = 0;
  @Output() videogameSelected = new EventEmitter<any>();
  @Output() submitVideogameEvent = new EventEmitter<boolean>(); // Evento para notificar o componente pai se o videogame foi submetido com sucesso

  constructor(private videogameAPIService: VideogameAPIService) { }

  async searchVideogames(event: any) {
    const query = event.target.value;
    if (query) {
      this.videogameAPIService.getGames(query).subscribe(
        (data: any) => {
          this.videogameSuggestions = data || [];
          this.showSuggestions = true;
        },
        (error: any) => {
          console.error('Erro ao buscar jogos:', error);
        }
      );
    }
    else {
      this.videogameSuggestions = []; // Limpa a lista de sugestões se a consulta estiver vazia
      this.showSuggestions = false;
    }
  }

  selectVideogame(videogame: any) {
    this.selectedVideogame = videogame;
    this.selectedVideogameTitle = videogame.name; // Atualiza o título do videogame selecionado
    this.videogameSuggestions = []; // Limpar a lista de sugestões após selecionar o videogame
    console.log(this.selectedVideogame)
  }

  async submitVideogame() {
    if (this.selectedVideogame) {
      const videogameId = this.selectedVideogame.id;
      try {
        // Verifica se a ID do jogo enviado corresponde à ID do jogo a ser descoberto
        if (videogameId === this.videogameToGuessId) {
          this.submitVideogameEvent.emit(true); // Emite um evento para indicar que o jogo foi submetido corretamente

          // Chamar a função para buscar informações do jogo pelo ID
          this.videogameAPIService.getGameDetails(videogameId)
            .subscribe((videogameDetails: any[]) => {
              // Verifique se há detalhes do videogame retornados pela API
              if (videogameDetails.length > 0) {
                const details = videogameDetails[0];
                console.log(details.name);
                console.log(details.first_release_date);

                // Obter o ano do first_release_date
                if (details.first_release_date) {
                  const releaseYear = this.convertUnixToDate(details.first_release_date).getFullYear();
                  console.log('Data de lançamento: ' + releaseYear);

                  // Detalhes do videogame
                  const gameDetails = {
                    title: details.name,
                    releaseYear: releaseYear
                  };

                  // Emitir os detalhes do videogame
                  this.videogameSelected.emit(gameDetails);
                } else {
                  console.log('Data de lançamento não encontrada.');
                  // Emitir os detalhes do videogame sem a data de lançamento
                  const gameDetails = {
                    name: details.name,
                    releaseYear: null
                  };

                  this.videogameSelected.emit(gameDetails);
                }
              } else {
                console.log('Detalhes do jogo não encontrados.');
              }
            }, (error: any) => {
              console.error('Erro ao buscar detalhes do jogo:', error);
            });

        } else {
          this.submitVideogameEvent.emit(false); // Emite um evento para indicar que o videogame foi submetido incorretamente
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do videogame:', error);
      }
    }
  }

  async wrongVideogame() {
    // Chamar a função para buscar informações do videogame pelo ID
    this.videogameAPIService.getGameDetails(this.videogameToGuessId)
      .subscribe((videogameDetails: any[]) => {
        // Verifique se há detalhes do videogame retornados pela API
        if (videogameDetails.length > 0) {
          const details = videogameDetails[0];
          console.log('Detalhes do jogo:');
          console.log(details.name);
          console.log(details.first_release_date);

          // Obter o ano do first_release_date
          if (details.first_release_date) {
            const releaseYear = this.convertUnixToDate(details.first_release_date).getFullYear();
            console.log('Data de lançamento: ' + releaseYear);

            // Detalhes do videogame
            const gameDetails = {
              title: details.name,
              releaseYear: releaseYear
            };

            console.log(gameDetails);

            // Emitir os detalhes do videogame
            this.videogameSelected.emit(gameDetails);
          } else {
            console.log('Data de lançamento não encontrada.');
            // Emitir os detalhes do videogame sem a data de lançamento
            const gameDetails = {
              title: details.name,
              releaseYear: null
            };

            this.videogameSelected.emit(gameDetails);
          }
        } else {
          console.log('Detalhes do jogo não encontrados.');
        }
      }, (error: any) => {
        console.error('Erro ao buscar detalhes do jogo:', error);
      });
  }

  convertUnixToDate(unixTimestamp: number): Date {
    return new Date(unixTimestamp * 1000); // Converte de segundos para milissegundos
  }

}
