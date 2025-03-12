'use client'
import { useCartStore } from 'app/hooks/useCartStore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react'

const Content = () => {
  const clearCart = useCartStore((state) => state.clearCart)
  const searchParams = useSearchParams();
  useEffect(() => {
    const collectionStatus = searchParams.get('collection_status');
    if (collectionStatus === 'approved') {
      clearCart()
      console.log('Pago exitoso:', Object.fromEntries(searchParams.entries()));
    }
  }, [searchParams, clearCart]);
  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">¡Pago Exitoso!</h1>
      <p className='text-center text-pretty'>Gracias por tu compra. Tu pago ha sido procesado correctamente.</p>
      <Link href={'/products'} className='text-blue-500 mt-2 border-b'>Seguir comprando</Link>
    </>
  )
}
export default function PagoExitoso() {

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Suspense>
        <Content />
      </Suspense>
    </div>
  );
}
