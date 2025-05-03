export interface ModelReview {
  id: string
  author: string
  avatar?: string
  rating: number
  date: string
  comment: string
}

export interface ModelFeature {
  title: string
  description: string
}

export interface TechnicalSpec {
  name: string
  value: string
}

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
}

export interface Model {
  id: string
  title: string
  description: string
  longDescription?: string
  category: string
  rating: number
  users: number
  image: string
  tags: string[]
  price: string
  features?: ModelFeature[]
  technicalSpecs?: TechnicalSpec[]
  pricingTiers?: PricingTier[]
  reviews?: ModelReview[]
  relatedModels?: string[]
  apiExample?: string
}

// Mock data for models
const models: Model[] = [
  {
    id: "1",
    title: "LegalDocAnalyzer Pro",
    description:
      "Specialized model for legal document analysis, contract review, and clause extraction with 98% accuracy on legal terminology.",
    longDescription:
      "LegalDocAnalyzer Pro is a state-of-the-art AI model specifically trained on millions of legal documents, contracts, and case law from multiple jurisdictions. It excels at identifying key clauses, potential risks, and inconsistencies in legal documents, saving legal professionals hundreds of hours in document review time. The model has been validated by top law firms and legal departments at Fortune 500 companies.",
    category: "Legal",
    rating: 4.8,
    users: 1240,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["NLP", "Document Analysis", "Legal"],
    price: "$299/mo",
    features: [
      {
        title: "Advanced Contract Analysis",
        description:
          "Automatically identify and extract key clauses, obligations, rights, and potential risks from any legal document.",
      },
      {
        title: "Multi-jurisdiction Support",
        description:
          "Trained on legal documents from US, UK, EU, and international law, providing broad coverage of legal systems.",
      },
      {
        title: "Compliance Checking",
        description:
          "Automatically flag potential compliance issues against common regulatory frameworks like GDPR, HIPAA, and more.",
      },
      {
        title: "Redlining & Comparison",
        description:
          "Compare multiple versions of documents and highlight substantive changes beyond simple text differences.",
      },
    ],
    technicalSpecs: [
      { name: "Model Architecture", value: "Transformer-based NLP" },
      { name: "Parameters", value: "3.5 billion" },
      { name: "Training Data", value: "12M+ legal documents" },
      { name: "Accuracy", value: "98% on legal terminology" },
      { name: "Languages", value: "English, Spanish, French, German" },
      { name: "API Response Time", value: "<200ms" },
    ],
    pricingTiers: [
      {
        name: "Starter",
        price: "$299/mo",
        description: "Perfect for small law firms and solo practitioners",
        features: ["Up to 500 documents/month", "Basic contract analysis", "Email support", "API access"],
      },
      {
        name: "Professional",
        price: "$699/mo",
        description: "Ideal for mid-size law firms and legal departments",
        features: [
          "Up to 2,000 documents/month",
          "Advanced contract analysis",
          "Compliance checking",
          "Priority support",
          "Custom training options",
        ],
        isPopular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations with complex needs",
        features: [
          "Unlimited documents",
          "Full feature access",
          "Dedicated account manager",
          "Custom model fine-tuning",
          "On-premise deployment options",
          "SLA guarantees",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "David Chen",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023-10-15",
        comment:
          "This model has transformed our contract review process. What used to take days now takes hours, with better accuracy than our junior associates.",
      },
      {
        id: "r2",
        author: "Sarah Williams",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4,
        date: "2023-09-22",
        comment:
          "Excellent for due diligence work. The compliance checking feature has saved us from several potential issues in M&A transactions.",
      },
      {
        id: "r3",
        author: "Michael Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023-11-03",
        comment:
          "We've integrated this into our document management system and it's been a game-changer for our legal department's efficiency.",
      },
    ],
    relatedModels: ["2", "7", "12"],
    apiExample: `
import { ModelaAI } from '@modela/sdk';

// Initialize the client
const modela = new ModelaAI({
  apiKey: process.env.MODELA_API_KEY
});

// Analyze a legal document
const analysis = await modela.analyze({
  modelId: 'legal-doc-analyzer-pro',
  document: fileBuffer,
  options: {
    extractClauses: true,
    identifyRisks: true,
    checkCompliance: ['GDPR', 'CCPA']
  }
});

console.log(analysis.clauses);
console.log(analysis.risks);
console.log(analysis.complianceIssues);
`,
  },
  {
    id: "2",
    title: "FinancialForecastAI",
    description:
      "Predict market trends and financial outcomes with this model trained on 20+ years of financial data across multiple markets.",
    longDescription:
      "FinancialForecastAI is a sophisticated predictive model that leverages historical financial data, market indicators, and macroeconomic factors to forecast market trends with remarkable accuracy. Built on advanced time-series analysis and deep learning techniques, this model has been trained on over two decades of financial data from global markets, making it an invaluable tool for financial analysts, investment firms, and corporate finance departments.",
    category: "Finance",
    rating: 4.7,
    users: 890,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Predictive Analytics", "Finance", "Time Series"],
    price: "$499/mo",
    features: [
      {
        title: "Market Trend Prediction",
        description: "Forecast market movements across stocks, bonds, commodities, and forex with up to 85% accuracy.",
      },
      {
        title: "Risk Assessment",
        description: "Quantify investment risks and simulate various market scenarios to stress-test portfolios.",
      },
      {
        title: "Anomaly Detection",
        description:
          "Identify unusual patterns in financial data that may indicate fraud, errors, or market opportunities.",
      },
      {
        title: "Custom Indicators",
        description:
          "Create and backtest proprietary financial indicators based on your specific investment strategies.",
      },
    ],
    technicalSpecs: [
      { name: "Model Architecture", value: "Hybrid LSTM/Transformer" },
      { name: "Parameters", value: "5.2 billion" },
      { name: "Training Data", value: "20+ years of market data" },
      { name: "Prediction Accuracy", value: "85% for short-term forecasts" },
      { name: "Markets Covered", value: "Global equities, bonds, commodities, forex" },
      { name: "Update Frequency", value: "Daily market data updates" },
    ],
    pricingTiers: [
      {
        name: "Analyst",
        price: "$499/mo",
        description: "For individual financial analysts and small firms",
        features: [
          "Up to 100 predictions/day",
          "Core forecasting features",
          "5 years of historical data",
          "Standard API access",
        ],
      },
      {
        name: "Institutional",
        price: "$1,299/mo",
        description: "For investment firms and financial institutions",
        features: [
          "Up to 1,000 predictions/day",
          "Advanced risk modeling",
          "20+ years of historical data",
          "Priority API access",
          "Custom model training",
        ],
        isPopular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For large financial institutions with complex needs",
        features: [
          "Unlimited predictions",
          "Full feature access",
          "Complete historical database",
          "Dedicated infrastructure",
          "Custom integration support",
          "SLA guarantees",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "Jennifer Lee",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023-11-10",
        comment:
          "The accuracy of this model has significantly improved our trading strategies. The ROI on this subscription has been tremendous.",
      },
      {
        id: "r2",
        author: "Robert Garcia",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4,
        date: "2023-10-05",
        comment:
          "We use this for our quarterly financial planning, and it's helped us anticipate market shifts that would have otherwise caught us off guard.",
      },
      {
        id: "r3",
        author: "Amanda Thompson",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023-09-18",
        comment:
          "The custom indicators feature is a game-changer for our proprietary trading strategies. Worth every penny.",
      },
    ],
    relatedModels: ["1", "4", "8"],
    apiExample: `
import { ModelaAI } from '@modela/sdk';

// Initialize the client
const modela = new ModelaAI({
  apiKey: process.env.MODELA_API_KEY
});

// Generate financial forecast
const forecast = await modela.forecast({
  modelId: 'financial-forecast-ai',
  assets: ['AAPL', 'MSFT', 'GOOGL'],
  timeframe: '3M',
  confidenceInterval: 0.95,
  scenarios: ['baseline', 'bullish', 'bearish']
});

console.log(forecast.predictions);
console.log(forecast.riskMetrics);
console.log(forecast.anomalies);
`,
  },
  {
    id: "3",
    title: "MedicalImageDiagnostic",
    description:
      "Healthcare imaging model that assists in diagnosing conditions from X-rays, MRIs, and CT scans with clinical-grade accuracy.",
    longDescription:
      "MedicalImageDiagnostic is a state-of-the-art AI model designed to assist healthcare professionals in analyzing medical imaging data. Trained on millions of annotated medical images and validated through extensive clinical trials, this model achieves diagnostic accuracy comparable to experienced radiologists. It supports multiple imaging modalities and can identify a wide range of conditions while providing detailed analysis reports.",
    category: "Healthcare",
    rating: 4.9,
    users: 650,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Computer Vision", "Healthcare", "Diagnostics"],
    price: "$599/mo",
    features: [
      {
        title: "Multi-modality Support",
        description: "Process and analyze X-rays, MRIs, CT scans, and ultrasound images with a single API endpoint.",
      },
      {
        title: "Rapid Analysis",
        description: "Get diagnostic suggestions and anomaly detection results in under 500ms per image.",
      },
      {
        title: "Clinical-grade Accuracy",
        description: "92% accuracy rate validated through extensive clinical trials and peer reviews.",
      },
      {
        title: "Detailed Reporting",
        description: "Generate comprehensive reports with highlighted regions of interest and confidence scores.",
      },
    ],
    technicalSpecs: [
      {
        name: "Model Architecture",
        value: "CNN + Vision Transformer",
      },
      {
        name: "Training Dataset",
        value: "10M+ annotated medical images",
      },
      {
        name: "Supported Image Formats",
        value: "DICOM, JPEG, PNG, TIFF",
      },
      {
        name: "Maximum Image Resolution",
        value: "4096 x 4096 pixels",
      },
      {
        name: "Processing Time",
        value: "<500ms per image",
      },
      {
        name: "API Concurrency",
        value: "Up to 100 requests/second",
      },
    ],
    pricingTiers: [
      {
        name: "Basic",
        price: "$599/mo",
        description: "Perfect for small clinics and individual practitioners with moderate imaging needs.",
        features: [
          "Up to 1,000 images/month",
          "Basic reporting",
          "Email support",
          "Standard API access",
        ],
      },
      {
        name: "Professional",
        price: "$1,499/mo",
        description: "Ideal for medium to large healthcare facilities with higher volume requirements.",
        features: [
          "Up to 5,000 images/month",
          "Advanced reporting",
          "Priority support",
          "Advanced API features",
          "Custom integration support",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Tailored solution for large healthcare networks and research institutions.",
        features: [
          "Unlimited images",
          "Custom model training",
          "24/7 dedicated support",
          "Full API access",
          "On-premise deployment option",
          "Custom integration & workflow",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "Dr. Emily Chen",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023-11-15",
        comment:
          "This model has significantly improved our diagnostic workflow. The accuracy and speed are impressive, and it's been particularly helpful in identifying subtle abnormalities that might be missed.",
      },
      {
        id: "r2",
        author: "Dr. James Wilson",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023-10-20",
        comment:
          "The multi-modality support is a game-changer. We use it for both X-rays and CT scans, and the consistency in results has been excellent. The detailed reports save us significant time.",
      },
      {
        id: "r3",
        author: "Dr. Sarah Martinez",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4,
        date: "2023-09-28",
        comment:
          "Very impressed with the accuracy and speed. The only minor drawback is that the API could be more flexible for custom workflows, but the core functionality is excellent.",
      },
    ],
    relatedModels: ["2", "5", "9"],
    apiExample: `
import { ModelaAI } from '@modela/sdk';

// Initialize the client
const modela = new ModelaAI({
  apiKey: process.env.MODELA_API_KEY
});

// Analyze medical image
const analysis = await modela.analyzeImage({
  modelId: 'medical-image-diagnostic',
  image: imageBuffer,
  options: {
    modality: 'xray',
    anatomicalRegion: 'chest',
    includeHeatmap: true,
    generateReport: true
  }
});

console.log(analysis.findings);
console.log(analysis.confidence);
console.log(analysis.reportUrl);
`,
  },
  {
    id: "4",
    title: "RetailDemandPredictor",
    description:
      "Optimize inventory and predict customer demand patterns based on historical sales, seasonality, and market trends.",
    longDescription:
      "RetailDemandPredictor is an advanced AI model designed specifically for retail businesses to optimize their inventory management and demand forecasting. By analyzing historical sales data, seasonal patterns, market trends, and external factors, this model provides highly accurate demand predictions that help businesses reduce stockouts, minimize excess inventory, and maximize revenue. The model has been trained on diverse retail datasets and validated across multiple retail sectors.",
    category: "Retail",
    rating: 4.6,
    users: 780,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Predictive Analytics", "Retail", "Inventory", "Supply Chain"],
    price: "$349/mo",
    features: [
      {
        title: "Demand Forecasting",
        description: "Predict product demand with up to 95% accuracy using advanced time-series analysis and machine learning.",
      },
      {
        title: "Seasonal Pattern Detection",
        description: "Automatically identify and account for seasonal trends and special events that impact demand.",
      },
      {
        title: "Multi-location Support",
        description: "Optimize inventory across multiple stores or warehouses with location-specific demand patterns.",
      },
      {
        title: "Real-time Adjustments",
        description: "Continuously update predictions based on real-time sales data and market conditions.",
      },
    ],
    technicalSpecs: [
      { name: "Model Architecture", value: "Ensemble ML + Deep Learning" },
      { name: "Training Data", value: "5+ years retail data" },
      { name: "Prediction Horizon", value: "Up to 12 months" },
      { name: "Update Frequency", value: "Real-time" },
      { name: "API Response Time", value: "<100ms" },
      { name: "Data Integration", value: "REST API, CSV, EDI" },
    ],
    pricingTiers: [
      {
        name: "Basic",
        price: "$349/mo",
        description: "Perfect for small retail businesses with single location",
        features: [
          "Up to 1,000 SKUs",
          "3-month prediction horizon",
          "Basic reporting",
          "Email support",
          "Standard API access"
        ],
      },
      {
        name: "Professional",
        price: "$899/mo",
        description: "Ideal for growing retailers with multiple locations",
        features: [
          "Up to 10,000 SKUs",
          "6-month prediction horizon",
          "Advanced reporting",
          "Priority support",
          "Advanced API features",
          "Multi-location support"
        ],
        isPopular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For large retail chains and enterprises",
        features: [
          "Unlimited SKUs",
          "12-month prediction horizon",
          "Custom reporting",
          "24/7 dedicated support",
          "Full API access",
          "Custom integration",
          "On-premise deployment"
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "Mark Thompson",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023-11-05",
        comment:
          "This model has revolutionized our inventory management. We've reduced stockouts by 60% and excess inventory by 40% within three months of implementation.",
      },
      {
        id: "r2",
        author: "Lisa Rodriguez",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4,
        date: "2023-10-12",
        comment:
          "The seasonal pattern detection is incredibly accurate. It helped us prepare perfectly for our holiday season rush and special promotions.",
      },
      {
        id: "r3",
        author: "John Baker",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023-09-28",
        comment:
          "Managing multiple store locations is so much easier now. The location-specific demand patterns have helped us optimize our distribution network.",
      },
    ],
    relatedModels: ["2", "1", "3"],
    apiExample: `
import { ModelaAI } from '@modela/sdk';

// Initialize the client
const modela = new ModelaAI({
  apiKey: process.env.MODELA_API_KEY
});

// Generate demand forecast
const forecast = await modela.forecast({
  modelId: 'retail-demand-predictor',
  data: {
    storeId: 'store-123',
    products: ['SKU-001', 'SKU-002', 'SKU-003'],
    horizon: '6M',
    granularity: 'daily',
    includeSeasonality: true,
    includeEvents: true
  }
});

console.log(forecast.predictions);
console.log(forecast.seasonalFactors);
console.log(forecast.confidenceIntervals);
`,
  },
]

export async function getModelById(id: string): Promise<Model | undefined> {
  return models.find((model) => model.id === id)
}

export async function getAllModels(): Promise<Model[]> {
  // Simulate network delay in development to test loading states
  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  return models
}

export async function getRelatedModels(modelIds: string[]): Promise<Model[]> {
  return models.filter((model) => modelIds.includes(model.id))
}
