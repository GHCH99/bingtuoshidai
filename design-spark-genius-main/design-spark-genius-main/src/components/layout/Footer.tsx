
import React from 'react';
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="text-2xl font-display font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
                兵拓时代
              </span>
            </a>
            <p className="mt-4 text-gray-400 text-sm">
              我们是一群为国防教育添砖加瓦的热血青年。
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider text-gray-400">产品</h3>
            <ul className="space-y-3">
              <FooterLink href="#features">特色</FooterLink>
              <FooterLink href="#pricing">价格</FooterLink>
              <FooterLink href="#testimonials">评价</FooterLink>
              <FooterLink href="#faq">常见问题</FooterLink>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider text-gray-400">公司</h3>
            <ul className="space-y-3">
              <FooterLink href="https://mp.weixin.qq.com/s/OUC8itGlbrtfQ-zbuZ9eFw">关于我们</FooterLink>
              <FooterLink href="https://mp.weixin.qq.com/s/E-ScgSbsNkignXUc73KtQA">招贤纳士</FooterLink>
              <FooterLink href="https://mp.weixin.qq.com/s/LcwEUrpJyEuliWPKYXQRDg">新闻动态</FooterLink>
              <FooterLink href="#contact">联系我们</FooterLink>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider text-gray-400">法律</h3>
            <ul className="space-y-3">
              <FooterLink href="#privacy">隐私政策</FooterLink>
              <FooterLink href="#terms">服务条款</FooterLink>
              <FooterLink href="#security">安全说明</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 兵拓时代. 保留所有权利。
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <SocialLink href="https://www.zufedfc.edu.cn/">友情链接  |  浙江财经大学东方学院</SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <a
        href={href}
        className="text-gray-400 hover:text-white transition-colors duration-200"
      >
        {children}
      </a>
    </li>
  );
};

const SocialLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
    >
      {children}
    </a>
  );
};

export default Footer;
