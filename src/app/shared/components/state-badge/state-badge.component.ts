import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-state-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-badge.component.html',
  styleUrl: './state-badge.component.scss',
})
export class StateBadgeComponent {
  @Input() state: string;
  @Input() showIcon: boolean = true; // Default to true, icons will be shown
  // Define styles for each state
  stateStyle = {
    Pending: 'bg-yellow-100 text-yellow-500',
    Accepted: 'bg-green-100 text-green-500',
    Expired: 'bg-red-100 text-red-500',
    Failed: 'bg-gray-100 text-gray-500',
    Cancelled: 'bg-red-200 text-red-600',
    Completed: 'bg-green-200 text-green-600',
    Denied: 'bg-red-300 text-red-700',
    Processing: 'bg-blue-100 text-blue-500',
    Refunded: 'bg-purple-100 text-purple-500',
    Delivered: 'bg-green-300 text-green-700',
    Delivering: 'bg-blue-300 text-blue-700',
    default: 'bg-gray-100 text-gray-500',
  };

  // Get the CSS class for the current state
  getStateStyle(state: string): string {
    return this.stateStyle[state] || this.stateStyle.default;
  }
}
