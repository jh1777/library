import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, QueryList, input, signal } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'ui-test-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './test-button.component.html',
  styleUrl: './test-button.component.scss'
})
export class TestButtonComponent implements AfterContentInit {
   @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;

  label = input.required<string>();
  
  ngAfterContentInit() {

    // Check if more than one ui-badge is used and throw error
    if (this.badges.length > 1) {

      //this.badges.reset([this.badges.last]);
      throw new Error('Only one ui-badge is allowed within ui-test-button');
    }
  }
}
