import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BentoDemo } from '@/components/sections/demo';

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-3xl md:text-4xl mb-8"
        >
          Certifications ⤵
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <BentoDemo />
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
