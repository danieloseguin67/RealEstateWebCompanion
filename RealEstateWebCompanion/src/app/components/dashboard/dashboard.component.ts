import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { GoogleDriveService } from '../../services/google-drive.service';
import { StorageService } from '../../services/storage.service';
import { Customer } from '../../services/auth.service';
import { Apartment, Area, UnitType, Toggle } from '../../models/data.models';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  apartments: Apartment[] = [];
  areas: Area[] = [];
  unitTypes: UnitType[] = [];
  toggles: Toggle[] = [];
  customer: Customer | null = null;
  stats = {
    totalListings: 0,
    availableListings: 0,
    totalAreas: 0,
    averageRental: 0
  };

  constructor(
    private dataService: DataService,
    private googleDriveService: GoogleDriveService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.customer = this.storageService.getItem<Customer>('authUser');
    this.dataService.apartments$.subscribe(data => {
      this.apartments = data;
      this.updateStats();
    });
    this.dataService.areas$.subscribe(data => {
      this.areas = data;
      this.updateStats();
    });
    this.dataService.unitTypes$.subscribe(data => this.unitTypes = data);
    this.dataService.toggles$.subscribe(data => this.toggles = data);
  }

  updateStats(): void {
    this.stats.totalListings = this.apartments.length;
    this.stats.availableListings = this.apartments.filter(a => a.available).length;
    this.stats.totalAreas = this.areas.length;
    this.stats.averageRental = this.apartments.length > 0
      ? Math.round(this.apartments.reduce((sum, a) => sum + a.price, 0) / this.apartments.length)
      : 0;
  }
}
