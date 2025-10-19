import React from 'react';
import { Search, Copy, ExternalLink, CheckCircle, Zap, Shield, HelpCircle } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "Browse Discount Codes",
      description: "Explore our curated list of verified discount codes from top prop trading firms. Filter by active deals or search for your preferred firm.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Copy,
      title: "Copy Your Code",
      description: "Click the 'Copy' button to instantly copy the discount code to your clipboard. Each code shows the expiry date and discount amount.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: ExternalLink,
      title: "Visit the Prop Firm",
      description: "Click 'Visit Firm' to go directly to the prop firm's website. Our affiliate links help support this free service.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: CheckCircle,
      title: "Apply & Save",
      description: "Paste your discount code at checkout and enjoy instant savings on your prop firm evaluation or challenge account!",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const faqs = [
    {
      question: "Are these discount codes really free?",
      answer: "Yes! All discount codes on our platform are completely free to use. We earn a small commission through affiliate partnerships when you purchase through our links, but this never affects your discount."
    },
    {
      question: "How often are codes updated?",
      answer: "We update our codes daily and verify them regularly. Expired codes are automatically marked, and we work directly with prop firms to bring you the latest deals."
    },
    {
      question: "What if a code doesn't work?",
      answer: "While we verify all codes regularly, occasionally a code may expire early or reach its usage limit. If a code doesn't work, try another one or contact us to report the issue."
    },
    {
      question: "Can I use multiple codes?",
      answer: "Most prop firms only allow one discount code per purchase. Check the firm's terms and conditions for their specific policy on code stacking."
    },
    {
      question: "Do you work with the prop firms?",
      answer: "Yes! We have partnerships with many prop firms to bring you exclusive deals. This helps us maintain the site and continue providing free discount codes to traders."
    }
  ];

  const tips = [
    {
      icon: Zap,
      title: "Act Fast",
      description: "Popular discount codes can expire quickly or reach usage limits. When you find a good deal, don't wait!"
    },
    {
      icon: Shield,
      title: "Verify Terms",
      description: "Always read the prop firm's terms and conditions before purchasing to understand the evaluation rules."
    },
    {
      icon: CheckCircle,
      title: "Check Expiry Dates",
      description: "Use our countdown timers to see exactly how long each code remains valid."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">How It Works</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">Save money on prop firm evaluations in 4 simple steps</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`bg-gradient-to-r ${step.color} p-4 rounded-full`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-500 mb-2">STEP {index + 1}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pro Tips</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get the most out of your discount codes with these helpful tips</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about using our discount codes</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Saving?</h2>
            <p className="text-xl text-blue-100 mb-8">Browse our discount codes and start your prop trading journey today</p>
            <a href="/" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">View All Discount Codes</a>
          </div>
        </div>
      </section>
    </div>
  );
}