import { PersonContainer } from './person/person.container';
import { HomeComponent } from './home/home.component';

export const Routes = [
  { path: '', component: HomeComponent },
  { path: 'persons/:id', component: PersonContainer }
];
