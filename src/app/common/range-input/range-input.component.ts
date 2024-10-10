import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CostFilter } from '../../services/unit/dtos/cost-filter';

@Component({
  selector: 'app-range-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './range-input.component.html',
  styleUrl: './range-input.component.scss',
})
export class RangeInputComponent {
  @Input({
    required: true,
  })
  costFilter!: CostFilter;

  @Output()
  costFilterChange = new EventEmitter<CostFilter>();

  @Input()
  min = 0;

  @Input()
  max = 100;

  onValueChanged(slider: 'min' | 'max') {
    if (slider == 'min' && this.costFilter.min > this.costFilter.max) {
      this.costFilter.min = this.costFilter.max;
    }
    if (slider == 'max' && this.costFilter.max < this.costFilter.min) {
      this.costFilter.max = this.costFilter.min;
    }

    this.costFilterChange.emit(this.costFilter);
  }
}
