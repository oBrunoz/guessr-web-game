import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelSelectorService {
  private selectedMovieId!: number;

  constructor() {}

  setSelectedMovieId(movieId: number) {
    this.selectedMovieId = movieId;
  }

  getSelectedMovieId(): number {
    return this.selectedMovieId;
  }
}
