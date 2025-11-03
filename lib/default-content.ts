export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    patent: string;
    developer: string;
  };
  problemSolution: {
    problemTitle: string;
    problemDescription: string;
    problemList: string[];
    problemQuote: string;
    problemQuoteAuthor: string;
    solutionTitle: string;
    solutionDescription: string;
    solutionList: string[];
    solutionClosing: string;
  };
  research: {
    title: string;
    subtitle: string;
    highlights: string[];
    highlightsFooter: string;
    downloadsTitle: string;
  };
  purchase: {
    buttonText: string;
    companyName: string;
    address: string;
    phone: string;
    email: string;
    warningTitle: string;
    warningText: string;
    disclaimerText: string;
    copyright: string;
  };
}

export const defaultContent: SiteContent = {
  hero: {
    title: "Dr. Bee Leez Blend",
    subtitle: "Smoker's Supplement™",
    description: "Scientifically Formulated to Replace Vital Nutrients Depleted by Tobacco Smoking",
    patent: "Based on U.S. Patent #8,889,194",
    developer: "Developed by Dr. Harlan Bieley, MD, MS",
  },
  problemSolution: {
    problemTitle: "Tobacco Depletes Your Body",
    problemDescription: "Smoking causes immediate, measurable depletion of critical nutrients:",
    problemList: [
      "Antioxidants (Vitamins C, E)",
      "B-Vitamins (B2, B6, B12, Folate)",
      "Essential Minerals (Magnesium, Selenium)",
    ],
    problemQuote: "Any exposure to tobacco smoke causes immediate damage to your body.",
    problemQuoteAuthor: "U.S. Surgeon General",
    solutionTitle: "Replenishment Works",
    solutionDescription: "100+ peer-reviewed studies demonstrate that replacing these nutrients:",
    solutionList: [
      "Reduces oxidative stress markers by 11-17%",
      "Supports cardiovascular health",
      "Protects lung function",
      "Aids smoking reduction efforts",
    ],
    solutionClosing: "Dr. Bee Leez Blend provides therapeutic doses of every depleted nutrient in one patent-protected formula.",
  },
  research: {
    title: "Science-backed Formulation",
    subtitle: "Based on extensive clinical research:",
    highlights: [
      "500,000+ participant European study: Vitamin B6 levels inversely associated with lung cancer risk",
      "N-Acetylcysteine shown to reduce cigarette consumption in nicotine-dependent individuals",
      "Antioxidant supplementation prevented cardiac hypertrophy in cigarette smoke exposure",
      "Vitamin C markedly improves endothelial function in chronic smokers",
      "High-dose magnesium significantly decreased number of cigarettes smoked",
    ],
    highlightsFooter: "Over 100 peer-reviewed studies support this approach",
    downloadsTitle: "Download the Research",
  },
  purchase: {
    buttonText: "Purchase from Manufacturer",
    companyName: "Dr. Bee Leez Products",
    address: "11380 Prosperity Farms Road, #114\nPalm Beach Gardens, FL 33410",
    phone: "561-842-7422",
    email: "ask@hllmc.com",
    warningTitle: "Important Safety Information",
    warningText: "WARNING: Tobacco smoking can lead to cancer and other health risks. DO NOT use this product as an excuse to start or continue smoking.",
    disclaimerText: "† These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use if you have any medical conditions or take medications.",
    copyright: "© 2019-2025 Harlan Bieley, MD, MS. All Rights Reserved.",
  },
};
