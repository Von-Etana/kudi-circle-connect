import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Users, Shield, Wallet, ArrowRight, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Landing = () => {
  const features = [
    {
      icon: Coins,
      title: "Ajo (Thrift Contributions)",
      description: "Traditional rotating savings with your community groups",
      color: "bg-emerald-500"
    },
    {
      icon: Users,
      title: "Community Dues",
      description: "Track and manage group dues with automated reminders",
      color: "bg-blue-500"
    },
    {
      icon: Wallet,
      title: "Crowdfunding",
      description: "Support causes and raise funds for community projects",
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Trustee Governance",
      description: "Secure fund management with trustee approval system",
      color: "bg-amber-500"
    }
  ];

  const testimonials = [
    {
      name: "Adebayo Ogundimu",
      role: "Community Leader",
      text: "Kudi Circle has transformed how our estate manages funds. Everything is transparent now!",
      rating: 5
    },
    {
      name: "Fatima Ibrahim",
      role: "Ajo Group Admin",
      text: "Managing our weekly contributions has never been easier. Highly recommended!",
      rating: 5
    },
    {
      name: "Chidi Okoro",
      role: "Alumni Association",
      text: "The trustee system gives us confidence in our financial decisions.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kudi Circle</h1>
                <p className="text-xs text-emerald-600">Community Financial Management</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-gray-600 hover:text-emerald-600 transition-colors">Features</Link>
              <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</Link>
              <Link to="/auth">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Get Started
                </Button>
              </Link>
            </nav>
            <div className="md:hidden">
              <Link to="/auth">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Start
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
              Trusted by 10,000+ Communities
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empower Your Community's
              <span className="text-emerald-600"> Financial Future</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of communities using Kudi Circle for transparent, secure, and efficient 
              financial management. From Ajo to crowdfunding, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                  Start Your Community
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything Your Community Needs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial tools designed for Nigerian communities
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-emerald-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-emerald-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">10,000+</h3>
              <p className="text-emerald-100">Active Users</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">₦2.5B+</h3>
              <p className="text-emerald-100">Funds Managed</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">500+</h3>
              <p className="text-emerald-100">Communities</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">99.9%</h3>
              <p className="text-emerald-100">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Communities Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-emerald-100">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Community?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of communities already benefiting from transparent financial management
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
