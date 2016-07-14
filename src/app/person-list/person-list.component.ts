import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'person-list',
  template: `
    <div>
      <h2>Persons</h2>
      <ul>
        <li *ngFor="let person of persons">
          <a [routerLink]="['/persons', person.id]">
            <span>{{person.name}}</span>
            <span *ngIf="selectedPerson && selectedPerson.id === person.id">(s)</span>
          </a>
        </li>
      </ul>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class PersonListComponent {
  @Input() persons: any[];
  @Input() selectedPerson: any;
}
