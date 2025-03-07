import { Header } from "app/components/Header";
import { Sidebar } from "app/components/Sidebar";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <div className="flex py-10 max-w-7xl mx-auto px-4">
          <Sidebar />
          <section className="flex-1 flex flex-col gap-6">
            {children}
          </section>
        </div>
      </main>
    </>

  );
}