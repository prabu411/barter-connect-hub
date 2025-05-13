
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { categories } from "@/data/mockData";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-bartr-light pt-10 pb-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                Exchange Skills, <span className="text-bartr-primary">Grow Together</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                Find people who want to learn what you know, and teach what you want to learn. No money involved.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {isAuthenticated ? (
                  <Button size="lg" className="bg-bartr-primary hover:bg-bartr-dark" asChild>
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <Button size="lg" className="bg-bartr-primary hover:bg-bartr-dark" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                )}
                <Button size="lg" variant="outline" asChild>
                  <Link to="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bartr-primary rounded-full w-72 h-72 opacity-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="People collaborating"
                  className="rounded-xl shadow-xl relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 bg-bartr-secondary rounded-lg p-4 shadow-lg">
                  <p className="font-bold text-white text-xl">100+ Skills</p>
                  <p className="text-white text-sm">Ready to be exchanged</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">Simple steps to start exchanging skills</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Create Your Profile",
                description: "Sign up and add skills you can offer and skills you want to learn.",
                icon: "📝"
              },
              {
                step: 2,
                title: "Find Matches",
                description: "Browse the marketplace or get automatically matched with compatible users.",
                icon: "🔍"
              },
              {
                step: 3,
                title: "Exchange Skills",
                description: "Connect, schedule sessions, and start teaching and learning.",
                icon: "🤝"
              }
            ].map((item) => (
              <div key={item.step} className="bg-bartr-light rounded-lg p-8 text-center">
                <div className="inline-flex items-center justify-center bg-bartr-primary text-white rounded-full w-16 h-16 text-2xl mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-bartr-primary hover:bg-bartr-dark">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Explore Skill Categories</h2>
            <p className="mt-4 text-xl text-gray-600">Discover the variety of skills our community offers</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/explore?category=${category}`}
                className="group bg-white rounded-lg shadow-sm p-6 text-center transition-all hover:shadow-md hover:scale-105"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-bartr-primary">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600">Success stories from the Bartr community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I learned Spanish while teaching web development. It's been an incredible experience that money couldn't buy.",
                name: "Alex J.",
                role: "Web Developer",
                avatar: "https://i.pravatar.cc/150?img=1"
              },
              {
                quote: "Teaching cooking and learning photography has enriched my life and helped me make amazing new friends.",
                name: "Jamie S.",
                role: "Chef",
                avatar: "https://i.pravatar.cc/150?img=2"
              },
              {
                quote: "As a musician, I've found students who are eager to learn guitar, and in return I've improved my design skills.",
                name: "Taylor W.",
                role: "Musician",
                avatar: "https://i.pravatar.cc/150?img=3"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-bartr-light rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-bartr-primary to-bartr-dark">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Exchanging Skills?</h2>
          <p className="text-xl text-bartr-light mb-8 max-w-xl mx-auto">
            Join our community today and start learning new skills while sharing your expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-bartr-primary hover:bg-gray-100" asChild>
              <Link to="/signup">Sign Up Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-bartr-primary/20" asChild>
              <Link to="/explore">Browse Skills</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
