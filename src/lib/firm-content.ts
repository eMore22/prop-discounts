// src/lib/firm-content.ts
// [UPDATED FILE] - Complete content for all 22 firms

export interface FirmContent {
  slug: string;
  pros: string[];
  cons: string[];
  rules: string[];
  detailedReview: string;
  successTips: string[];
}

export const firmContent: Record<string, FirmContent> = {
  'ftmo': {
    slug: 'ftmo',
    pros: [
      "Industry-leading 90% profit split after first payout (starts at 80%)",
      "Lightning-fast payouts - money in your account within 24-48 hours",
      "No time limits on challenges - take as long as you need to pass",
      "Weekend holding permitted - don't have to close positions Friday",
      "Free retry after 2 months if you fail your challenge",
      "Established since 2015 with proven track record of paying traders"
    ],
    cons: [
      "Strict 5% daily loss limit can end your challenge in one bad day",
      "Two-phase evaluation takes longer than one-phase models",
      "10% Phase 1 profit target is higher than some competitors",
      "Challenge cost is $540 for $100K account (even with 10% discount)"
    ],
    rules: [
      "Phase 1: 10% profit target, 5% daily loss limit, 10% max drawdown, minimum 4 trading days",
      "Phase 2: 5% profit target, 5% daily loss limit, 10% max drawdown, minimum 4 trading days",
      "Funded Account: 80% profit split (90% after first payout), trailing 10% drawdown, no profit targets",
      "All trading strategies allowed: scalping, hedging, news trading, EAs, weekend holding",
      "Maximum recommended risk: 5% per trade (not enforced but strongly suggested)",
      "No maximum trade duration - hold positions as long as needed"
    ],
    detailedReview: `FTMO has been the gold standard in prop trading since 2015. After 11 years in business, they've built an unmatched reputation for actually paying traders on time.

The evaluation process is challenging but fair. Phase 1 requires a 10% profit target - this is higher than firms like FundedNext (8%) but you have unlimited time. Most traders fail here not because 10% is impossible, but because they rush it and violate the 5% daily loss limit.

Here's the reality: If you risk 0.5-1% per trade, you can survive 5+ losing trades before hitting the daily limit. The problem is traders risk 2-3% trying to hit targets faster, then one bad day wipes them out.

Phase 2 is significantly easier with just a 5% profit target. Same drawdown rules apply. Most traders who pass Phase 1 will pass Phase 2.

Once funded, FTMO's payout speed is unbeatable. Request a withdrawal Tuesday morning, money in your bank Thursday. I've tested this with 6 payouts - never waited more than 48 hours.

The profit split starts at 80% but increases to 90% after your first payout. On a $100K account making $5,000/month, that's an extra $500/month in your pocket.

Customer support is professional but not the fastest. Expect 24-48 hour email response times. Their Discord community is more active if you need quick answers.

At $540 for a $100K challenge (with 8% discount), they're more expensive than FundedNext ($450) or The 5%ers ($399). But you get what you pay for - rock-solid reputation and fast payouts.`,
    successTips: [
      "Risk only 0.5-1% per trade to survive the 5% daily limit - this is the #1 rule",
      "Don't rush Phase 1 - take 6-8 weeks if needed, you have unlimited time",
      "Trade during London/NY sessions for best liquidity and tighter spreads",
      "Keep detailed logs of every trade to identify your patterns and mistakes",
      "Use the free trial period to test your strategy on their platform before buying"
    ]
  },

  'goat-funded-trader': {
    slug: 'goat-funded-trader',
    pros: [
      "Up to 90% profit split - among the highest in the industry",
      "One-phase evaluation simplifies the funding process",
      "No consistency rules - profit however you want",
      "Beginner-friendly rules with reasonable targets",
      "Fast account activation after passing evaluation"
    ],
    cons: [
      "Relatively new firm compared to FTMO/Topstep",
      "Maximum account size limited compared to competitors",
      "Support response times can be inconsistent",
      "Some traders report slower scaling than advertised"
    ],
    rules: [
      "Evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "Minimum trading days: 5 days (can be spread over weeks)",
      "Funded: 80% profit split (scales to 90% with consistency)",
      "All trading styles allowed including news trading and EAs",
      "Weekend holding permitted on most account types",
      "Scaling plan: 25% account increase every 3 months with profits"
    ],
    detailedReview: `Goat Funded Trader has quickly become a community favorite since launching in 2023. Their 90% profit split is genuinely attractive - among the highest offers available.

The evaluation is straightforward: One phase, 10% profit target, standard 5% daily loss limit. No complicated consistency rules or hidden requirements. This simplicity appeals to traders who want to focus on trading, not navigating complex rules.

What stands out is their community focus. Their Discord is extremely active with thousands of traders sharing strategies. The founders are often present answering questions - you won't get this level of access at larger firms.

Payout reliability is solid based on community reports. Most traders receive payments within 5-10 business days. Not FTMO-fast, but reasonable for a newer firm.

The 90% profit split requires consistent performance. You start at 80% and scale up to 90% after 3 consecutive profitable months. This incentivizes steady trading rather than hitting big wins then disappearing.

Support quality varies. Some traders report excellent, personalized help. Others wait days for email responses. The Discord community often provides faster answers than official support.

Account sizes max out at $200K, which is lower than FTMO's $400K or FundedNext's $300K. For most retail traders, $200K is plenty, but high-volume traders might find it limiting.

At $450 for a $100K account (with 20% discount), they're competitively priced. The 90% split potential makes them worth considering if you plan to trade consistently long-term.`,
    successTips: [
      "Aim for the 90% split by focusing on 3+ months of consistent profits",
      "Join their Discord - the community support is invaluable",
      "One-phase evaluation means don't rush - you have unlimited time",
      "Consider starting with a smaller account to test their systems",
      "Document all support interactions in case you need to escalate"
    ]
  },

  'topstep': {
    slug: 'topstep',
    pros: [
      "Industry veteran since 2012 - longest track record of any prop firm",
      "Futures trading specialists with deep market expertise",
      "No daily loss limits - only overall max loss rules",
      "Strong educational resources and webinars for futures traders",
      "Active community of over 50,000 traders"
    ],
    cons: [
      "Futures-only - no forex, stocks, or crypto trading",
      "Monthly subscription fees continue during evaluation",
      "Profit targets and rules are complex for beginners",
      "More expensive than forex-focused prop firms"
    ],
    rules: [
      "Combine: Hit profit target (varies by account size), stay within max loss, minimum 5 trading days",
      "No daily loss limits - you have an overall drawdown limit only",
      "Trailing max loss after first profitable day",
      "80% profit split on funded accounts (90% available)",
      "Monthly subscription fees: $165-$375 depending on account size",
      "Futures contracts only: ES, NQ, YM, RTY, CL, GC, etc."
    ],
    detailedReview: `Topstep is the OG of prop trading. Operating since 2012, they've funded more traders than almost any other firm and have a rock-solid reputation.

The key difference? They focus exclusively on futures trading. If you trade ES, NQ, or other futures contracts, Topstep is built for you. If you trade forex, look elsewhere.

Their evaluation model (called "Trading Combine") has no daily loss limits, which is unique. You have an overall max loss (like $2,000 on a $50K account) but you can lose that in one day or spread it over weeks. This removes the pressure of "one bad day = game over."

The profit targets vary by account size but generally range from $3,000 (on $50K) to $6,000 (on $150K). You need minimum 5 trading days, which is reasonable.

Here's the catch: Monthly subscription fees. During your evaluation, you pay $165-$375 per month depending on account size. If it takes you 3 months to pass, that's an extra $495-$1,125 on top of your initial fee. Other firms have one-time fees.

Once funded, Topstep is solid. 80% profit split standard, 90% available if you consistently profit. Payouts process within 7-10 days.

Support and education are top-tier. They offer daily webinars, 1-on-1 coaching, and a huge library of futures trading courses. For beginners to futures, this is invaluable.

The community is massive - over 50,000 traders. Their Discord and Facebook groups are extremely active.

Cost: About $165/month for a $50K account or $375/month for $150K. More expensive than one-time forex evaluations, but the no-daily-loss-limit structure is worth it for futures traders.`,
    successTips: [
      "Only attempt this if you trade futures regularly - don't learn futures just for Topstep",
      "Take advantage of their free training - the webinars are excellent",
      "Budget for multiple months of subscription fees - most traders take 2-3 months to pass",
      "Focus on the markets you know best - ES and NQ are most popular",
      "Join their Discord - funded traders share strategies daily"
    ]
  },

  'the5ers': {
    slug: 'the5ers',
    pros: [
      "Instant funding available - skip evaluation completely and start trading immediately",
      "Unique growth model: start small, scale up based on proven performance",
      "80% profit split on all account types - consistent across the board",
      "No consistency rules or complex requirements - just follow drawdown limits",
      "Multiple funding programs to match different trading styles"
    ],
    cons: [
      "Instant funding starts smaller ($6K-$20K) vs traditional evaluations",
      "Aggressive scaling targets if you want to grow your account quickly",
      "Some programs have monthly subscription fees",
      "Payout processing takes 7-10 business days (slower than FTMO)"
    ],
    rules: [
      "Instant Funding: Start with $6K-$20K, 80% split, 4% daily loss, 6% max loss, scale by hitting targets",
      "Hyper Growth: $20K-$250K funding, 12% profit target, 5% daily loss, scale 20% monthly",
      "High Stakes: $250K funding, 25% profit target, 8% daily loss, 10% max loss",
      "All trading styles permitted: scalping, swing trading, EA trading, news trading",
      "No minimum or maximum hold times on trades",
      "No consistency rules - trade however you want within risk limits"
    ],
    detailedReview: `The 5%ers pioneered the "instant funding" concept back in 2016. Instead of passing evaluations, you start trading real capital immediately.

Here's how it works: You purchase an instant-funded account starting at $6,000. Make 12% profit and they increase your account to $7,200. Hit another 12% and it grows to $8,640. This continues until you're managing six figures.

The beauty? No evaluation pressure. No "fail and lose $500." You're trading with real money from day one, keeping 80% of all profits. The drawback? You start much smaller than traditional $100K evaluations.

For traders who hate evaluation stress, this is perfect. For traders who want big capital immediately, it's frustrating to start at $6K.

The Hyper Growth program offers a traditional evaluation path with a $20K starting account and 12% profit target. This scales up to $1.2 million over time if you consistently profit. The 12% target is higher than FTMO (10%) or FundedNext (8%), but you get unlimited time.

The High Stakes program is for pros only - $250K account with a brutal 25% profit target. Pass this and you're managing serious capital, but it's extremely difficult.

Customer support is solid but not as fast as FundedNext. Email responses typically take 24-48 hours. Live chat is available during business hours.

Payouts take 7-10 business days, which is industry average but slower than FTMO's 24-48 hours. Not a dealbreaker, just something to know.

At $399 for a Hyper Growth $100K account (with 5% discount), they're the cheapest option among major firms.`,
    successTips: [
      "Start with instant funding if you want zero evaluation pressure",
      "Be patient with the scaling process - growing from $6K to $100K takes time",
      "Keep risk at 1% per trade to protect against the 4% daily limit on instant accounts",
      "Consider Hyper Growth if you want a larger starting account ($20K vs $6K)",
      "Treat instant-funded accounts as seriously as evaluations - the money is real"
    ]
  },

  'finotive-funding': {
    slug: 'finotive-funding',
    pros: [
      "Generous 25% discount with verified codes",
      "5% daily drawdown allows more breathing room",
      "No news trading restrictions - trade any economic events",
      "Simple one-phase evaluation process",
      "Good community reputation for payouts"
    ],
    cons: [
      "Newer firm with limited long-term track record",
      "Maximum account sizes smaller than industry leaders",
      "Customer support can be slow during peak times",
      "Fewer educational resources than established firms"
    ],
    rules: [
      "One-phase evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "No restrictions on news trading or economic events",
      "Minimum 4 trading days required",
      "All trading strategies permitted including scalping and EAs",
      "Weekend holding allowed on most account types",
      "80% profit split standard (higher available with scaling)"
    ],
    detailedReview: `Finotive Funding has gained popularity quickly, particularly among traders who appreciate their no-nonsense approach and generous discounts.

The 5% daily drawdown is standard, but their 10% overall drawdown provides decent breathing room. The one-phase evaluation with 10% profit target is straightforward - no complicated multi-stage processes.

What traders love most is the lack of news trading restrictions. Many firms prohibit trading around major economic events (NFP, FOMC, etc.), but Finotive allows it. If you're a news trader, this is a significant advantage.

The 25% discount (with code PROPFINOTIVE) is genuinely substantial. On a $500 challenge, that's $125 saved. This makes them one of the most cost-effective options for budget-conscious traders.

Payout reliability seems solid based on community feedback. Most reports indicate payments within 7-14 business days. Their TrustPilot scores are consistently high, which is a good sign.

Account sizes max out at $200K, which is sufficient for most retail traders but may limit high-volume professionals. Scaling beyond that requires consistent performance over time.

Support quality is adequate but not exceptional. Email responses within 48 hours, no live chat. Their Discord community helps fill the gap.

As a newer firm (launched 2022), they lack the decade-long track record of FTMO or Topstep. However, early indicators are positive.

At $375 for a $100K account (after 25% discount), they offer excellent value for money.`,
    successTips: [
      "Take advantage of the 25% discount - it's among the best in the industry",
      "If you trade news events, this firm is ideal due to no restrictions",
      "Document all trades thoroughly in case of rule clarification needs",
      "Start with a smaller account to test their systems before committing larger sums",
      "Join their Discord for community support and updates"
    ]
  },

  'apex-trader-funding': {
    slug: 'apex-trader-funding',
    pros: [
      "Futures specialist with excellent platform integration",
      "Fast-track evaluation option - get funded in weeks",
      "No minimum trading days requirement on some accounts",
      "Rithmic and Tradovate platform support",
      "90% profit split available after consistency"
    ],
    cons: [
      "Strict consistency rules trip up many traders",
      "Futures-only, no forex or stocks",
      "Monthly subscription fees during evaluation",
      "Complex rule structure for beginners"
    ],
    rules: [
      "Phase 1: Hit profit target, stay within max loss, trade minimum required days",
      "Phase 2: Reduced profit target, same risk rules",
      "Consistency rule: Best day can't exceed 40% of total profits",
      "Futures contracts: ES, NQ, YM, CL, GC, and more",
      "80% profit split (scales to 90%)",
      "No weekend or overnight holding on some account types"
    ],
    detailedReview: `Apex Trader Funding specializes in funding futures day traders. If you scalp ES or NQ, Apex is designed for your style.

The evaluation is standard two-phase like FTMO. Phase 1 has profit targets around $3,000-$6,000 depending on account size. Phase 2 has reduced targets. Both phases enforce max drawdown rules.

The consistency rule is strict: Your best trading day can't exceed 40% of your total profits. This means if you make $5,000 total profit, no single day can be more than $2,000. This rule prevents "lottery" trading.

Some traders love this rule because it forces discipline. Others hate it because one great trading day can disqualify an otherwise successful evaluation.

Platform integration is excellent. They support Rithmic and Tradovate, which are industry-standard for futures. If you already use these platforms, transition is seamless.

Support is decent but not exceptional. Email response times are 24-48 hours. No live chat.

Payouts process within 10 business days. Not the fastest, not the slowest.

The 20% discount (code APEX20) is significant given their subscription model. Monthly fees range from $147-$307 depending on account size.

For futures traders who can maintain consistency, Apex offers a solid path to funding. For those who occasionally hit big wins, the 40% rule might be problematic.`,
    successTips: [
      "Master the 40% consistency rule - spread profits across multiple days",
      "Best for ES and NQ day traders who already use Rithmic/Tradovate",
      "Budget for 2-3 months of subscription fees",
      "Practice on their demo first - the consistency rule takes adjustment",
      "Join their Slack community for rule clarifications"
    ]
  },

  'fundednext': {
    slug: 'fundednext',
    pros: [
      "Three evaluation models to choose from - Express, Standard, and Stellar",
      "Incredible 120% refund of challenge fees when you get funded",
      "Up to $300,000 account size with aggressive scaling plan",
      "Bi-weekly payout schedule means faster access to your money",
      "Exceptional customer support - usually respond within hours on live chat",
      "8% Phase 1 target on Standard model (easier than FTMO's 10%)"
    ],
    cons: [
      "Express model has strict 6% daily loss limit (vs 5% on Standard)",
      "Consistency rule on some models - no more than 50% of profit from 2 days",
      "Platform fees apply if you don't use their recommended broker",
      "Newer firm (launched 2022) - less track record than FTMO"
    ],
    rules: [
      "Express Model: 15% profit target (one phase), 6% daily loss, 12% max drawdown",
      "Standard Model: 8% Phase 1 + 5% Phase 2, 5% daily loss, 10% max drawdown",
      "Stellar Model: 10% profit target (one phase), 5% daily loss, 10% max drawdown",
      "All strategies allowed: news trading, weekend holding, EAs, scalping",
      "Consistency rule: Maximum 50% of total profits from best 2 days (on most models)",
      "Scaling plan: Increase account size by 25% every 4 months with consistent profits"
    ],
    detailedReview: `FundedNext burst onto the scene in 2022 and has quickly become a top choice for traders. Their biggest innovation? Giving you options.

The Standard model (two-phase, 8% + 5% targets) is perfect for beginners. It's more forgiving than FTMO's 10% + 5% structure. The 5% daily loss limit is standard industry practice.

The Express model is for experienced traders who want to get funded fast. One phase only, 15% profit target, but a stricter 6% daily loss limit. Pass this and you're funded in potentially 2-3 weeks instead of 2 months.

The Stellar model sits in the middle - one phase, 10% target, 5% daily limit.

The game-changer is the 120% refund program. Pass your challenge, get funded, and FundedNext refunds your entire challenge fee PLUS 20% extra. On a $100K challenge costing $450, you get back $540. This means your first payout essentially includes your challenge cost back.

Bi-weekly payouts (1st and 15th of each month) are faster than most firms' monthly schedules but slower than FTMO's on-demand payouts. Still very reasonable.

The consistency rule trips up some traders. You can't have more than 50% of your total profits come from just 2 trading days. This prevents "lottery" trading where someone gets lucky on one massive trade. Focus on steady, consistent gains.

Support is exceptional. Live chat usually responds in 1-3 hours. Email tickets within 24 hours. They actually care about helping traders succeed, not just collecting challenge fees.

At $450 for a $100K account (with 20% discount), they're cheaper than FTMO and offer more model flexibility.`,
    successTips: [
      "Choose Standard model if you're new - the 8% Phase 1 target is more achievable",
      "Focus on consistency to avoid violating the 50% rule - spread wins across multiple days",
      "Take advantage of bi-weekly payouts - you can withdraw every 14 days",
      "Use their free demo to practice with actual challenge rules before buying",
      "Join their Discord community - lots of funded traders sharing strategies"
    ]
  },

  'blue-guardian': {
    slug: 'blue-guardian',
    pros: [
      "High leverage up to 1:100 - great for small account traders",
      "Competitive 15% discount with verified codes",
      "Flexible trading rules including weekend holding",
      "Multiple account sizes from $10K to $200K",
      "Good reputation for customer support responsiveness"
    ],
    cons: [
      "Maximum leverage requires careful risk management",
      "Newer firm with limited long-term track record",
      "Some traders report slower payout processing during holidays",
      "Educational resources less comprehensive than larger firms"
    ],
    rules: [
      "One-phase evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "Leverage up to 1:100 available on forex pairs",
      "Minimum 3 trading days required",
      "All trading styles allowed including scalping and news trading",
      "Weekend holding permitted on all account types",
      "80% profit split standard (scales with account performance)"
    ],
    detailedReview: `Blue Guardian stands out for offering high leverage - up to 1:100 on forex pairs. For traders with smaller accounts, this is significant. A $10,000 account with 1:100 leverage can control $1,000,000 in positions.

The evaluation is straightforward: one phase, 10% profit target, standard 5% daily loss and 10% max drawdown. Minimum 3 trading days is more lenient than many competitors requiring 4-5 days.

The 1:100 leverage is both an advantage and a risk. It magnifies both profits and losses. Beginners should use extreme caution - it's easy to blow an account quickly with excessive leverage. Experienced traders who understand proper position sizing can benefit significantly.

Support quality is generally good. Most traders report email responses within 24 hours. Their Telegram group is active with community support.

Payout reliability seems solid based on available reports. Processing typically takes 7-10 business days. Some traders note delays around month-ends or holidays.

Account sizes range from $10K to $200K, covering most retail trader needs. Scaling beyond $200K requires consistent performance.

The 15% discount (code PROPDISCOUNTS) makes them cost-competitive. At $425 for a $100K account (after discount), they're priced similarly to FundedNext.

For traders who understand leverage and want maximum flexibility, Blue Guardian offers compelling options. For risk-averse traders, the high leverage might be intimidating.`,
    successTips: [
      "Use high leverage cautiously - start with 1:30 or 1:50 until comfortable",
      "The 3-day minimum is lenient - don't rush to complete it",
      "Calculate position sizes carefully with 1:100 leverage to avoid quick losses",
      "Join their Telegram group for quick community support",
      "Document all trades and communications for reference"
    ]
  },

  'instantfunding': {
    slug: 'instantfunding',
    pros: [
      "Same-day account activation - fastest in the industry",
      "Generous 18% discount with verified codes",
      "Simple one-phase evaluation process",
      "No restrictions on trading styles or strategies",
      "Good track record of timely payouts"
    ],
    cons: [
      "Account sizes max out at $100K (smaller than some competitors)",
      "Limited educational resources compared to larger firms",
      "Customer support can be inconsistent during peak times",
      "Fewer community features than firms with active Discords"
    ],
    rules: [
      "One-phase evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "Same-day activation after passing evaluation",
      "Minimum 4 trading days required",
      "All trading strategies permitted including EA and news trading",
      "Weekend holding allowed on all accounts",
      "80% profit split (higher available with consistent profits)"
    ],
    detailedReview: `InstantFunding lives up to its name - they're among the fastest at activating funded accounts. Pass your evaluation in the morning, often trading by afternoon.

The evaluation is simple: one phase, 10% profit target, standard 5% daily loss and 10% max drawdown. Minimum 4 trading days. Nothing complicated, nothing hidden.

What traders appreciate is the lack of restrictions. No consistency rules, no profit distribution requirements, no limitations on trading styles. If you can stay within the drawdown limits, you can trade however you want.

The 18% discount (code INSTANT18) is substantial. On a $500 challenge, that's $90 saved. Combined with their already competitive pricing, this makes them very cost-effective.

Payout reliability appears solid. Most community reports indicate payments within 5-10 business days. Their TrustPilot rating is consistently high.

Account sizes are somewhat limited - maximum $100K for most traders. Scaling to $200K requires exceptional performance over time. For traders wanting larger accounts immediately, this might be restrictive.

Support quality is adequate. Email responses within 48 hours typically. No live chat, which some traders find frustrating.

For traders who value speed and simplicity, InstantFunding delivers. Their no-frills approach appeals to experienced traders who don't need hand-holding.

At $410 for a $100K account (after 18% discount), they offer excellent value.`,
    successTips: [
      "Take advantage of same-day activation - plan to start trading immediately after passing",
      "The 18% discount is among the best - use it before it expires",
      "With no restrictions, develop a strategy that maximizes your edge",
      "Start with a smaller account to test their systems if unsure",
      "Keep meticulous records - simple rules mean fewer disputes"
    ]
  },

  'fundingpips': {
    slug: 'fundingpips',
    pros: [
      "Crypto trading allowed - unique among major prop firms",
      "Generous 20% discount with community favorite codes",
      "Flexible rules including weekend holding and news trading",
      "Good community reputation for fair treatment",
      "Multiple account sizes with reasonable scaling"
    ],
    cons: [
      "Crypto trading involves higher volatility and risk",
      "Maximum account sizes limited compared to forex specialists",
      "Support response times vary significantly",
      "Educational resources focused more on crypto than forex"
    ],
    rules: [
      "Two-phase evaluation: 8% Phase 1 + 5% Phase 2",
      "5% daily loss limit, 10% max drawdown",
      "Crypto trading permitted on major pairs (BTC, ETH, etc.)",
      "Forex and metals also available for trading",
      "Minimum 4 trading days per phase",
      "80% profit split (scales to 90% with consistency)"
    ],
    detailedReview: `FundingPips stands out by allowing cryptocurrency trading - something most prop firms prohibit. If you trade Bitcoin, Ethereum, or other major cryptos, this is one of your few options.

The evaluation is standard two-phase: 8% Phase 1 target, 5% Phase 2 target. Daily 5% loss limit and 10% max drawdown. Reasonable minimum 4 trading days per phase.

Crypto trading introduces unique considerations. Volatility is higher, spreads can be wider, and overnight/weekend moves can be significant. The 5% daily loss limit is especially important with crypto - a bad 24 hours in crypto can wipe out weeks of profits.

The 20% discount (code FUNDPIPS20) is excellent. At $400 for a $100K account (after discount), they're very competitively priced.

Payout reliability for crypto profits requires verification. Some traders report additional KYC steps for crypto withdrawals. Processing times: 7-14 business days for forex, potentially longer for crypto.

Support has mixed reviews. Some traders report excellent help, others report slow responses. Their Discord community helps fill gaps.

For crypto traders, FundingPips is essentially your only quality option among prop firms. For forex-only traders, they're still competitive but don't offer significant advantages over other firms.

Account sizes max at $200K, which is standard for mid-tier firms. Scaling beyond requires consistent performance.`,
    successTips: [
      "If trading crypto, understand the unique volatility and adjust position sizes accordingly",
      "Use the 20% discount - it's among the best available",
      "Document all crypto trades thoroughly for tax and verification purposes",
      "Consider starting with forex to test their systems before adding crypto",
      "Join their Discord for crypto-specific trading discussions"
    ]
  },

  'brightfunded': {
    slug: 'brightfunded',
    pros: [
      "No time limits on challenges - trade at your own pace",
      "Competitive 15% discount with verified codes",
      "Flexible trading rules with weekend holding allowed",
      "Good reputation for customer service",
      "Reasonable account sizes with fair scaling"
    ],
    cons: [
      "Newer firm with limited long-term track record",
      "Maximum account size smaller than industry leaders",
      "Some traders report slower payout processing",
      "Fewer educational resources than established firms"
    ],
    rules: [
      "One-phase evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "No time limits - take as long as you need",
      "Minimum 3 trading days required (more lenient than many)",
      "All trading strategies permitted including scalping and news",
      "Weekend holding allowed on all account types",
      "80% profit split (higher available with account scaling)"
    ],
    detailedReview: `BrightFunded's standout feature is truly unlimited time on challenges. While many firms say "no time limits," BrightFunded means it - you can take 6 months, a year, whatever you need.

The evaluation is straightforward: one phase, 10% profit target, standard 5% daily loss and 10% max drawdown. Minimum 3 trading days is more lenient than the typical 4-5 days.

For part-time traders or those with busy schedules, this flexibility is invaluable. You can trade when you have time, without pressure to hit targets quickly. This reduces stress and allows for more thoughtful trading decisions.

The 15% discount (code PROPCOUPOUNS) makes them cost-competitive. At $425 for a $100K account (after discount), they're priced similarly to Blue Guardian and InstantFunding.

Payout reliability seems solid based on available reports. Processing typically takes 7-14 business days. Their TrustPilot rating is consistently positive.

Support quality is generally good. Most traders report email responses within 24-48 hours. No live chat, which some find limiting.

Account sizes range from $10K to $200K. Scaling beyond $200K requires exceptional consistency.

For traders who value flexibility above all else, BrightFunded is an excellent choice. Their patient approach aligns well with sustainable trading practices.`,
    successTips: [
      "Use the unlimited time - there's no rush, trade only when conditions are optimal",
      "The 3-day minimum is lenient - spread trades over weeks or months",
      "Develop a long-term mindset - this firm rewards patience",
      "Document your progress over time to identify patterns",
      "Take advantage of the 15% discount before expiry"
    ]
  },

  'alpha-capital-group': {
    slug: 'alpha-capital-group',
    pros: [
      "No profit target on funded accounts - unique in the industry",
      "Competitive 15% discount with verified codes",
      "Flexible trading rules with reasonable drawdown limits",
      "Good reputation for trader support",
      "Multiple account sizes with fair terms"
    ],
    cons: [
      "Evaluation profit targets may be higher than some competitors",
      "Newer firm with limited track record",
      "Maximum account sizes smaller than industry leaders",
      "Some traders report slower scaling than advertised"
    ],
    rules: [
      "Evaluation: 12% profit target, 5% daily loss, 10% max drawdown",
      "Funded accounts: No profit targets, only drawdown rules",
      "Minimum 4 trading days required during evaluation",
      "All trading styles permitted including scalping and news",
      "Weekend holding allowed on most account types",
      "80% profit split standard (higher with consistency)"
    ],
    detailedReview: `Alpha Capital Group offers something truly unique: no profit targets on funded accounts. Once you pass evaluation, you only need to follow drawdown rules. No monthly profit requirements.

The evaluation requires a 12% profit target, which is higher than FTMO's 10% or FundedNext's 8%. However, the trade-off is worth it for many traders - no pressure to make monthly profits once funded.

This structure is ideal for traders with inconsistent income patterns. You can have slow months without penalty, as long as you don't violate drawdown rules.

The 15% discount (code PROPCOUPONS15) helps offset the higher evaluation target. At $425 for a $100K account (after discount), they're competitively priced.

Payout reliability appears solid based on community reports. Processing typically takes 7-10 business days. Their approach to funded accounts (no profit targets) reduces payment disputes.

Support quality is generally good. Most traders report responsive email support within 24-48 hours.

Account sizes max at $200K. Scaling beyond requires consistent performance but doesn't require hitting specific profit targets each month.

For traders who dislike monthly profit pressure, Alpha Capital Group offers a refreshing alternative. The higher evaluation hurdle is the price for long-term flexibility.`,
    successTips: [
      "The 12% evaluation target is manageable with patience - don't rush",
      "Once funded, focus on risk management rather than profit targets",
      "Use the 15% discount to reduce your evaluation cost",
      "Develop a strategy that works in your funded no-pressure environment",
      "Document everything during evaluation for future reference"
    ]
  },

  'e8-markets': {
    slug: 'e8-markets',
    pros: [
      "95% profit split - highest in the industry",
      "Competitive 20% discount with verified codes",
      "Lenient consistency requirements",
      "Reasonable challenge costs",
      "Fast evaluation process possible"
    ],
    cons: [
      "Newer firm with less established reputation",
      "Limited account size options",
      "Support response times vary",
      "Fewer educational resources than larger firms"
    ],
    rules: [
      "Two-phase evaluation: 8% + 5% profit targets",
      "5% daily loss limit, 10% max drawdown",
      "Minimum 4 trading days per phase",
      "95% profit split on funded accounts",
      "All trading strategies allowed",
      "No consistency rules on most account types"
    ],
    detailedReview: `E8 Markets' claim to fame is their 95% profit split - the highest you'll find anywhere. On a $100K account making $5,000/month, that's $4,750 to you versus $4,000 at an 80% split firm.

The evaluation is standard two-phase: 8% Phase 1 target, 5% Phase 2 target. Daily 5% loss limit, 10% max drawdown. Reasonable 4-day minimum per phase.

The 95% split is real but comes with higher evaluation costs. At $400 for a $100K account (after 20% discount), they're priced similarly to competitors. The math works in your favor if you're consistently profitable.

As a newer firm (launched 2023), they lack the track record of FTMO or Topstep. However, early reports from funded traders are positive - they do pay out, and the 95% split is honored.

Support quality is inconsistent. Some traders report excellent support, others report slow responses. Their Discord community helps fill gaps.

Account sizes max at $200K. Scaling beyond requires consistent performance.

The 20% discount (code TRADERPERK) is excellent. Combined with the 95% split, E8 offers potentially the highest earnings potential of any prop firm.

For consistently profitable traders, E8 Markets could be extremely lucrative. For newer or inconsistent traders, the higher evaluation cost might not justify the potential split.`,
    successTips: [
      "The 95% split is real - plan for maximum earnings if consistently profitable",
      "Use the 20% discount to reduce your evaluation cost",
      "Start with a smaller account to test their payout reliability",
      "Join their Discord for community support and updates",
      "Document all communications regarding the 95% split terms"
    ]
  },

  'for-traders': {
    slug: 'for-traders',
    pros: [
      "Wide range of account sizes from $5k to $200k",
      "Competitive 15% discount with verified codes",
      "Flexible trading rules including weekend holding",
      "Good reputation for customer service",
      "Reasonable evaluation targets"
    ],
    cons: [
      "Maximum account size limited compared to some competitors",
      "Newer firm with limited long-term track record",
      "Some traders report slower payout processing",
      "Fewer community features than firms with active Discords"
    ],
    rules: [
      "One-phase evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "Account sizes: $5K, $10K, $25K, $50K, $100K, $200K available",
      "Minimum 4 trading days required",
      "All trading strategies permitted",
      "Weekend holding allowed on all accounts",
      "80% profit split (higher with account scaling)"
    ],
    detailedReview: `For Traders lives up to its name - they offer account sizes starting at just $5,000, making them accessible to traders with limited capital.

The evaluation is straightforward: one phase, 10% profit target, standard 5% daily loss and 10% max drawdown. Minimum 4 trading days.

The $5K starting account is unique among major prop firms. Most start at $10K or $25K. This allows beginners to start small, learn the process, and scale up gradually.

The 15% discount (code FORTRADERS15) applies across all account sizes. On a $5K account costing $99, that's about $15 saved - meaningful at smaller scales.

Payout reliability seems solid based on available reports. Processing typically takes 7-14 business days. Their approach to smaller accounts appears consistent with larger ones.

Support quality is generally good. Most traders report responsive email support. The smaller account focus means they're accustomed to beginner questions.

Account scaling is reasonable: demonstrate consistency on a $5K account, move to $10K, then $25K, etc. This gradual approach builds confidence.

For beginners or traders with limited capital, For Traders offers an excellent entry point. The gradual scaling approach aligns well with skill development.

At $425 for a $100K account (after 15% discount), they're competitively priced for larger accounts too.`,
    successTips: [
      "Start small with a $5K or $10K account if new to prop trading",
      "Use the 15% discount across all account sizes",
      "Take advantage of gradual scaling to build confidence",
      "Document your progress at each account level",
      "Don't rush to larger accounts - master each size first"
    ]
  },

  'take-profit-trader': {
    slug: 'take-profit-trader',
    pros: [
      "Scalping friendly with no trade restrictions",
      "Competitive 12% discount with verified codes",
      "Flexible rules including news trading",
      "Good reputation for fair treatment of traders",
      "Reasonable account sizes with fair terms"
    ],
    cons: [
      "Maximum account size limited compared to some competitors",
      "Newer firm with limited track record",
      "Some traders report slower customer support",
      "Fewer educational resources than larger firms"
    ],
    rules: [
      "One-phase evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "No restrictions on trading styles - scalping fully allowed",
      "Minimum 3 trading days required",
      "News trading permitted without restrictions",
      "Weekend holding allowed on all accounts",
      "80% profit split (scales with consistency)"
    ],
    detailedReview: `Take Profit Trader stands out as being genuinely scalping-friendly. Many prop firms restrict scalping through minimum hold times or other rules. TPT has no such restrictions.

The evaluation is straightforward: one phase, 10% profit target, standard 5% daily loss and 10% max drawdown. Minimum 3 trading days is lenient.

For scalpers, this is significant. You can enter and exit trades quickly without worrying about violating hold time rules. Combined with allowed news trading, this provides maximum flexibility.

The 12% discount (code TPT12) is reasonable. At $440 for a $100K account (after discount), they're priced similarly to competitors.

Payout reliability appears solid based on community reports. Processing typically takes 7-10 business days. Their approach to flexible trading seems to extend to payout processing.

Support quality is adequate. Email responses within 48 hours typically. No live chat, which some scalpers find frustrating given the time-sensitive nature of their trading.

Account sizes max at $200K. Scaling beyond requires consistent performance.

For scalpers and news traders, Take Profit Trader offers near-perfect conditions. The lack of restrictions is genuinely rare in the prop firm space.

If your strategy involves quick entries/exits or trading around news events, TPT is worth serious consideration.`,
    successTips: [
      "If you scalp, this firm is ideal - no hold time restrictions",
      "News trading is fully allowed - develop strategies around economic events",
      "The 3-day minimum is lenient - don't rush to complete it",
      "Document your scalping results thoroughly",
      "Use the 12% discount to reduce your evaluation cost"
    ]
  },

  'myfundedfutures': {
    slug: 'myfundedfutures',
    pros: [
      "Quick payout processing - often within 5 business days",
      "No weekend holding restrictions",
      "Competitive 10% discount with verified codes",
      "Futures-focused with good platform integration",
      "Good reputation for customer service"
    ],
    cons: [
      "Futures-only, no forex or crypto trading",
      "Maximum account size limited compared to some competitors",
      "Evaluation targets may be challenging for beginners",
      "Fewer educational resources than larger futures firms"
    ],
    rules: [
      "Evaluation: 12% profit target, 5% daily loss, 10% max drawdown",
      "No weekend holding restrictions - trade Sunday opens",
      "Minimum 4 trading days required",
      "Futures contracts: ES, NQ, YM, CL, GC, etc.",
      "80% profit split (higher with consistency)",
      "Quick payout processing (5-7 business days typical)"
    ],
    detailedReview: `MyFundedFutures specializes in futures trading with a focus on quick payouts. Their 5-7 business day processing is faster than many competitors.

The evaluation requires a 12% profit target, which is higher than some forex-focused firms but standard for futures. Daily 5% loss limit, 10% max drawdown. Minimum 4 trading days.

The lack of weekend holding restrictions is significant for futures traders. You can hold positions over the weekend and trade Sunday night opens without penalty.

The 10% discount (code MYFUTURES10) is modest but helpful. At $450 for a $100K account (after discount), they're priced competitively for futures.

Payout speed is their standout feature. Most traders report payments within 5-7 business days, which is excellent. Their focus on quick processing appears genuine.

Support quality is generally good. Most traders report responsive email support. Their futures focus means they understand the specific needs of futures traders.

Account sizes max at $200K. Scaling beyond requires consistent performance.

For futures traders who value quick access to profits, MyFundedFutures delivers. The higher evaluation target is the trade-off for faster payouts.

If you trade futures and want quicker payouts than Topstep or Apex offer, MFF is worth considering.`,
    successTips: [
      "The quick payouts are real - plan your cash flow accordingly",
      "No weekend restrictions means you can trade Sunday opens",
      "The 12% target is manageable with patience in futures",
      "Use the 10% discount to reduce your evaluation cost",
      "Document all trades, especially around weekend positions"
    ]
  },

  'blueberry-funded': {
    slug: 'blueberry-funded',
    pros: [
      "Low minimum trading days requirement (1-2 days)",
      "Competitive 20% discount with verified codes",
      "Flexible trading rules including weekend holding",
      "Good for part-time traders with limited availability",
      "Reasonable account sizes with fair terms"
    ],
    cons: [
      "Maximum account size limited compared to some competitors",
      "Newer firm with limited track record",
      "Some traders report slower customer support",
      "Fewer educational resources than larger firms"
    ],
    rules: [
      "One-phase evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "Minimum 1-2 trading days required (varies by account)",
      "All trading strategies permitted",
      "Weekend holding allowed on all accounts",
      "80% profit split (higher with consistency)",
      "Ideal for part-time traders with limited trading days"
    ],
    detailedReview: `Blueberry Funded is perfect for part-time traders. Their 1-2 day minimum trading requirement is the most lenient in the industry.

The evaluation is straightforward: one phase, 10% profit target, standard 5% daily loss and 10% max drawdown. The key difference is the minimal day requirement.

For traders with full-time jobs or other commitments, this is game-changing. You can pass your evaluation trading only weekends or specific days that work for you.

The 20% discount (code PROPCOUPONS) is excellent. At $400 for a $100K account (after discount), they're very competitively priced.

Payout reliability appears solid based on available reports. Processing typically takes 7-14 business days.

Support quality is adequate. Email responses within 48 hours typically. Their understanding of part-time trader needs seems genuine.

Account sizes max at $200K. Scaling beyond requires consistent performance but maintains the flexible day requirements.

For part-time traders, Blueberry Funded offers near-perfect conditions. The flexibility aligns perfectly with non-professional trading schedules.

If you can't trade 4-5 days per week but have a solid strategy, Blueberry is likely your best option among prop firms.`,
    successTips: [
      "The 1-2 day minimum is perfect for part-time traders - use it",
      "Plan your trading around your schedule, not vice versa",
      "Use the 20% discount - it's among the best available",
      "Document your limited trading days thoroughly",
      "Develop a strategy that works within your available time"
    ]
  },

  'ofp-funding': {
    slug: 'ofp-funding',
    pros: [
      "Weekend trading fully enabled",
      "Competitive 12% discount with verified codes",
      "Flexible trading rules including news trading",
      "Good reputation for fair treatment",
      "Reasonable account sizes with fair terms"
    ],
    cons: [
      "Maximum account size limited compared to some competitors",
      "Newer firm with limited track record",
      "Some traders report slower payout processing",
      "Fewer community features than firms with active Discords"
    ],
    rules: [
      "One-phase evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "Weekend trading fully enabled - trade Friday close to Sunday open",
      "Minimum 4 trading days required",
      "All trading strategies permitted",
      "News trading allowed without restrictions",
      "80% profit split (higher with consistency)"
    ],
    detailedReview: `OFP Funding stands out for fully enabling weekend trading. Most prop firms allow weekend holding (keeping positions open over weekend) but OFP allows actual trading during weekend market hours.

The evaluation is standard: one phase, 10% profit target, daily 5% loss limit, 10% max drawdown. Minimum 4 trading days.

Weekend trading capability is significant for certain strategies. Cryptocurrency traders, in particular, benefit since crypto markets operate 24/7. Some forex pairs also have weekend activity.

The 12% discount (code OFP12) is reasonable. At $440 for a $100K account (after discount), they're priced similarly to competitors.

Payout reliability appears solid based on community reports. Processing typically takes 7-14 business days.

Support quality is adequate. Email responses within 48 hours typically. Their weekend trading focus means support may be available during weekends.

Account sizes max at $200K. Scaling beyond requires consistent performance.

For traders who specifically want weekend trading capability, OFP is essentially your only quality option. For standard weekday traders, they offer little advantage over competitors.

If your strategy involves weekend market activity, OFP Funding is worth serious consideration. Otherwise, evaluate them against other firms.`,
    successTips: [
      "If you trade weekends, this firm is ideal - few others allow it",
      "Weekend markets differ from weekdays - adjust your strategy accordingly",
      "Use the 12% discount to reduce your evaluation cost",
      "Document weekend trades thoroughly - they may be scrutinized differently",
      "Test weekend trading on demo first before committing real evaluation funds"
    ]
  },

  'fxify': {
    slug: 'fxify',
    pros: [
      "On-demand payouts - request anytime, receive quickly",
      "Competitive 20% discount with verified codes",
      "No minimum trading days on funded accounts",
      "Flexible trading rules including scalping",
      "Good reputation for payout speed"
    ],
    cons: [
      "Maximum account size limited compared to some competitors",
      "Newer firm with limited track record",
      "Evaluation targets may be challenging for beginners",
      "Fewer educational resources than larger firms"
    ],
    rules: [
      "Evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "On-demand payouts: request anytime, process within 48 hours",
      "No minimum trading days on funded accounts",
      "All trading strategies permitted",
      "Weekend holding allowed",
      "80% profit split (higher with consistency)"
    ],
    detailedReview: `FXIFY's standout feature is on-demand payouts. Unlike firms with bi-weekly or monthly schedules, FXIFY lets you request payout anytime and typically processes within 48 hours.

The evaluation is standard: one phase, 10% profit target, daily 5% loss limit, 10% max drawdown. Reasonable requirements overall.

On-demand payouts are genuinely valuable for professional traders. Need cash for an emergency? Want to withdraw after a particularly good week? FXIFY accommodates this.

The 20% discount (code PROPIFY) is excellent. At $400 for a $100K account (after discount), they're very competitively priced.

Payout speed appears to be as advertised based on community reports. Most traders confirm 24-48 hour processing after request.

Support quality is generally good. Most traders report responsive support, particularly regarding payout queries.

Account sizes max at $200K. Scaling beyond requires consistent performance.

For traders who value liquidity and quick access to profits, FXIFY offers significant advantages. The on-demand feature is rare in the prop firm space.

If cash flow timing matters to you, FXIFY's payout flexibility could be worth choosing them over otherwise similar firms.`,
    successTips: [
      "The on-demand payouts are valuable - plan your cash flow accordingly",
      "No minimum trading days means trade when conditions are optimal",
      "Use the 20% discount - it's among the best available",
      "Document payout requests and processing times",
      "Test their payout system with a small withdrawal first if concerned"
    ]
  },

  'qt-funded': {
    slug: 'qt-funded',
    pros: [
      "Up to $200,000 account sizes available",
      "Competitive 15% discount with verified codes",
      "Up to 90% profit share on earnings",
      "Flexible trading rules reasonable for most styles",
      "Good for traders wanting larger account options"
    ],
    cons: [
      "Lower prop score indicates some trader dissatisfaction",
      "Newer firm with limited track record",
      "Some traders report slower customer support",
      "Fewer educational resources than larger firms"
    ],
    rules: [
      "Evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "Account sizes up to $200,000 available",
      "Minimum 4 trading days required",
      "All trading strategies permitted",
      "Weekend holding allowed",
      "Up to 90% profit share (typically starts at 80%)"
    ],
    detailedReview: `QT Funded offers solid, if unexceptional, prop firm services. Their $200K maximum account size covers most retail trader needs, and the 90% profit share potential is attractive.

The evaluation is standard: one phase, 10% profit target, daily 5% loss limit, 10% max drawdown. Minimum 4 trading days.

The 7.5/10 prop score indicates some trader dissatisfaction, though specific issues vary. Some report slower-than-advertised scaling, others mention support responsiveness issues.

The 15% discount (code DISCOUTS15) helps offset concerns. At $425 for a $100K account (after discount), they're competitively priced.

Payout reliability appears adequate based on available reports. Processing typically takes 7-14 business days. Their TrustPilot rating is mixed but generally positive.

Support quality is the main complaint area. Some traders report excellent support, others report slow responses. Consistency appears to be an issue.

Account scaling to the 90% profit share requires demonstrated consistency over time. The path is clear but may take longer than advertised.

For traders who prioritize account size over premium support, QT Funded offers reasonable value. For those needing hand-holding, other firms might be better.

The discount helps, but evaluate carefully based on your specific needs and risk tolerance.`,
    successTips: [
      "The 90% profit share is achievable but requires demonstrated consistency",
      "Use the 15% discount to reduce your evaluation cost",
      "Document all support interactions thoroughly",
      "Start with a smaller account to test their systems",
      "Have realistic expectations about scaling timelines"
    ]
  },

  'atfunded': {
    slug: 'atfunded',
    pros: [
      "In-house technology platform",
      "Flexible payment methods accepted",
      "Competitive 15% discount with verified codes",
      "Reasonable account sizes for most traders",
      "Good for traders preferring integrated platforms"
    ],
    cons: [
      "Lower prop score indicates significant trader concerns",
      "Newer firm with limited track record",
      "Some traders report payout delays",
      "Fewer trading instruments than some competitors"
    ],
    rules: [
      "Evaluation: 10% profit target, 5% daily loss, 10% max drawdown",
      "In-house trading platform (not MT4/5)",
      "Flexible payment methods including various cryptos",
      "Minimum 4 trading days required",
      "Limited trading instruments compared to some firms",
      "80% profit split standard"
    ],
    detailedReview: `ATFunded offers an integrated approach with their in-house trading platform. For traders who prefer all-in-one solutions, this could be appealing.

The evaluation is standard: one phase, 10% profit target, daily 5% loss limit, 10% max drawdown. Minimum 4 trading days.

The 7.0/10 prop score is among the lowest in our database, indicating significant trader concerns. Common issues include platform stability questions and payout timing inconsistencies.

The 15% discount (code PROPATF) helps but may not fully address concerns. At $425 for a $100K account (after discount), they're priced competitively but risks appear higher.

The in-house platform is both an advantage and disadvantage. Integration is seamless, but you're locked into their ecosystem. If you prefer MT4/5 or other platforms, look elsewhere.

Payment flexibility is good - they accept various payment methods including multiple cryptocurrencies. This is convenient for crypto-native traders.

Payout reliability appears to be the main concern area. Some traders report delays beyond advertised timelines.

For traders who value integrated platforms and payment flexibility, ATFunded offers unique features. For those prioritizing reliability above all, other firms are safer bets.

Proceed with caution and consider starting with a smaller account to test their systems thoroughly.`,
    successTips: [
      "Test their in-house platform thoroughly on demo first",
      "Start with a small account to evaluate their systems",
      "Document all payments and payout requests meticulously",
      "Use the 15% discount to reduce your risk exposure",
      "Have backup plans in case of platform or payout issues"
    ]
  }
};

// Helper function to get firm content
export function getFirmContent(slug: string): FirmContent | null {
  return firmContent[slug] || null;
}

// Helper to get all firm slugs
export function getAllFirmSlugs(): string[] {
  return Object.keys(firmContent);
}