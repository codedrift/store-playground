export interface Store {
  setup(): Promise<any>;
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<any>;
}
