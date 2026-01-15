export interface DiscountCode {
  firm: string;
  code: string;
  discount: string;
  expiry: string;
  link: string;
  description?: string;
  propScore?: number;
  verificationStatus?: 'verified' | 'sponsored' | 'community-favorite' | 'limited-time';
  votes?: {
    gotPaid: number;
    stillWaiting: number;
    failed: number;
  };
}

export const discountCodes: DiscountCode[] = [
  {
    firm: "FTMO",
    code: "CHALLENGE",
    discount: "10%",
    expiry: "2026-12-31",
    link: "https://ftmo.com/en/?affiliates=your-affiliate-id",
    description: "Premium Program - 10% off + €66 fixed discount",
    propScore: 9.2,
    verificationStatus: "verified",
    votes: { gotPaid: 1245, stillWaiting: 123, failed: 42 }
  },
  {
    firm: "FundedNext",
    code: "PROPFIRMS",
    discount: "20%",
    expiry: "2026-12-31",
    link: "https://fundednext.com/?ref=your-affiliate-id",
    description: "120% refund on challenge fees after funding",
    propScore: 8.8,
    verificationStatus: "community-favorite",
    votes: { gotPaid: 987, stillWaiting: 156, failed: 38 }
  },
  {
    firm: "The5%ers",
    code: "5ERS15",
    discount: "15%",
    expiry: "2026-11-30",
    link: "https://the5ers.com/?ref=your-affiliate-id",
    description: "Instant funding program available",
    propScore: 9.0,
    verificationStatus: "sponsored",
    votes: { gotPaid: 756, stillWaiting: 98, failed: 25 }
  },
  {
    firm: "InstantFunding",
    code: "INSTANT18",
    discount: "18%",
    expiry: "2026-12-15",
    link: "https://instantfunding.io/?ref=your-affiliate-id",
    description: "Same-day account activation",
    propScore: 8.7,
    verificationStatus: "verified",
    votes: { gotPaid: 645, stillWaiting: 87, failed: 29 }
  },
  {
    firm: "FundingPips",
    code: "FUNDPIPS20",
    discount: "20%",
    expiry: "2026-12-20",
    link: "https://fundingpips.com/?ref=your-affiliate-id",
    description: "Crypto trading allowed",
    propScore: 8.6,
    verificationStatus: "community-favorite",
    votes: { gotPaid: 534, stillWaiting: 76, failed: 22 }
  },
  {
    firm: "Topstep",
    code: "TOPSTEP15",
    discount: "15%",
    expiry: "2026-11-30",
    link: "https://www.topstep.com/?ref=your-affiliate-id",
    description: "Industry veteran since 2012 - Futures specialist",
    propScore: 9.1,
    verificationStatus: "verified",
    votes: { gotPaid: 1567, stillWaiting: 198, failed: 67 }
  },
  {
    firm: "Apex Trader Funding",
    code: "APEX20",
    discount: "20%",
    expiry: "2026-12-10",
    link: "https://apextraderfunding.com/?ref=your-affiliate-id",
    description: "Futures trading specialists with fast payouts",
    propScore: 8.9,
    verificationStatus: "community-favorite",
    votes: { gotPaid: 903, stillWaiting: 134, failed: 41 }
  },
  {
    firm: "E8 Markets",
    code: "E8SAVE15",
    discount: "15%",
    expiry: "2026-11-25",
    link: "https://e8markets.com/?ref=your-affiliate-id",
    description: "Best profit splits up to 95%",
    propScore: 8.4,
    verificationStatus: "verified",
    votes: { gotPaid: 512, stillWaiting: 89, failed: 34 }
  },
  {
    firm: "MyFundedFutures",
    code: "MYFUTURES10",
    discount: "10%",
    expiry: "2026-12-05",
    link: "https://myfundedfutures.com/?ref=your-affiliate-id",
    description: "Quick payout processing - No weekends hold",
    propScore: 8.2,
    verificationStatus: "verified",
    votes: { gotPaid: 456, stillWaiting: 67, failed: 28 }
  },
  {
    firm: "BrightFunded",
    code: "BRIGHT12",
    discount: "12%",
    expiry: "2026-11-20",
    link: "https://brightfunded.com/?ref=your-affiliate-id",
    description: "No time limits on challenges",
    propScore: 8.5,
    verificationStatus: "verified",
    votes: { gotPaid: 623, stillWaiting: 94, failed: 31 }
  },
  {
    firm: "The Trading Pit",
    code: "TRADINGPIT10",
    discount: "10%",
    expiry: "2026-12-10",
    link: "https://www.thetradingpit.com/?ref=your-affiliate-id",
    description: "Stock trading focused with flexible rules",
    propScore: 8.3,
    verificationStatus: "verified",
    votes: { gotPaid: 498, stillWaiting: 72, failed: 26 }
  },
  {
    firm: "Blue Guardian",
    code: "BLUEGUARD15",
    discount: "15%",
    expiry: "2026-11-25",
    link: "https://www.blueguardian.com/?ref=your-affiliate-id",
    description: "High leverage options up to 1:100",
    propScore: 8.7,
    verificationStatus: "verified",
    votes: { gotPaid: 712, stillWaiting: 103, failed: 37 }
  },
  {
    firm: "For Traders",
    code: "FORTRADERS15",
    discount: "15%",
    expiry: "2026-12-05",
    link: "https://www.fortraders.com/?ref=your-affiliate-id",
    description: "Multiple account sizes from $5k to $200k",
    propScore: 8.4,
    verificationStatus: "verified",
    votes: { gotPaid: 578, stillWaiting: 81, failed: 29 }
  },
  {
    firm: "OFP Funding",
    code: "OFP12",
    discount: "12%",
    expiry: "2026-12-20",
    link: "https://ofpfunding.com/?ref=your-affiliate-id",
    description: "Weekend trading enabled",
    propScore: 8.1,
    verificationStatus: "verified",
    votes: { gotPaid: 445, stillWaiting: 68, failed: 25 }
  },
  {
    firm: "Maven Trading",
    code: "MAVEN6",
    discount: "6%",
    expiry: "2026-12-25",
    link: "https://maventrading.com/?ref=your-affiliate-id",
    description: "Beginner-friendly with mentorship",
    propScore: 7.8,
    verificationStatus: "verified",
    votes: { gotPaid: 312, stillWaiting: 54, failed: 21 }
  },
  {
    firm: "Prop Firm Capital",
    code: "PROPCAP15",
    discount: "15%",
    expiry: "2026-11-30",
    link: "https://propfirmcapital.com/?ref=your-affiliate-id",
    description: "Multiple funding options with scaling plan",
    propScore: 8.4,
    verificationStatus: "verified",
    votes: { gotPaid: 567, stillWaiting: 79, failed: 28 }
  },
  {
    firm: "Take Profit Trader",
    code: "TPT12",
    discount: "12%",
    expiry: "2026-11-28",
    link: "https://takeprofittrader.com/?ref=your-affiliate-id",
    description: "Scalping friendly - No trade restrictions",
    propScore: 8.3,
    verificationStatus: "verified",
    votes: { gotPaid: 489, stillWaiting: 71, failed: 27 }
  },
  {
    firm: "Blueberry Funded",
    code: "BLUEBERRY12",
    discount: "12%",
    expiry: "2026-11-15",
    link: "https://blueberryfunded.com/?ref=your-affiliate-id",
    description: "Low minimum trading days requirement",
    propScore: 8.2,
    verificationStatus: "verified",
    votes: { gotPaid: 423, stillWaiting: 64, failed: 24 }
  },
  {
    firm: "Goat Funded Trader",
    code: "GOAT20",
    discount: "20%",
    expiry: "2026-12-10",
    link: "https://goatfundedtrader.com/?ref=your-affiliate-id",
    description: "Up to 90% profit split",
    propScore: 9.3,
    verificationStatus: "community-favorite",
    votes: { gotPaid: 1034, stillWaiting: 142, failed: 48 }
  },
  {
    firm: "Trade The Pool",
    code: "TRADEPOOL15",
    discount: "15%",
    expiry: "2026-12-08",
    link: "https://tradethepool.com/?ref=your-affiliate-id",
    description: "Stock trading focused - S&P 500 specialist",
    propScore: 7.9,
    verificationStatus: "verified",
    votes: { gotPaid: 376, stillWaiting: 58, failed: 23 }
  }
];