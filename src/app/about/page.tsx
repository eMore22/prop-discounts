import React from 'react';
import { Target, Heart, Shield, TrendingUp, Users, Award } from 'lucide-react';

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Prop Discounts</h1>
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
            <p className="text-lg text-gray-700 leading-relaxed mb-6">At Prop Discounts, we're on a mission to make prop trading more accessible and affordable for traders worldwide. We understand that starting your prop trading journey can be expensive, and that's why we've dedicated ourselves to finding and verifying the best discount codes available.</p>
            <p className="text-lg text-gray-700 leading-relaxed">We work tirelessly to maintain relationships with top prop firms, ensuring our community always has access to the latest and most valuable deals. Whether you're a beginner taking your first evaluation or an experienced trader scaling up, we're here to help you save money and achieve your trading goals.</p>
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