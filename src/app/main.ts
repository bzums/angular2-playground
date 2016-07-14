///<reference path="../../typings/index.d.ts"/>

import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { provideStore } from '@ngrx/store';
import { instrumentStore } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { App } from './app';
import { Routes } from './routes';
import { personsReducer } from './person-list/persons.reducer';
import { PersonsService } from './person-list/persons.service';

bootstrap(<any> App, [
  PersonsService,
  provideStore({
    personsReducer
  }),
  provideRouter(Routes),
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);
