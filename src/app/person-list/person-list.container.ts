import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { PersonListComponent } from './person-list.component';
import { PersonsService } from './persons.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'person-list-container',
  template: `
    <person-list
      [persons]="personsService.persons | async"
      [selectedPerson]="personsService.selectedPerson | async">
    </person-list>
  `,
  directives: [
    PersonListComponent,
    ROUTER_DIRECTIVES
  ]
})
export class PersonListContainer {

  constructor(private route: ActivatedRoute, private personsService: PersonsService) {}
}
