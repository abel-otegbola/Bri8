'use client'
import { useEffect, useState } from "react"
import Button from "../button/button"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

export default function Slider() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const images = [
        { id: 0, src: "/bg1.png" },
        { id: 1, src: "/bg3-new.png" },
        { id: 2, src: "/bg2.png" },
    ]

    const states = [
        "w-[6%] left-0 scale-75 bg-left",
        "w-[82%] left-[9%] scale-100 bg-center",
        "w-[6%] right-0 scale-75 bg-left"
    ]

    const prevSlide = (): void => {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        // Start interval for automatic slide change if not hovered
        if (!isHovered) {
          const interval = setInterval(() => {
            nextSlide();
          }, 3000);
    
          // Cleanup the interval on component unmount
          return () => {
            clearInterval(interval);
          };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHovered]);

    const handleMouseOver = (): void => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = (): void => {
        setIsHovered(false);
    };
    
    return (
        <div className="relative flex items-center justify-center md:w-[86%] w-[94%] mx-auto mt-4 overflow-hidden">
            <div className="flex gap-[3%] md:h-[460px] h-[300px]">
                <div  
                    className={`absolute top-0 md:h-[400px] h-[230px] ${states[currentIndex]} duration-700 rounded-[20px] bg-cover bg-center bg-no-repeat transition-all ease-in-out cursor-pointer`}
                    style={{ backgroundImage: `url("${images[0]?.src}")` }}
                >
                </div>
                <div
                    className={`absolute top-0 md:h-[400px] h-[230px] ${states[currentIndex === 2 ? 0 : currentIndex + 1]} duration-700 rounded-[20px] bg-cover bg-center bg-no-repeat transition-all ease-in-out cursor-pointer`}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    style={{ backgroundImage: `url("${images[1]?.src}")` }}
                >
                </div>
                <div
                    className={`absolute top-0 md:h-[400px] h-[230px] ${states[currentIndex === 1 ? 0 : currentIndex === 2 ? 1 : currentIndex + 2]} duration-700 rounded-[20px] bg-cover bg-no-repeat bg-center transition-all ease-in-out cursor-pointer`}
                    style={{ backgroundImage: `url("${images[2]?.src}")` }}
                >
                </div>
            </div>

            <div className="absolute bottom-0 flex p-2 gap-1 bg-white/[0.9] dark:bg-black/[0.8] backdrop-blur-sm border border-gray-500/[0.05] rounded-full">
            <Button variant="tetiary" onClick={prevSlide} className=" px-0 border-none text-dark/[0.4] dark:text-white/[0.7] bg-transparent hover:bg-transparent"><CaretLeft /></Button>
                <div className="flex justify-center mt-4">
                {
                images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 mx-1 ${
                        index === currentIndex
                            ? "bg-primary rounded-[20px]"
                            : "bg-gray-300 rounded-[20px]"
                        } transition-all duration-500 ease-in-out`}
                    ></div>
                ))}
            </div>
            <Button variant="tetiary" onClick={nextSlide} className="px-0 border-none text-dark/[0.4] dark:text-white/[0.7] bg-transparent hover:bg-transparent"><CaretRight /></Button>
      </div>
      </div>
    )
}