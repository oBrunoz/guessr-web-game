import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LevelSelectorService } from '../../core/services/level-selector.service';

@Component({
  selector: 'app-level-selector',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './level-selector.component.html',
  styleUrl: './level-selector.component.css'
})

export class LevelSelectorComponent implements OnInit {
  levels: { levelNumber: number, levelId: number }[] = [];
  @Output() phaseSelected = new EventEmitter<number>();
  gameType: string = '';

  constructor(private http: HttpClient, private router: Router, private levelSelectorService: LevelSelectorService, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      // Definindo o gameType
      this.gameType = url[1].path;

      // Definindo o número de fases
      this.getPhases().subscribe((levels: any) => {
        this.levels = Object.keys(levels).map((key: string, index: number) => {
          const levelNumber = parseInt(key, 10);
          return { levelNumber, levelId: levels[key] };
        });
      });
    });
  }

  getPhases(): Observable<number[]> {
    let jsonFile = 'assets/movie-ids.json'; // Default
    if (this.gameType === 'game-movie') {
      jsonFile = 'assets/movie-ids.json';
    } else if (this.gameType === 'game-music') {
      jsonFile = 'assets/album-ids.json';
    } else if (this.gameType === 'game-videogame') {
      jsonFile = 'assets/videogame-ids.json';
    } else if (this.gameType === 'game-manga') {
      jsonFile = 'assets/manga-ids.json';
    }

    return this.http.get<number[]>(jsonFile);
  }

  randomLevel(): void {
    // Gerar um índice aleatório dentro do intervalo do array de fases
    const randomIndex = Math.floor(Math.random() * this.levels.length);
    // Obter o número da fase correspondente ao índice aleatório
    const randomPhaseNumber = this.levels[randomIndex];
    // Navegar para a rota da fase selecionada
    this.router.navigate([this.gameType, randomPhaseNumber.levelNumber]);
  }

  selectLevel(level: { levelNumber: number, levelId: number }) {
    this.levelSelectorService.setSelectedLevelId(level.levelId);

    // Navegar para a rota da fase selecionada
    this.router.navigate([this.gameType, level.levelNumber]);

    console.log(this.gameType, level.levelNumber, level.levelId)
  }

}
