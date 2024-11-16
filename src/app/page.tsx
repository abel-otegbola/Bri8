'use client'

import ProductCard from "@/components/cards/productCard";
import Slider from "@/components/slider/slider";
import { gadgets } from "@/data/products";

export default function Home() {
  
  return (
    <main>

      <Slider images={[
        { id: "0", src: "/bg1.png" },
        { id: "1", src: "/bg3-new.png" },
        { id: "2", src: "/bg2.png" }
      ]} />

      <section className="md:px-[8%] px-4 py-[20px]">
        <h1 className="md:text-[64px] w-[70%] text-[32px] font-bold py-6">HIGH QUALITY GADGETS</h1>

        <div className="md:columns-3 columns-2 gap-6">
          <div className="md:h-[400px] h-[250px] rounded-[20px] mb-6 bg-slate-200 break-inside-avoid bg-[url('/iphone5.png')] bg-cover bg-center">

          </div>
          <div className="md:h-[600px] h-[300px] rounded-[20px] mb-6 bg-slate-200 break-inside-avoid bg-[url('/Smartwatch-new.png')] bg-cover bg-center">

          </div>
          <div className="md:h-[250px] h-[200px] rounded-[20px] mb-6 bg-slate-200 break-inside-avoid bg-[url('/powerbank.png')] bg-cover bg-center">

          </div>
          <div className="md:h-[350px] h-[350px] rounded-[20px] mb-6 bg-slate-200 break-inside-avoid bg-[url('/macbook.png')] bg-cover bg-center">

          </div>
        </div>

      </section>

      <section className="md:p-[8%] p-4 mb-[60px] py-[20px]">
          <div className="flex flex-wrap justify-center items-end md:h-[450px] h-[350px] w-full rounded-[20px] bg-slate-200 break-inside-avoid bg-[url('/bg4.png')] bg-fixed bg-cover bg-center">
            <h2 className="md:w-[30%] w-[70%] -mb-[30px] backdrop-blur-sm bg-white/[0.8] dark:bg-dark/[0.8] p-4 px-8 rounded-lg text-center">Design Your Dream Workspace with our Stunning Gadgets</h2>
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
