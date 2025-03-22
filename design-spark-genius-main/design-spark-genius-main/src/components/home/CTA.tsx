
import React from 'react';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="glass-morphism rounded-2xl py-16 px-8 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
            准备好提升您的军事素养了吗？
          </h2>
          
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            加入我们不断壮大的军事技能培训社群，与志同道合的伙伴一起学习和成长。
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              现在报名
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
            >
              预约体验课
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
