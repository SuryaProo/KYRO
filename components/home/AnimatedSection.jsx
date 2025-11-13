import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSection = ({ children }) => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const el = sectionRef.current;
        gsap.fromTo(el.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%', // When the top of the trigger hits 80% of the viewport height
                    end: 'bottom 20%',
                    toggleActions: 'play none none none', // Play the animation once
                }
            }
        );
    }, []);

    return <section ref={sectionRef} className="py-20">{children}</section>;
};

export default AnimatedSection;