export interface Location {
  id: number;
  location_from: string;
  location_to: string;
  distance_km: string;
}

export interface TransportModel {
  id: number;
  name: string;
}

export interface PackageType {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
  category: string | null;
}

export interface Status {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Delivery {
  id: number;
  transport_number: string;
  technical_condition: string;
  location: Location;
  departure_time: string;
  delivery_time: string;
  travel_time: string;
  description: string;
  media_file: string | null;
  logfile: string | null;
  collector_name: string;
  collector_surname: string;
  collector_lastname: string;
  is_processed: boolean;
  transport_model_details: TransportModel;
  package_type_details: PackageType;
  services_details: Service[];
  status_details: Status;
  cargo_type_details: any;
  created_by: User;
  created_at: string;
  updated_by: User;
  updated_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh?: string;
}

export interface FilterOptions {
  transportModels: TransportModel[];
  packageTypes: PackageType[];
  services: Service[];
  statuses: Status[];
} 