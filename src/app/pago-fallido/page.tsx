import Link from 'next/link';
import React from 'react'

export default function PagoFallido() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Pago Fallido</h1>
      <p className='text-center px-2'>Lo sentimos, hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.</p>
      <Link href={"/cart"} className='text-blue-500 border-b '>Volver a intentarlo</Link>
    </div>
  );
}
