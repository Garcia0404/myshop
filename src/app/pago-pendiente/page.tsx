import Link from "next/link";

export default function PagoPendiente() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Pago Pendiente</h1>
      <p className="px-2 text-center text-pretty">Tu pago está pendiente. Te notificaremos una vez que se haya completado.</p>
      <Link href={"/products"} className='text-blue-500 border-b '>Volver al menú principal</Link>
    </div>
  );
}