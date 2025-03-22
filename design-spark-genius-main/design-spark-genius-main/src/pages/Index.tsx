
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CTA from '@/components/home/CTA';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* 课程计划 - Course Plan Section */}
        <section id="course-plan" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-3 rounded-full bg-black/5 text-sm font-medium mb-6">
                课程计划
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                完整的军事技能培训课程
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                我们提供系统化的军事技能培训，从基础到进阶，理论与实践相结合
              </p>
            </div>

            <Tabs defaultValue="basic" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="basic">基础技能</TabsTrigger>
                <TabsTrigger value="advanced">进阶培训</TabsTrigger>
                <TabsTrigger value="theory">理论课程</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">基础军事技能培训</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>军事体能训练</AccordionTrigger>
                    <AccordionContent>
                      包括耐力跑、力量训练、障碍训练等基础体能项目，旨在提高学员的身体素质和军事体能水平。训练周期为8周，每周3次，每次2小时。
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>战术动作训练</AccordionTrigger>
                    <AccordionContent>
                      学习基本的战术动作，包括匍匐前进、快速卧倒、战术转移等，培养学员的战场生存技能和战术意识。训练周期为4周，每周2次，每次3小时。
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>军事地形识别</AccordionTrigger>
                    <AccordionContent>
                      学习辨别地形图、使用指北针、测距等野外生存技能，提高学员在复杂地形环境下的定向和导航能力。训练周期为3周，每周2次，每次4小时。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              
              <TabsContent value="advanced" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">进阶军事技能培训</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>小队战术训练</AccordionTrigger>
                    <AccordionContent>
                      学习小队级别的战术协同，包括攻防转换、火力配合、战场通信等，提高学员的团队协作能力和战术执行能力。训练周期为6周，每周2次，每次全天。
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>特种作战技能</AccordionTrigger>
                    <AccordionContent>
                      学习特种作战相关技能，包括潜入渗透、近距离格斗、反恐技术等，培养学员的特殊环境作战能力。训练周期为10周，每周3次，每次4小时。
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>城市作战训练</AccordionTrigger>
                    <AccordionContent>
                      学习在城市环境下的作战技巧，包括室内清剿、巷战技术、建筑物攻防等，提高学员在复杂城市环境中的作战能力。训练周期为8周，每周2次，每次6小时。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              
              <TabsContent value="theory" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">军事理论课程</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>课程名称</TableHead>
                      <TableHead>学时</TableHead>
                      <TableHead>主要内容</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">军事战略概论</TableCell>
                      <TableCell>36学时</TableCell>
                      <TableCell>军事战略的基本概念、发展历程及现代军事战略理论</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">现代战争形态分析</TableCell>
                      <TableCell>48学时</TableCell>
                      <TableCell>信息化战争特点、混合战争模式、未来战争发展趋势</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">军事心理学</TableCell>
                      <TableCell>32学时</TableCell>
                      <TableCell>战场心理压力应对、团队凝聚力建设、军事领导力心理基础</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">国防法规与军事伦理</TableCell>
                      <TableCell>24学时</TableCell>
                      <TableCell>国防法律体系、军人行为规范、战争伦理与国际人道法</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">军事科技与武器装备</TableCell>
                      <TableCell>40学时</TableCell>
                      <TableCell>现代武器装备原理、军事科技发展趋势、国防科技创新</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
