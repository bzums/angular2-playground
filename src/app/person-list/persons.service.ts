import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LOAD_PERSONS, SELECT_PERSON } from './persons.reducer';

@Injectable()
export class PersonsService {

  public persons: Observable<any[]>;
  public selectedPerson: Observable<any>;

  constructor(private store: Store<any>) {

    this.persons = store.select(state => state.personsReducer.persons);
    this.selectedPerson = store.select(state => state.personsReducer.selectedPerson);
  }

  loadPersons() {

    const persons = [
      { id: '0', name: 'Peter' },
      { id: '1', name: 'Petra' },
      { id: '2', name: 'Johann' },
      { id: '3', name: 'Johanna' }
    ];

    this.store.dispatch({
      type: LOAD_PERSONS,
      payload: persons
    });
  }

  selectPerson(id: string) {

    this.store.dispatch({
      type: SELECT_PERSON,
      payload: id
    });
  }
}
