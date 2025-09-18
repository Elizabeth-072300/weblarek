import { ICartItem, IProduct } from '../../../types';

export class Cart {
  private items: ICartItem[] = [];

  getItems(): ICartItem[] {
    return this.items;
  }

  addItem(product: IProduct): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  clear(): void {
    this.items = [];
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      return total + (item.product.price || 0) * item.quantity;
    }, 0);
  }

  getTotalCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  hasItem(productId: string): boolean {
    return this.items.some(item => item.product.id === productId);
  }
}