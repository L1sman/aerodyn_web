import { makeAutoObservable, runInAction } from 'mobx';
import { baseAPI } from '@/shared/api/base';
import type { LoginCredentials, AuthResponse } from '@/shared/api/types';

class AuthStore {
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login({ username, password }: LoginCredentials) {
    this.loading = true;
    this.error = null;

    try {
      const response = await baseAPI.post<AuthResponse>('/token/', { username, password });
      runInAction(() => {
        localStorage.setItem('token', response.data.access);
        if (response.data.refresh) {
          localStorage.setItem('refresh_token', response.data.refresh);
        }
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Invalid username or password';
        this.loading = false;
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }

  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export const authStore = new AuthStore(); 