import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'test',
  template: `
    <div>
      Please choose a person...
    </div>
  `
})
export class HomeComponent {
  @Input() persons: any[];
  @Input() selectedPerson: any;
}
