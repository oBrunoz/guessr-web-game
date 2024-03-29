import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  phases: { phaseNumber: number, movieId: number }[] = [];
  @Output() phaseSelected = new EventEmitter<number>();

  constructor(private http: HttpClient, private router: Router, private levelSelectorService: LevelSelectorService) {}

  ngOnInit(): void {
    this.getPhases().subscribe((phases: any) => {
      this.phases = Object.keys(phases).map((key: string, index: number) => {
        const phaseNumber = parseInt(key, 10);
        return { phaseNumber, movieId: phases[key] };
      });
    });
  }

  getPhases(): Observable<number[]> {
    return this.http.get<number[]>('assets/movie-ids.json');
  }

  selectPhase(phase: { phaseNumber: number, movieId: number }) {
    this.levelSelectorService.setSelectedMovieId(phase.movieId);
    this.router.navigate(['/game-movie', phase.phaseNumber]);
  }

}
