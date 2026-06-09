'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Palette, Layout, Code2, Sparkles, Github, CheckCircle2, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <main className="max-w-7xl mx-auto px-6 mt-20 md:mt-32">
        {/* Hero Section */}
        <section className="text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Modern & Responsive Project
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance max-w-4xl leading-[1.1]"
          >
            Crafting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900 dark:from-zinc-400 dark:to-white">Next Generation</span> of Web Experiences.
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl text-balance"
          >
            Your Asuma Labs template is now upgraded with smooth Framer Motion animations, deeply customizable Tailwind CSS styling, and a seamless Dark Mode experience.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button className="h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 group">
              Start Building 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://github.com/asuma-labs/Next.js/tree/main" 
              target="_blank" 
              rel="noreferrer"
              className="h-12 px-8 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center"
            >
              View Repository
            </a>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section className="mt-32 md:mt-48 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight">Core Features</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">Everything you need to build professional apps faster.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              delay={0}
              icon={<Palette className="w-6 h-6 text-zinc-900 dark:text-white" />}
              title="Dark Mode Support"
              description="A polished, professional dark theme built right in. Keeps it comfortable for users in any environment."
            />
            <FeatureCard 
              delay={0.1}
              icon={<Zap className="w-6 h-6 text-zinc-900 dark:text-white" />}
              title="Modern Styling"
              description="Leverage Tailwind CSS utility classes to rapidly design fully custom layouts without writing traditional CSS."
            />
            <FeatureCard 
              delay={0.2}
              icon={<Layout className="w-6 h-6 text-zinc-900 dark:text-white" />}
              title="Responsive Design"
              description="Built to look incredible on mobile, tablet, and desktop monitors alike. Try resizing the window."
            />
            <FeatureCard 
              delay={0.3}
              icon={<Sparkles className="w-6 h-6 text-zinc-900 dark:text-white" />}
              title="Smooth Animations"
              description="Integrated Framer Motion setup makes entrance animations, hover states, and staggering incredibly simple."
            />
            <FeatureCard 
              delay={0.4}
              icon={<Code2 className="w-6 h-6 text-zinc-900 dark:text-white" />}
              title="Clean TypeScript"
              description="Fully typed components and configuration for robust developer experience and autocompletion."
            />
             <FeatureCard 
              delay={0.5}
              icon={<ArrowRight className="w-6 h-6 text-zinc-900 dark:text-white" />}
              title="Ready to Scale"
              description="A solid Next.js App Router foundation ensures you can expand from one page to a full application seamlessly."
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-20 md:mt-32 pb-20 border-t border-zinc-200 dark:border-zinc-800 pt-20">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight">Built for velocity. <br/><span className="text-zinc-500">Designed for scale.</span></h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Stop configuring tooling and start building your product. This template comes pre-configured with everything you need to build next-generation applications.
              </p>
              <ul className="space-y-4">
                {[
                  "Next.js App Router & Server Components",
                  "Tailwind CSS v4 & PostCSS",
                  "Framer Motion for fluid interactions",
                  "Lucide React Icons pre-installed",
                  "System-aware Dark Mode"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1 relative w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-500/10 to-zinc-900/10 dark:from-zinc-500/20 dark:to-zinc-100/20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
                <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-2 bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-400 space-y-4">
                  <div>
                    <span className="text-zinc-900 dark:text-zinc-100 font-semibold">git</span> clone https://github.com/asuma-labs/Next.js.git
                  </div>
                  <div>
                    <span className="text-zinc-900 dark:text-zinc-100 font-semibold">cd</span> Next.js
                  </div>
                  <div>
                    <span className="text-zinc-900 dark:text-zinc-100 font-semibold">npm</span> install
                  </div>
                  <div>
                    <span className="text-zinc-900 dark:text-zinc-100 font-semibold">npm</span> run dev
                  </div>
                  <div className="text-green-600 dark:text-green-400 pt-4">
                    ready - started server on 0.0.0.0:3000, url: http://localhost:3000
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 md:mt-32 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-zinc-900 dark:bg-zinc-900 text-white overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/gradient/1920/1080')] opacity-10 mix-blend-overlay grayscale" />
            <div className="relative px-8 py-20 md:py-32 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
                Ready to elevate your development workflow?
              </h2>
              <p className="mt-6 text-lg text-zinc-400 max-w-xl">
                Join Asuma Labs and use our powerful Next.js template to build your next big idea faster than ever before.
              </p>
              <button className="mt-10 h-14 px-8 rounded-full bg-white text-zinc-950 font-bold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 group">
                <Rocket className="w-5 h-5" />
                Get Started Now
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                Asuma Labs
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-sm">
                Empowering developers to build incredible web experiences with modern, responsive, and accessible tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Components</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Blog</a></li>
                <li><a href="https://github.com/asuma-labs" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <p>© {new Date().getFullYear()} Asuma Labs. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4"
    >
      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-100 dark:border-zinc-700">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
