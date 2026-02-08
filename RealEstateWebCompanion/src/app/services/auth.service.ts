import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { StorageService } from './storage.service';
import { CryptoUtil } from '../utils/crypto.util';

export interface Customer {
  customerId: string;
  customerName: string;
  customerEmail: string;
  userId: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();

  private customersLoadedSubject = new BehaviorSubject<boolean>(false);
  customersLoaded$ = this.customersLoadedSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private storage: StorageService) {
    const storedUser = this.storage.getItem<Customer>('authUser');
    this.loggedInSubject.next(!!storedUser);
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.http.get<{ customers: Customer[] }>("assets/data/customer.json").subscribe({
      next: (data) => {
        this.customersSubject.next(data.customers || []);
        this.customersLoadedSubject.next(true);
      },
      error: () => {
        // Even on error, mark as loaded so UI is not stuck
        this.customersSubject.next([]);
        this.customersLoadedSubject.next(true);
      }
    });
  }

  async login(userId: string, password: string): Promise<boolean> {
    const uid = (userId || '').trim();
    const pwd = (password || '').trim();

    console.log('Login attempt:', { userId: uid, password: pwd });

    let customers = this.customersSubject.value;
    if (!customers || customers.length === 0) {
      try {
        const data = await firstValueFrom(
          this.http.get<{ customers: Customer[] }>("assets/data/customer.json")
        );
        customers = data.customers || [];
        this.customersSubject.next(customers);
        this.customersLoadedSubject.next(true);
      } catch (error) {
        console.error('Failed to load customers:', error);
        customers = [];
        this.customersLoadedSubject.next(true);
      }
    }

    console.log('Available customers:', customers);

    const match = customers.find(
      (c) => {
        const customerUserId = (c.userId || '').trim().toLowerCase();
        const encryptedPassword = (c.password || '').trim();
        const decryptedPassword = CryptoUtil.decrypt(encryptedPassword);
        
        console.log('Comparing:', { 
          customerUserId, 
          inputUserId: uid.toLowerCase(), 
          userIdMatch: customerUserId === uid.toLowerCase(),
          passwordMatch: decryptedPassword === pwd 
        });
        return customerUserId === uid.toLowerCase() && decryptedPassword === pwd;
      }
    );
    
    console.log('Match found:', match);
    
    if (match) {
      this.storage.setItem('authUser', match);
      this.loggedInSubject.next(true);
      return true;
    }
    this.loggedInSubject.next(false);
    return false;
  }

  logout(): void {
    this.storage.removeItem('authUser');
    this.loggedInSubject.next(false);
  }

  getCurrentUser(): Customer | null {
    return this.storage.getItem<Customer>('authUser');
  }
}
