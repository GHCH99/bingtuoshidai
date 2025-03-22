
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation logic
    const animateElements = () => {
      const fadeIns = heroRef.current?.querySelectorAll('.animate-fade-in');
      const slideDowns = heroRef.current?.querySelectorAll('.animate-slide-down');
      
      fadeIns?.forEach((el, i) => {
        (el as HTMLElement).style.opacity = '0';
        setTimeout(() => {
          (el as HTMLElement).style.opacity = '1';
        }, i * 100);
      });
      
      slideDowns?.forEach((el, i) => {
        const element = el as HTMLElement;
        const delay = element.style.animationDelay ? 
          parseFloat(element.style.animationDelay) * 1000 : i * 100;
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, delay);
      });
    };
    
    // Run animation after a short delay
    setTimeout(animateElements, 100);
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative">
        <div className="text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-black/5 text-sm font-medium mb-6 animate-fade-in">
            兵拓时代 - 引领军事技能发展
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-slide-down"
              style={{animationDelay: '0.1s'}}>
            <span className="block">专业军事培训</span>
            <span className="block text-gradient">成就卓越未来</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 animate-slide-down"
             style={{animationDelay: '0.2s'}}>
            兵拓时代致力于为军事爱好者提供全方位的专业培训，从基础训练到战术技能，助您在军事领域不断突破。
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-down" 
               style={{animationDelay: '0.3s'}}>
            <Button size="lg">
              立即报名
            </Button>
            <Button variant="outline" size="lg">
              了解更多
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
