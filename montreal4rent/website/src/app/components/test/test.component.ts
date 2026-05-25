import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem;">
      <h2>Test Page</h2>
      <p>This is the test route.</p>
      <p>If you can see this, the route is working correctly!</p>
    </div>
  `,
  styles: [`
    h2 {
      color: #333;
      margin-bottom: 1rem;
    }
    p {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class TestComponent {}
