import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'person',
  template: `
    <h2>{{person.name}} ({{person.id}})</h2>
  `
})
export class PersonComponent {
  @Input() person: any;
}
