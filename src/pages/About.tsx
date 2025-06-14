
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Target, Users, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We believe in complete transparency in financial management with robust security measures."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Built by Nigerians for Nigerian communities, understanding local financial practices."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Leveraging technology to modernize traditional financial systems while preserving cultural values."
    }
  ];

  const team = [
    {
      name: "Adebayo Johnson",
      role: "CEO & Co-Founder",
      bio: "Former fintech executive with 15+ years experience in Nigerian financial services."
    },
    {
      name: "Ngozi Okafor",
      role: "CTO & Co-Founder",
      bio: "Software engineer passionate about building solutions for African communities."
    },
    {
      name: "Ibrahim Musa",
      role: "Head of Product",
      bio: "Product strategist focused on user experience and community engagement."
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
              <Link to="/features" className="text-gray-600 hover:text-emerald-600 transition-colors">Features</Link>
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
              About <span className="text-emerald-600">Kudi Circle</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to modernize community financial management 
              while preserving the trust and collaboration that makes Nigerian communities strong.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To empower Nigerian communities with transparent, secure, and efficient 
                financial management tools that honor traditional practices while embracing 
                modern technology.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We understand that financial trust is the foundation of strong communities. 
                That's why we've built Kudi Circle to provide the transparency, security, 
                and accountability that communities need to thrive.
              </p>
              <Link to="/dashboard">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Join Our Community
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-emerald-800 mb-2">₦2.5B+</h3>
                <p className="text-emerald-600">Funds Managed</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">500+</h3>
                <p className="text-blue-600">Communities</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-purple-800 mb-2">10,000+</h3>
                <p className="text-purple-600">Active Users</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-amber-800 mb-2">99.9%</h3>
                <p className="text-amber-600">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Kudi Circle
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-emerald-100 text-center">
                <CardHeader>
                  <value.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <CardTitle className="text-emerald-800">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals committed to empowering Nigerian communities
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-emerald-100 text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-emerald-800">{member.name}</CardTitle>
                  <CardDescription className="text-emerald-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Kudi Circle was born from a simple observation: Nigerian communities have always 
              been incredibly resourceful in managing collective finances, but traditional methods 
              often lack the transparency and security needed in today's world.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our founders, having grown up participating in Ajo groups and community dues collection, 
              saw firsthand how trust could be easily broken by poor record-keeping or lack of transparency. 
              They envisioned a platform that would preserve the collaborative spirit of Nigerian 
              communities while providing modern tools for accountability.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Today, Kudi Circle serves hundreds of communities across Nigeria, from small family 
              groups to large estate associations, helping them manage billions of naira with 
              complete transparency and trust.
            </p>
            <Link to="/contact">
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
