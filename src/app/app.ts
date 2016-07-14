import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';
import { PersonsService } from './person-list/persons.service';
import { PersonListComponent } from './person-list/person-list.component';

@Component({
  selector: 'app',
  template: `
    <div>
      <h1>Shiny Shiny Application</h1>
      <person-list
        [persons]="personsService.persons | async"
        [selectedPerson]="personsService.selectedPerson | async"></person-list>
      <router-outlet></router-outlet>
      <ngrx-store-log-monitor
        toggleCommand="ctrl-z"
        positionCommand="ctrl-p">
      </ngrx-store-log-monitor>
    </div>
  `,
  directives: [
    ROUTER_DIRECTIVES,
    StoreLogMonitorComponent,
    PersonListComponent
  ]
})
export class App {

  constructor(private personsService: PersonsService) {}

  ngOnInit() {
    this.personsService.loadPersons();
  }
}
