import { Action } from '@ngrx/store';

export interface PersonState {
  persons: any[];
  selectedPerson: any;
}

const initialState: PersonState = {
  persons: [],
  selectedPerson: undefined
};

export const LOAD_PERSONS = '[persons] load';
export const SELECT_PERSON = '[persons] select';

export const personsReducer = (state: PersonState = initialState, action: Action): PersonState => {

  switch (action.type) {
    case LOAD_PERSONS:
      return Object.assign({}, state, {
        persons: action.payload
      });

    case SELECT_PERSON:
      return Object.assign({}, state, {
        selectedPerson: state.persons.find(person => person.id === action.payload)
      });

    default:
      return state;
  }
};
