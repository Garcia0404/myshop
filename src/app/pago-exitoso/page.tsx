'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react'

const Content = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const collectionStatus = searchParams.get('collection_status');
    if (collectionStatus === 'approved') {
      // Limpiar el carrito y añadir a compras de la cuenta
      console.log('Pago exitoso:', Object.fromEntries(searchParams.entries()));
    }
  }, [searchParams]);
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
