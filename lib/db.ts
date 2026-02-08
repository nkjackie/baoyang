import { Model } from '../types';
import { models as seedData } from '../data';

const DB_KEY = 'baoleme_models_v1';

export const db = {
  getAll: (): Model[] => {
    try {
      const localData = localStorage.getItem(DB_KEY);
      if (!localData) {
        // Initialize with seed data if empty
        localStorage.setItem(DB_KEY, JSON.stringify(seedData));
        return seedData;
      }
      return JSON.parse(localData);
    } catch (e) {
      console.error('Database Error:', e);
      return seedData;
    }
  },

  getById: (id: string): Model | undefined => {
    const models = db.getAll();
    return models.find(m => m.id === id);
  },

  add: (model: Model) => {
    const models = db.getAll();
    // Prepend to list so new ones show first
    const newModels = [model, ...models]; 
    localStorage.setItem(DB_KEY, JSON.stringify(newModels));
  },

  update: (id: string, updatedData: Partial<Model>) => {
    const models = db.getAll();
    const index = models.findIndex(m => m.id === id);
    if (index !== -1) {
      models[index] = { ...models[index], ...updatedData };
      localStorage.setItem(DB_KEY, JSON.stringify(models));
    }
  },

  delete: (id: string) => {
    const models = db.getAll();
    const newModels = models.filter(m => m.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(newModels));
  },

  reset: () => {
    localStorage.removeItem(DB_KEY);
    window.location.reload();
  }
};