import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <section class="page-header">
        <div class="container">
          <h1>Galerie</h1>
          <p>Explorez nos appartements en images</p>
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
export class GalleryComponent {}