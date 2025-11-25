/// <reference types="@cloudflare/workers-types" />

interface Env {
  SITE_CONTENT: KVNamespace;
}

type PagesFunction<Env = unknown> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

// Inline default content for Cloudflare Pages Functions (can't use dynamic imports)
const defaultContent = {
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
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const content = await context.env.SITE_CONTENT.get('site_content', 'json');

    return new Response(JSON.stringify(content || defaultContent), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(defaultContent), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const content = await context.request.json();

    // Store the content in KV
    await context.env.SITE_CONTENT.put('site_content', JSON.stringify(content));

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save content' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
