// PaymentButton.tsx
'use client'
import { useCartStore } from 'app/hooks/useCartStore';
import { useState } from 'react';

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);
  const { cart } = useCartStore()

  const handlePayment = async () => {
    setLoading(true);
    const items = cart.map(({ nombre, precio, descuento, quantity }) => (
      { title: nombre, price: parseFloat(((1 - descuento / 100) * precio).toFixed(2)), quantity }
    ))
    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const { url } = await response.json();

      window.location.href = url;
    } catch (error) {
      console.error(error);
      alert('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className={`w-full text-center bg-red-600 hover:bg-red-500 ${loading ? 'cursor-wait' : 'cursor-pointer'} py-2 rounded-md mt-6`} onClick={handlePayment} disabled={loading}>
      {loading ? 'Procesando...' : 'Pagar con Mercado Pago'}
    </button>
  );
}