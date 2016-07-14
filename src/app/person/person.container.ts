import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonComponent } from './person.component';
import { PersonsService } from '../person-list/persons.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'person-container',
  template: `
    <person [person]="personsService.selectedPerson | async"></person>
  `,
  directives: [
    PersonComponent
  ]
})
export class PersonContainer implements OnInit {

  constructor(private route: ActivatedRoute, private personsService: PersonsService) {}

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe(id => {
      this.personsService.selectPerson(id);
    });
  }
}
