export interface SiteContent {
  hero: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    proofHeading: string;
    pdfLinkText: string;
    pptxLinkText: string;
    qtyLabel: string;
    priceLabel: string;
    saveText3Plus: string;
    saveText12Plus: string;
    addToCartButtonText: string;
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
  physicianSummary: {
    buttonText: string;
    title: string;
    subtitle: string;
    clinicalProblemTitle: string;
    clinicalProblemP1: string;
    clinicalProblemP2: string;
    clinicalSolutionTitle: string;
    clinicalSolutionP1: string;
    clinicalSolutionP2: string;
    mechanismTitle: string;
    mechanismList: string[];
    whyMattersTitle: string;
    whyMattersList: string[];
    candidatesTitle: string;
    candidatesList: string[];
    differentiatorsTitle: string;
    differentiatorsList: string[];
    takeawayTitle: string;
    takeawayText: string;
    attribution: string;
  };
}

export const defaultContent: SiteContent = {
  hero: {
    title: "What makes Dr. BeeLeez Blend Smoker's Supplement unique?",
    paragraph1: "Tobacco smoking depletes you of specific vitamins, minerals and antioxidants.",
    paragraph2: "Multiple medical studies show that restoring the loss of specific vitamins, minerals and antioxidants gives smokers a fighting chance for a healthier and longer life.",
    paragraph3: "This supplement is a recovery and replenishment system.",
    paragraph4: "Additional studies show a decrease in the number of cigarettes smoked.",
    proofHeading: "See the proof!",
    pdfLinkText: "Endorsement and Complete Abstracts of Nutrient Depletion Studies (PDF)",
    pptxLinkText: "Tobacco Smoking: A New Perspective (PPTX)",
    qtyLabel: "Qty:",
    priceLabel: "Price:",
    saveText3Plus: "Save 10%",
    saveText12Plus: "Save 20%",
    addToCartButtonText: "Add to Shopping Cart",
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
  physicianSummary: {
    buttonText: "Physician's Summary",
    title: "Physician's Summary",
    subtitle: "A Targeted Nutrient Replenishment Strategy for Smoking-Induced Biochemical Depletion",
    clinicalProblemTitle: "Clinical Problem",
    clinicalProblemP1: "Tobacco smoking produces predictable, measurable biochemical injuries, including depletion of antioxidants, micronutrients, and cellular defense systems. Even patients who are unwilling or unable to quit continue to experience progressive oxidative stress, impaired glutathione recycling, mitochondrial dysfunction, and inflammatory burden.",
    clinicalProblemP2: "Traditional cessation-only approaches leave a large patient population biologically unaddressed.",
    clinicalSolutionTitle: "Clinical Solution",
    clinicalSolutionP1: "Dr. BeeLeez Blend – Smoker's Supplement is a patent-protected, clinician-designed recovery and replenishment system that targets the specific nutrient losses and oxidative damage caused by tobacco exposure, independent of cessation status.",
    clinicalSolutionP2: "This is not a quit-smoking product. It is a harm-reduction and cellular restoration strategy.",
    mechanismTitle: "Mechanism of Action",
    mechanismList: [
      "Replenishes smoking-depleted micronutrients",
      "Supports intracellular glutathione synthesis",
      "Restores glutathione recycling capacity",
      "Reduces oxidative stress burden",
      "Supports mitochondrial and cellular resilience",
      "May reduce smoking intensity through improved redox balance",
    ],
    whyMattersTitle: "Why This Matters Clinically",
    whyMattersList: [
      "Many patients cannot or will not quit immediately",
      "Oxidative damage continues even after cessation",
      "Nutrient depletion is rarely addressed in standard care",
      "Harm-reduction strategies expand therapeutic reach",
      "Supports patients during reduction, cessation, or post-cessation phases",
    ],
    candidatesTitle: "Ideal Clinical Candidates",
    candidatesList: [
      "Current smokers unwilling or unable to quit",
      "Patients attempting smoking reduction",
      "Former smokers with persistent fatigue or inflammation",
      "Patients with elevated oxidative stress markers",
      "Individuals seeking preventive, restorative care",
    ],
    differentiatorsTitle: "Clinical Differentiators",
    differentiatorsList: [
      "Patent-protected formulation",
      "Designed specifically for smoking-related depletion",
      "Glutathione-centered mechanism",
      "Evidence-informed and reference-supported",
      "Endorsed by an editor of a laboratory medicine textbook",
      "Non-judgmental, compliance-friendly approach",
    ],
    takeawayTitle: "Clinical Takeaway",
    takeawayText: "Smoking causes predictable biochemical damage. Restoration should not wait for cessation. This protocol allows physicians to treat the biology first, improving resilience, compliance, and long-term outcomes.",
    attribution: "Text courtesy of Mark Gordon, MD",
  },
};
