import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelSelectorService {
  private selectedLevelId!: number;

  constructor() {}

  setSelectedLevelId(levelId: number) {
    this.selectedLevelId = levelId;
  }

  getSelectedLevelId(): number {
    return this.selectedLevelId;
  }
}
