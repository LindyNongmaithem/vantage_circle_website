import { Component, Input } from '@angular/core';

export type MetricIconType = 'primary' | 'success' | 'warning' | 'info';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.css']
})
export class MetricCardComponent {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() iconType: MetricIconType = 'primary';
}
