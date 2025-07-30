import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export class ServerStorageService {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(DATA_DIR, `${fileName}.json`);
  }

  private async ensureFile() {
    try {
      // First ensure the data directory exists
      try {
        await fs.access(DATA_DIR);
      } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
      }

      // Then ensure the file exists
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, '[]');
    }
  }

  async getAll<T>(): Promise<T[]> {
    await this.ensureFile();
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  async getById<T>(id: string): Promise<T | null> {
    const items = await this.getAll<T>();
    return (items as any[]).find(item => item.id === id) || null;
  }

  async create<T>(item: T): Promise<T> {
    await this.ensureFile();
    const items = await this.getAll<T>();
    const newItem = { ...item, id: crypto.randomUUID() };
    items.push(newItem);
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
    return newItem;
  }

  async update<T>(id: string, item: Partial<T>): Promise<T | null> {
    await this.ensureFile();
    const items = await this.getAll<T>();
    const index = (items as any[]).findIndex(i => i.id === id);
    if (index === -1) return null;
    
    const updatedItem = { ...(items[index] as any), ...item };
    items[index] = updatedItem;
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    await this.ensureFile();
    const items = await this.getAll<any>();
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return false;

    items.splice(index, 1);
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
    return true;
  }
}
