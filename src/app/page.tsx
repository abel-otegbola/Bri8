'use client'

import ProductCard from "@/components/cards/productCard";
import Slider from "@/components/slider/slider";
import { gadgets } from "@/data/products";

export default function Home() {
  
  return (
    <main>

      <Slider />

      <section className="md:px-[8%] px-4 py-[20px]">
        <h1 className="md:text-[64px] w-[70%] text-[32px] font-bold py-6">HIGH QUALITY GADGETS</h1>

        <div className="columns-2 gap-6">
          <div className="md:h-[350px] h-[250px] rounded-[20px] mb-6 bg-slate-200 break-inside-avoid bg-[url('/iphone5.png')] bg-cover bg-center">

          </div>
          <div className="md:h-[350px] h-[250px] rounded-[20px] mb-6 bg-slate-200 break-inside-avoid bg-[url('/macbook.png')] bg-cover bg-center">

          </div>
          <div className="md:h-[400px] h-[300px] rounded-[20px] mb-6 bg-slate-200 break-inside-avoid bg-[url('/Smartwatch-new.png')] bg-cover bg-center">

          </div>
          <div className="md:h-[300px] h-[200px] rounded-[20px] mb-6 bg-slate-200 break-inside-avoid bg-[url('/powerbank.png')] bg-cover bg-center">

          </div>
        </div>

      </section>

      <section className="md:p-[8%] p-4 py-[20px]">
          <div className="md:h-[350px] h-[250px] w-full rounded-[20px] bg-slate-200 break-inside-avoid bg-[url('/bg1.png')] bg-cover bg-top">

          </div>
      </section>

      <section className="md:px-[8%] px-4 py-[20px] grid md:grid-cols-4 grid-cols-2 gap-4">
        {
          gadgets.map(gadget => (
            <ProductCard key={gadget.id} product={gadget} />
          ))
        }
      </section>
      
    </main>
  );
}
