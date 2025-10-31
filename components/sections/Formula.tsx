'use client';

import { motion } from 'framer-motion';

const nutrients = [
  { name: 'Vitamin C', form: 'as Ascorbic Acid', amount: '2,000 mg', dv: '3,266%' },
  { name: 'Riboflavin', form: 'Vitamin B2 as Riboflavin-5-Phosphate', amount: '25 mg', dv: '1,389%' },
  { name: 'Vitamin B6', form: 'as Pyridoxal-5-Phosphate', amount: '25 mg', dv: '1,470%' },
  { name: 'Folate', form: 'as Quatrefolic®', amount: '330 mcg DFE', dv: '200%' },
  { name: 'Vitamin B12', form: 'as Methylcobalamin', amount: '1,000 mcg', dv: '41,667%' },
  { name: 'Magnesium', form: 'as Magnesium Glycinate', amount: '200 mg', dv: '48%' },
  { name: 'Selenium', form: 'as Selenomethionine', amount: '200 mcg', dv: '364%' },
];

export default function Formula() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal tracking-tight leading-tight">
            Complete Replenishment<br />in Three Tablets
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-xl p-8 md:p-12 lg:p-16"
        >
          <div className="space-y-1">
            {nutrients.map((nutrient, index) => (
              <motion.div
                key={nutrient.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 py-4 border-b border-charcoal/10 last:border-b-0"
              >
                <div className="md:col-span-4 font-[family-name:var(--font-body)] font-semibold text-charcoal text-base md:text-lg">
                  {nutrient.name}
                </div>
                <div className="md:col-span-4 font-[family-name:var(--font-body)] text-charcoal/60 text-sm md:text-base italic">
                  {nutrient.form}
                </div>
                <div className="md:col-span-2 font-[family-name:var(--font-mono)] text-charcoal text-base md:text-lg text-right">
                  {nutrient.amount}
                </div>
                <div className="md:col-span-2 font-[family-name:var(--font-mono)] text-royal-blue font-medium text-base md:text-lg text-right">
                  {nutrient.dv} DV
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t-2 border-charcoal/20 text-center">
            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-charcoal/70">
              <span className="font-semibold">90 Tablets</span> | <span className="font-semibold">30 Servings</span> | Serving Size: <span className="font-semibold">3 Tablets</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
