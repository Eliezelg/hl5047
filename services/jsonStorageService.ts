import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export class JsonStorageService {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = join(process.cwd(), 'data', `${fileName}.json`);
  }

  private async readData<T>(): Promise<T[]> {
    try {
      const data = await readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si le fichier n'existe pas ou est invalide, retourner un tableau vide
      return [];
    }
  }

  private async writeData<T>(data: T[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getAll<T>(): Promise<T[]> {
    return this.readData<T>();
  }

  async getById<T>(id: string): Promise<T | null> {
    const items = await this.readData<T>();
    return (items as any[]).find(item => item.id === id) || null;
  }

  async create<T>(item: Omit<T, 'id'>): Promise<T> {
    const items = await this.readData<T>();
    const newItem = { ...item, id: uuidv4() } as T;
    items.push(newItem);
    await this.writeData(items);
    return newItem;
  }

  async update<T>(id: string, item: Partial<T>): Promise<T | null> {
    const items = await this.readData<T>();
    const index = (items as any[]).findIndex(i => i.id === id);
    if (index === -1) return null;

    const updatedItem = { ...(items[index] as any), ...item };
    items[index] = updatedItem;
    await this.writeData(items);
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    const items = await this.readData();
    const index = (items as any[]).findIndex(i => i.id === id);
    if (index === -1) return false;

    items.splice(index, 1);
    await this.writeData(items);
    return true;
  }
}
