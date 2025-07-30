'use client';

import crypto from 'crypto';

export class LocalStorageService {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  private getStorage(): Storage {
    if (typeof window === 'undefined') {
      throw new Error('LocalStorage is not available on the server side');
    }
    return window.localStorage;
  }

  async getAll<T>(): Promise<T[]> {
    const storage = this.getStorage();
    const data = storage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  async getById<T>(id: string): Promise<T | null> {
    const items = await this.getAll<T>();
    return (items as any[]).find(item => item.id === id) || null;
  }

  async create<T>(item: T): Promise<T> {
    const items = await this.getAll<T>();
    const newItem = { ...item, id: crypto.randomUUID() };
    items.push(newItem);
    this.getStorage().setItem(this.key, JSON.stringify(items));
    return newItem;
  }

  async update<T>(id: string, item: Partial<T>): Promise<T | null> {
    const items = await this.getAll<T>();
    const index = (items as any[]).findIndex(i => i.id === id);
    if (index === -1) return null;

    const updatedItem = { ...(items[index] as any), ...item };
    items[index] = updatedItem;
    this.getStorage().setItem(this.key, JSON.stringify(items));
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    const items = await this.getAll();
    const index = (items as any[]).findIndex(i => i.id === id);
    if (index === -1) return false;

    items.splice(index, 1);
    this.getStorage().setItem(this.key, JSON.stringify(items));
    return true;
  }
}
