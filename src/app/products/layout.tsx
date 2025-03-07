import { Header, SearchWords } from "app/components/Header";
import { Sidebar } from "app/components/Sidebar";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <div className="flex max-lg:flex-col pb-10 pt-4 lg:pt-10 max-w-7xl mx-auto px-4">
          <div className="sm:hidden py-3 border border-white/30 px-2 mb-4 rounded-lg"><SearchWords /></div>
          <Sidebar />
          <section className="flex-1 flex flex-col gap-6">
            {children}
          </section>
        </div>
      </main>
    </>

  );
}