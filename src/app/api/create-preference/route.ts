import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";
type BoughtProduct = {
  title: string;
  price: number;
  quantity: number;
};
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: items.map((item: BoughtProduct) => ({
          title: item.title,
          unit_price: item.price,
          quantity: item.quantity,
        })),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/pago-exitoso`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/pago-fallido`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pago-pendiente`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ url: response.init_point }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear la preferencia de pago" },
      { status: 500 }
    );
  }
}
