import { makeAutoObservable, computed } from 'mobx';
import { format } from 'date-fns';
import { baseAPI } from '@/shared/api/base';
import { deliveryFiltersStore } from '@/features/delivery/filters/model/store';
import type { Delivery } from '@/shared/api/types';

class DeliveryStore {
  deliveries: Delivery[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      filteredDeliveries: computed
    });
  }

  async fetchDeliveries() {
    if (this.deliveries.length > 0) return; // Only fetch once
    
    this.loading = true;
    this.error = null;

    try {
      const response = await baseAPI.get<Delivery[]>('/deliveries/');
      this.deliveries = response.data;
      this.loading = false;
    } catch (error) {
      this.error = 'Failed to fetch deliveries';
      this.loading = false;
    }
  }

  get filteredDeliveries() {
    return this.deliveries.filter(delivery => {
      // Transport Model filter
      if (deliveryFiltersStore.selectedTransportModel && 
          delivery.transport_model_details?.id !== deliveryFiltersStore.selectedTransportModel) {
        return false;
      }

      // Package Type filter
      if (deliveryFiltersStore.selectedPackageType && 
          delivery.package_type_details?.id !== deliveryFiltersStore.selectedPackageType) {
        return false;
      }

      // Service filter
      if (deliveryFiltersStore.selectedService && 
          !delivery.services_details.some(service => service.id === deliveryFiltersStore.selectedService)) {
        return false;
      }

      // Status filter
      if (deliveryFiltersStore.selectedStatus && 
          delivery.status_details?.id !== deliveryFiltersStore.selectedStatus) {
        return false;
      }

      // Date range filter
      const deliveryDate = new Date(delivery.delivery_time);
      if (deliveryFiltersStore.selectedDateRange[0] && 
          deliveryDate < deliveryFiltersStore.selectedDateRange[0]) {
        return false;
      }
      if (deliveryFiltersStore.selectedDateRange[1] && 
          deliveryDate > deliveryFiltersStore.selectedDateRange[1]) {
        return false;
      }

      return true;
    });
  }

  get deliveriesForChart() {
    const deliveriesByDate = new Map<string, number>();
    
    this.filteredDeliveries.forEach(delivery => {
      const date = format(new Date(delivery.delivery_time), 'yyyy-MM-dd');
      deliveriesByDate.set(date, (deliveriesByDate.get(date) || 0) + 1);
    });

    return Array.from(deliveriesByDate.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  }

  get uniqueServices() {
    const services = new Set<string>();
    this.deliveries.forEach(delivery => {
      delivery.services_details.forEach(service => {
        services.add(service.name);
      });
    });
    return Array.from(services);
  }

  get uniqueCargoTypes() {
    const cargoTypes = new Set<string>();
    this.deliveries.forEach(delivery => {
      if (delivery.cargo_type_details?.name) {
        cargoTypes.add(delivery.cargo_type_details.name);
      }
    });
    return Array.from(cargoTypes);
  }
}

export const deliveryStore = new DeliveryStore(); 