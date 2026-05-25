import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <section class="page-header">
        <div class="container">
          <h1>Commodités</h1>
          <p>Découvrez tous les services et équipements disponibles dans nos appartements</p>
        </div>
      </section>
      <section class="content">
        <div class="container">
          <p>Page en cours de développement...</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .page-header {
      padding: 6rem 0 4rem;
      background: linear-gradient(135deg, var(--trust-navy) 0%, var(--slate-accent) 100%);
      color: var(--white);
      text-align: center;
    }
    .content {
      padding: 4rem 0;
    }
  `]
})
export class AmenitiesComponent {}