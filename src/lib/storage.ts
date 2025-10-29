import localforage from 'localforage';

const store = localforage.createInstance({
  name: 'EmotionManagementTool',
  version: 1.0,
  storeName: 'userData',
});

export const storage = {
  async get<T>(key: string): Promise<T | null> {
    try {
      return await store.getItem<T>(key);
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await store.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await store.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  },

  async clear(): Promise<void> {
    try {
      await store.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  async exportData(): Promise<string> {
    const data: Record<string, any> = {};
    await store.iterate((value, key) => {
      data[key] = value;
    });
    return JSON.stringify(data, null, 2);
  },

  async importData(jsonString: string): Promise<void> {
    try {
      const data = JSON.parse(jsonString);
      for (const [key, value] of Object.entries(data)) {
        await store.setItem(key, value);
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Invalid data format');
    }
  },
};
