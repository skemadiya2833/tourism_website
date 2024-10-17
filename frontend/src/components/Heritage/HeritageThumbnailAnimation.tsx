import { useEffect, useRef, useState } from 'react';
interface AnimatedSection {
    name?: string;
    thumbnail?: string;
}

const AnimatedSection: React.FC<AnimatedSection> = ({ name, thumbnail }) => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, 100); 

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            clearTimeout(timeoutId);
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            id="app"
            className="grid grid-cols-1 md:grid-cols-2 items-center pb-[4vmin] h-[90vh] w-full bg-[#ede8e2] text-[#3a3535] px-6 md:px-12"
        >
            <div className="title md:pl-4 col-span-1 row-start-1 z-10 text-[8vw] font-[Prata]">
                <div className="title-inner inline-block">
                    <div
                        className={`cafe ${isVisible ? 'animate-[outer-left_1s_cubic-bezier(.5,0,.1,1)_1s_both]' : ''}`}
                    >
                        <div
                            className={`cafe-inner inline-block ${
                                isVisible ? 'animate-[inner-left_1s_ease_1s_both,text-clip_1s_cubic-bezier(.5,0,.1,1)_0s_both]' : ''
                            }`}
                        >
                            {name}
                        </div>
                    </div>

                    <div
                        className={`mozart ${isVisible ? 'animate-[outer-left_1s_cubic-bezier(.5,0,.1,1)_1s_both]' : ''}`}
                    >
                        <div
                            className={`mozart-inner ${
                                isVisible ? 'animate-[text-clip_1s_cubic-bezier(.5,0,.1,1)_0s_both]' : ''
                            }`}
                        >
                            
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`image grid-row-1 col-start-1 md:col-start-2 mt-8 md:mt-0 opacity-90 ${
                    isVisible ? 'animate-[image-in_1s_cubic-bezier(.5,0,.1,1)_2s_backwards]' : ''
                }`}
            >
                <img
                    src={thumbnail}
                    alt="Art Image"
                    className="block w-full h-auto rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default AnimatedSection;
