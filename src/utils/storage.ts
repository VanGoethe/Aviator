export const storage = {
  save(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  get(key: any) {
    const data: any = localStorage.getItem(key);
    return JSON.parse(data);
  },
  remove() {
    localStorage.clear();
  },
};
