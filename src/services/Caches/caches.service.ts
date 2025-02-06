import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachesService {

  private cache: { [key: string]: any } = {};

  set(key: string, value: any): void {
    this.cache[key] = value;
  }

  get(key: string): any {
    return this.cache[key];
  }

  clear(key: string): void {
    delete this.cache[key];
  }

  clearAll(): void {
    this.cache = {};
  }

  constructor() { }
}
