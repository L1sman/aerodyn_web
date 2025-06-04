import { makeAutoObservable } from 'mobx';
import { deliveryStore } from './store';
import { deliveryFiltersStore } from '@/features/delivery/filters/model/store';

class RootStore {
  initialized = false;
  loading = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async initialize() {
    if (this.initialized) return;
    
    this.loading = true;
    this.error = null;

    try {
      // Fetch all data in parallel
      await Promise.all([
        deliveryFiltersStore.fetchFilterOptions(),
        deliveryStore.fetchDeliveries()
      ]);
      
      this.initialized = true;
    } catch (error) {
      this.error = 'Failed to initialize application data';
    } finally {
      this.loading = false;
    }
  }
}

export const rootStore = new RootStore(); 