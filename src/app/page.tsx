 "use client";
 
import { useState, useEffect, useRef } from "react";
import { Menu, Search, Play, ChevronDown, ArrowRight } from "lucide-react";
import ThreeScene from "./components/ThreeScene";

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Simulate loading time for 3D scene
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToVideo = () => {
    const videoSection = document.getElementById("video-section");
    videoSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">VIGNAM</div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#simulations" className="hover:text-blue-400 transition-colors">Simulations</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          </div>

          <button className="md:hidden"  >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section with 3D Model */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0">
          <ThreeScene isLoading={isLoading} />
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/60 text-sm">Loading 3D Experience...</p>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              VIGNAM
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-8 text-white/80">
            Text to Simulations
          </h2>
          
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into interactive scientific simulations with the power of AI. 
            Explore pre-built simulations across various scientific topics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToVideo}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
            
            <button className="group border border-white/30 hover:border-white/60 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/10 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See VIGNAM in Action
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover how our Text to Simulations technology transforms complex scientific concepts 
              into interactive, engaging experiences.
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              ref={videoRef}
              src="https://www.youtube.com/embed/E1czmX6bjFA?start=10&autoplay=0&rel=0&modestbranding=1"
              title="Vignam Text to Simulations Demo"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Everything you need to create, explore, and learn through interactive simulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Generation",
                description: "Transform natural language descriptions into complex scientific simulations instantly.",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
              },
              {
                title: "Pre-built Simulations",
                description: "Access a vast library of ready-to-use simulations across multiple scientific domains.",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop"
              },
              {
                title: "Interactive Learning",
                description: "Engage with dynamic, responsive simulations that adapt to your learning pace.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
              },
              {
                title: "Real-time Physics",
                description: "Experience accurate physics simulations with real-time calculations and feedback.",
                image: "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=400&h=300&fit=crop"
              },
              {
                title: "Cross-Platform",
                description: "Access your simulations anywhere, on any device, with seamless synchronization.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
              },
              {
                title: "Collaborative Tools",
                description: "Share and collaborate on simulations with peers, teachers, and researchers.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-black/50 rounded-xl p-6 hover:bg-black/70 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulations Gallery */}
      <section id="simulations" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simulation Gallery
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore our collection of interactive scientific simulations across various disciplines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Quantum Mechanics",
                category: "Physics",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop"
              },
              {
                title: "Molecular Dynamics",
                category: "Chemistry",
                image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&h=200&fit=crop"
              },
              {
                title: "Ecosystem Modeling",
                category: "Biology",
                image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop"
              },
              {
                title: "Climate Patterns",
                category: "Earth Science",
                image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop"
              },
              {
                title: "Neural Networks",
                category: "Neuroscience",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
              },
              {
                title: "Fluid Dynamics",
                category: "Engineering",
                image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop"
              },
              {
                title: "Astronomical Bodies",
                category: "Astronomy",
                image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop"
              },
              {
                title: "Genetic Algorithms",
                category: "Computer Science",
                image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop"
              }
            ].map((simulation, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden cursor-pointer">
                <div className="aspect-[4/3] relative">
                  <img 
                    src={simulation.image} 
                    alt={simulation.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-xs text-blue-400 font-medium mb-1">{simulation.category}</div>
                  <div className="text-sm font-semibold">{simulation.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Learning?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of educators, students, and researchers who are revolutionizing 
            scientific education with VIGNAM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">VIGNAM</div>
              <p className="text-white/60 text-sm leading-relaxed">
                Transforming scientific education through AI-powered simulations and interactive learning experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Simulations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2024 VIGNAM. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 z-50 shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronDown className="w-6 h-6 rotate-180" />
        </button>
      )}

      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}