
import React, { useRef, useEffect } from 'react';
import { Shield, Target, Compass, Users, Sword, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: "基础军事训练",
    description: "包括体能训练、队列训练、战术动作等基础军事技能。",
    delay: 0,
    icon: Shield,
    color: "text-blue-500",
  },
  {
    title: "武器装备知识",
    description: "学习常见武器装备的原理、性能及基本操作技能。",
    delay: 100,
    icon: Sword,
    color: "text-red-500",
  },
  {
    title: "战场生存技能",
    description: "野外生存、战场急救、隐蔽与伪装等关键生存技能训练。",
    delay: 200,
    icon: Target,
    color: "text-green-500",
  },
  {
    title: "战术协同配合",
    description: "小队战术动作、协同作战能力和战场通信技能培训。",
    delay: 300,
    icon: Users,
    color: "text-purple-500",
  },
  {
    title: "军事地形识别",
    description: "学习地图阅读、地形判断和野外定向导航技能。",
    delay: 400,
    icon: Compass,
    color: "text-amber-500",
  },
  {
    title: "军事理论基础",
    description: "现代战争形态、军事战略与战术理论专业知识讲解。",
    delay: 500,
    icon: BookOpen,
    color: "text-sky-500",
  },
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.remove('translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach((element) => {
      observer.observe(element);
    });
    
    return () => {
      featureElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section 
      id="features" 
      ref={featuresRef}
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <Badge className="mb-6" variant="outline">
            兵拓特色
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            专业军事培训体系
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            兵拓时代为您提供全面系统的军事技能培训体系，从理论到实践，助您全面提升军事素养。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div 
                key={index}
                className="feature-card opacity-0 translate-y-10 transition-all duration-500"
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <Card className="h-full border-t-4 hover:shadow-md transition-all" style={{ borderTopColor: `var(--${feature.color.split('-')[1]}-${feature.color.split('-')[2]})` }}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color.replace('text', 'bg')}/10`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="p-0 h-auto font-normal text-primary hover:text-primary/80">
                      了解更多 →
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
