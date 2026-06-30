// TestimonialSection.tsx
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

function TestimonialCard({
  name, role, content, rating, delay
}: {
  name: string;
  role: string;
  content: string;
  rating: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative p-6 sm:p-7 rounded-3xl border border-zinc-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl shadow-lg shadow-zinc-200/50 dark:shadow-black/20 hover:shadow-2xl hover:shadow-violet-500/15 transition-all duration-300"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">"{content}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white text-xs sm:text-sm">{name}</p>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 border-t border-zinc-200 dark:border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">Testimoni</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
          Apa kata mereka tentang Asuma?
        </h2>
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">Pengalaman nyata dari pengguna yang sudah merasakan manfaatnya.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <TestimonialCard
          delay={0}
          name="Rizky Pratama"
          role="Admin Komunitas Gaming"
          content="Asuma bikin ngurus grup jadi super gampang. Fitur anti-spam dan auto-welcome-nya mantap banget. Recommended!"
          rating={5}
        />
        <TestimonialCard
          delay={0.1}
          name="Sarah Amelia"
          role="Content Creator"
          content="Media downloader-nya cepet banget dan support banyak platform. Gak perlu buka-buka website lagi buat download konten."
          rating={5}
        />
        <TestimonialCard
          delay={0.2}
          name="Budi Santoso"
          role="Pengguna Aktif"
          content="AI assistant-nya beneran berguna. Bisa bantu jawab pertanyaan, translate, bahkan nulis caption. Worth it banget!"
          rating={5}
        />
      </div>
    </section>
  );
}
