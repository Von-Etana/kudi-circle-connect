import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Users, Shield, Wallet, Vote, Bell, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Features = () => {
  const mainFeatures = [
    {
      icon: Coins,
      title: "Ajo (Thrift Contributions)",
      description: "Traditional rotating savings system with automated tracking",
      details: [
        "Weekly, monthly, or custom contribution cycles",
        "Automatic payout rotation with calendar view",
        "Payment history and contribution tracking",
        "SMS and email reminders for members"
      ],
      color: "bg-emerald-500"
    },
    {
      icon: Users,
      title: "Community Dues Management",
      description: "Streamlined dues collection and tracking for groups",
      details: [
        "Flexible payment schedules (daily, weekly, monthly)",
        "Outstanding dues dashboard with alerts",
        "Payment history and receipt generation",
        "Multi-tier reminder system"
      ],
      color: "bg-blue-500"
    },
    {
      icon: Wallet,
      title: "Crowdfunding & Fundraising",
      description: "Raise funds for community causes and individual needs",
      details: [
        "Create campaigns for medical, education, events",
        "Real-time progress tracking and goal visualization",
        "Social sharing and community engagement",
        "Transparent fund allocation reports"
      ],
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Trustee Governance",
      description: "Democratic fund management with multi-signature approvals",
      details: [
        "Elect trustees through in-app voting",
        "Minimum 2-trustee approval for disbursements",
        "Complete audit trail of all decisions",
        "Role-based access and permissions"
      ],
      color: "bg-amber-500"
    },
    {
      icon: Vote,
      title: "Voting System",
      description: "Democratic decision-making for community governance",
      details: [
        "Trustee elections with secure voting",
        "Community polls and decision-making",
        "Voting history and result tracking",
        "Anonymous and transparent voting options"
      ],
      color: "bg-red-500"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Stay informed with intelligent alerts and reminders",
      details: [
        "Payment due reminders and confirmations",
        "Voting event notifications",
        "Campaign updates and milestones",
        "Trustee approval status alerts"
      ],
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kudi Circle</h1>
                <p className="text-xs text-emerald-600">Community Financial Management</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-emerald-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</Link>
              <Link to="/dashboard">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Get Started
                </Button>
              </Link>
            </nav>
            <div className="md:hidden">
              <Link to="/dashboard">
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Features for
              <span className="text-emerald-600"> Community Finance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything your community needs to manage finances transparently, 
              securely, and efficiently in one powerful platform.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="border-emerald-100 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <CardHeader className="p-8">
                    <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-emerald-800 mb-4">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-lg">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                    <ul className="space-y-3">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Nigerian Communities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Features designed specifically for the unique needs of Nigerian financial practices
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-emerald-100 text-center">
              <CardHeader>
                <FileText className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-emerald-800">Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete transparency with detailed logs of all transactions, 
                  votes, and trustee decisions for accountability.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-emerald-100 text-center">
              <CardHeader>
                <Wallet className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-emerald-800">Local Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Integration with Paystack, Flutterwave, and other Nigerian 
                  payment gateways for seamless transactions.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-emerald-100 text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-emerald-800">Trust Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Member trust scores based on payment history and participation 
                  to build reliable community networks.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-lg text-emerald-100 mb-8">
            Start your community's financial transformation today with Kudi Circle
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Features;
