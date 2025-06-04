import { makeAutoObservable, computed } from 'mobx';
import { baseAPI } from '@/shared/api/base';
import type { TransportModel, PackageType, Service, Status, FilterOptions } from '@/shared/api/types';

class DeliveryFiltersStore {
  transportModels: TransportModel[] = [];
  packageTypes: PackageType[] = [];
  services: Service[] = [];
  statuses: Status[] = [];
  loading = false;
  error: string | null = null;

  // Selected filter values
  selectedTransportModel: number | null = null;
  selectedPackageType: number | null = null;
  selectedService: number | null = null;
  selectedStatus: number | null = null;
  selectedDateRange: [Date | null, Date | null] = [null, null];

  constructor() {
    makeAutoObservable(this, {
      filterOptions: computed,
      hasActiveFilters: computed,
      mappedTransportModels: computed,
      mappedPackageTypes: computed,
      mappedServices: computed,
      mappedStatuses: computed
    });
  }

  async fetchFilterOptions() {
    if (this.transportModels.length > 0) return; // Don't fetch if we already have data
    
    this.loading = true;
    this.error = null;

    try {
      const [
        transportModelsResponse,
        packageTypesResponse,
        servicesResponse,
        statusesResponse
      ] = await Promise.all([
        baseAPI.get<TransportModel[]>('/transport-models/'),
        baseAPI.get<PackageType[]>('/package-types/'),
        baseAPI.get<Service[]>('/services/'),
        baseAPI.get<Status[]>('/delivery-statuses/')
      ]);

      this.transportModels = transportModelsResponse.data;
      this.packageTypes = packageTypesResponse.data;
      this.services = servicesResponse.data;
      this.statuses = statusesResponse.data;
      this.loading = false;
    } catch (error) {
      this.error = 'Failed to load filter options';
      this.loading = false;
    }
  }

  // Computed values for mapped data to prevent unnecessary transformations
  get mappedTransportModels() {
    return this.transportModels.map(model => ({
      value: String(model.id),
      label: model.name
    }));
  }

  get mappedPackageTypes() {
    return this.packageTypes.map(type => ({
      value: String(type.id),
      label: type.name
    }));
  }

  get mappedServices() {
    return this.services.map(service => ({
      value: String(service.id),
      label: service.name
    }));
  }

  get mappedStatuses() {
    return this.statuses.map(status => ({
      value: String(status.id),
      label: status.name
    }));
  }

  setTransportModel(id: number | null) {
    this.selectedTransportModel = id;
  }

  setPackageType(id: number | null) {
    this.selectedPackageType = id;
  }

  setService(id: number | null) {
    this.selectedService = id;
  }

  setStatus(id: number | null) {
    this.selectedStatus = id;
  }

  setDateRange(range: [Date | null, Date | null]) {
    this.selectedDateRange = range;
  }

  resetFilters() {
    this.selectedTransportModel = null;
    this.selectedPackageType = null;
    this.selectedService = null;
    this.selectedStatus = null;
    this.selectedDateRange = [null, null];
  }

  get filterOptions(): FilterOptions {
    return {
      transportModels: this.transportModels,
      packageTypes: this.packageTypes,
      services: this.services,
      statuses: this.statuses
    };
  }

  get hasActiveFilters(): boolean {
    return !!(
      this.selectedTransportModel ||
      this.selectedPackageType ||
      this.selectedService ||
      this.selectedStatus ||
      this.selectedDateRange[0] ||
      this.selectedDateRange[1]
    );
  }
}

export const deliveryFiltersStore = new DeliveryFiltersStore(); 