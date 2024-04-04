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
  levels: { levelNumber: number, movieId: number }[] = [];
  @Output() phaseSelected = new EventEmitter<number>();

  constructor(private http: HttpClient, private router: Router, private levelSelectorService: LevelSelectorService, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.getPhases().subscribe((levels: any) => {
      this.levels = Object.keys(levels).map((key: string, index: number) => {
        const levelNumber = parseInt(key, 10);
        return { levelNumber, movieId: levels[key] };
      });
    });
  }

  getPhases(): Observable<number[]> {
    return this.http.get<number[]>('assets/movie-ids.json');
  }

  randomLevel(): void {
    // Gerar um índice aleatório dentro do intervalo do array de fases
    const randomIndex = Math.floor(Math.random() * this.levels.length);
    // Obter o número da fase correspondente ao índice aleatório
    const randomPhaseNumber = this.levels[randomIndex];
    // Navegar para a rota da fase selecionada
    this.router.navigate(['/game-movie', randomPhaseNumber.levelNumber]);
  }

  selectLevel(level: { levelNumber: number, movieId: number }) {
    this.levelSelectorService.setSelectedMovieId(level.movieId);

    // Obtém o tipo de jogo da URL
    const gameType = this.route.snapshot.url[1].path;
    console.log(gameType)

    // Navegar para a rota da fase selecionada
    this.router.navigate([gameType, level.levelNumber]);
  }

}
