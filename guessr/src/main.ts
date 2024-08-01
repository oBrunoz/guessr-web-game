import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GameMangaComponent } from './app/components/game/manga/game-manga.component';
import { LevelSelectorComponent } from './app/components/level-selector/level-selector.component';
import { IndexComponent } from './app/components/index/index.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      { path: 'index', component: IndexComponent },
      { path: 'level-selector', component: LevelSelectorComponent },
      { path: 'game-manga/:phaseNumber', component: GameMangaComponent },
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: '**', redirectTo: 'index', pathMatch: 'full' },
    ]),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
  .catch((err) => console.error(err));