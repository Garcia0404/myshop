import { create } from 'zustand';

interface SelectedProduct extends Product {
  talla: string;
}

export interface CartProduct extends SelectedProduct {
  quantity: number;
}

interface CartState {
  cart: CartProduct[];
  addToCart: (product: SelectedProduct) => void;
  removeFromCart: (productId: string, talla: string) => void;
  updateQuantity: (productId: string, talla: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
}

const getInitialCart = () => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

export const useCartStore = create<CartState>((set) => ({
  cart: getInitialCart(),
  addToCart: (product: SelectedProduct) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item.id === product.id && product.talla === item.talla
      );
      if (existingProduct) {
        // Si el producto ya está en el carrito, se aumenta la cantidad
        return {
          cart: state.cart.map((item) =>
            item.id === product.id && item.talla === product.talla
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Si el producto no está en el carrito, se agrega
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),

  removeFromCart: (productId, talla) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => item.id !== productId || item.talla !== talla
      ),
    })),

  updateQuantity: (productId, talla, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.talla === talla ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ cart: [] }),

  getTotal: (): number => {
    const total = useCartStore.getState().cart.reduce((sum, item) => {
      const discountedPrice = item.precio * (1 - item.descuento / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);
    return parseFloat(total.toFixed(2));
  },

  getSubtotal: (): number => {
    const subtotal = useCartStore.getState().cart.reduce((sum, item) => {
      return sum + item.precio * item.quantity;
    }, 0);
    return parseFloat(subtotal.toFixed(2));
  }
}));