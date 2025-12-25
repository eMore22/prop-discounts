import React from 'react';
import { Metadata } from 'next';
import { Target, Heart, Shield, TrendingUp, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Prop Coupon - Your Trusted Source for Prop Firm Discounts',
  description: 'Learn about Prop Coupon: We help traders save money on prop firm challenges with verified discount codes. 15+ firms, 50+ active deals, 10K+ traders helped.',
  keywords: 'about prop coupon, prop firm discounts, trading discounts, funded account deals',
  openGraph: {
    title: 'About Prop Coupon - Trusted Prop Trading Discount Source',
    description: 'We help traders save money on prop firm challenges with verified discount codes.',
    type: 'website',
  }
};

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Verified Codes",
      description: "Every discount code is verified and updated regularly to ensure you get working deals."
    },
    {
      icon: Heart,
      title: "Trader-Focused",
      description: "Built by traders, for traders. We understand the importance of getting the best value."
    },
    {
      icon: TrendingUp,
      title: "Save More",
      description: "Access exclusive discounts up to 20% off on prop firm evaluations and challenges."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We work directly with prop firms to bring you the best deals available."
    }
  ];

  const stats = [
    { number: "15+", label: "Prop Firms" },
    { number: "50+", label: "Active Deals" },
    { number: "10K+", label: "Traders Helped" },
    { number: "20%", label: "Average Savings" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Prop Coupon</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">Your trusted source for verified prop firm discount codes and exclusive deals</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-10 h-10 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">At Prop Coupon, we're on a mission to make prop trading more accessible and affordable for traders worldwide. We understand that starting your prop trading journey can be expensive, and that's why we've dedicated ourselves to finding and verifying the best discount codes available.</p>
            <p className="text-lg text-gray-700 leading-relaxed">We work tirelessly to maintain relationships with top prop firms, ensuring our community always has access to the latest and most valuable deals. Whether you're a beginner taking your first evaluation or an experienced trader scaling up, we're here to help you save money and achieve your trading goals.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Prop Coupon was founded in 2023 by a team of experienced prop traders who were frustrated with the high costs of evaluation challenges. We realized that many prop firms offered discount codes, but traders had no centralized place to find them. Missing out on a 20% discount meant hundreds of dollars wasted—money that could be used for better risk management or additional challenges.
              </p>
              
              <p className="text-lg text-gray-700 mb-6">
                What started as a simple spreadsheet shared among friends quickly grew into a community of over 10,000 traders. Today, we work directly with 15+ prop trading firms to negotiate exclusive discount codes for our community. We've helped traders save over $500,000 in evaluation fees, and we're just getting started.
              </p>

              <p className="text-lg text-gray-700">
                Our team consists of active prop traders who understand the challenges you face. We've been through the evaluations, experienced the stress of drawdown limits, and celebrated the success of getting funded. This firsthand experience drives us to find the best deals and provide honest, transparent information about every prop firm we feature.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Verify Discount Codes</h2>
              <p className="text-lg text-gray-700 mb-6">
                Every discount code on our platform goes through a rigorous verification process. Our team tests each code multiple times before listing it. We check the expiry date, verify the discount amount, and ensure the code works across different account sizes. Codes are re-verified weekly, and expired codes are automatically removed or marked.
              </p>

              <p className="text-lg text-gray-700 mb-6">
                We also maintain direct partnerships with prop firms, which allows us to get codes that aren't publicly available. These exclusive deals can save you an additional 5-10% compared to standard promotional codes. When you see a "Verified" badge on our site, it means we've personally tested that code within the last 7 days.
              </p>

              <p className="text-lg text-gray-700">
                Our verification process includes testing codes on different devices, browsers, and even geographical locations to ensure they work for traders worldwide. We also monitor user feedback—if multiple traders report a code not working, we investigate immediately and update our listings.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to Transparency</h2>
              <p className="text-lg text-gray-700 mb-6">
                We earn commissions through affiliate partnerships when you purchase a prop firm challenge using our links. This is how we keep our service free for traders. However, we never let these partnerships influence our prop scores or recommendations. Our ratings are based purely on trader feedback, rule fairness, payout reliability, and overall value.
              </p>

              <p className="text-lg text-gray-700 mb-6">
                If a prop firm has issues with payouts or changes their rules unfairly, we'll update our prop score immediately and inform our community—even if it affects our partnership. Your success as a trader is more important to us than any affiliate commission. We've ended partnerships with firms that failed to meet our standards for transparency and trader treatment.
              </p>

              <p className="text-lg text-gray-700">
                We believe in full disclosure: every link to a prop firm on our site is an affiliate link. This doesn't cost you anything extra, but it allows us to maintain our platform, verify codes, and continue negotiating better deals for our community. We're proud to say that over 90% of our users report satisfaction with the codes they've used from our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm md:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We're committed to providing the most reliable and valuable discount codes in the prop trading industry</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Saving?</h2>
            <p className="text-xl text-blue-100 mb-8">Browse our exclusive discount codes and start your prop trading journey today</p>
            <a href="/" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">View All Deals</a>
          </div>
        </div>
      </section>
    </div>
  );
}
