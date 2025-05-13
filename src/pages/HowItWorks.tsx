
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How <span className="text-bartr-primary">bartr</span> Works
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Exchange skills with others in your community. No money involved, just people helping people.
            </p>
          </div>
          
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl font-bold mb-4">1. Create Your Profile</h2>
                <p className="text-gray-700 mb-4">
                  Sign up and create a profile that showcases your skills and what you want to learn. 
                  Be specific about your expertise and what you're looking to get in return.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Add skills you can offer</li>
                  <li>Add skills you want to learn</li>
                  <li>Specify your availability and location</li>
                  <li>Upload a profile photo that shows your personality</li>
                </ul>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-full max-w-xs p-6 bg-bartr-light rounded-lg shadow-md">
                  <div className="mb-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-bartr-primary text-white flex items-center justify-center text-3xl font-bold">
                      1
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 rounded-full bg-bartr-primary/30"></div>
                    <div className="h-4 rounded-full bg-bartr-primary/30 w-3/4"></div>
                    <div className="h-4 rounded-full bg-bartr-primary/30 w-1/2"></div>
                    <div className="h-10 rounded-lg bg-bartr-primary/30 w-full mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <div className="w-full max-w-xs p-6 bg-bartr-light rounded-lg shadow-md">
                  <div className="mb-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-bartr-secondary text-white flex items-center justify-center text-3xl font-bold">
                      2
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-32 rounded-lg bg-bartr-secondary/30"></div>
                    <div className="h-32 rounded-lg bg-bartr-secondary/30"></div>
                    <div className="h-32 rounded-lg bg-bartr-secondary/30"></div>
                    <div className="h-32 rounded-lg bg-bartr-secondary/30"></div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">2. Discover Matches</h2>
                <p className="text-gray-700 mb-4">
                  Our matching algorithm finds people whose skills and needs complement yours.
                  Browse through potential matches and connect with people you'd like to swap skills with.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>View suggested matches on your dashboard</li>
                  <li>Browse the skills marketplace</li>
                  <li>Filter by category, location, and availability</li>
                </ul>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl font-bold mb-4">3. Connect & Exchange</h2>
                <p className="text-gray-700 mb-4">
                  When you find a good match, send a connection request. Once accepted, you can 
                  message each other to arrange your skill swap sessions.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Message directly within the platform</li>
                  <li>Schedule your skill exchange sessions</li>
                  <li>Meet in person or connect virtually</li>
                  <li>Learn and teach simultaneously</li>
                </ul>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-full max-w-xs p-6 bg-bartr-light rounded-lg shadow-md">
                  <div className="mb-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-bartr-primary text-white flex items-center justify-center text-3xl font-bold">
                      3
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2 items-center mb-4">
                      <div className="h-8 w-8 rounded-full bg-bartr-primary/30"></div>
                      <div className="h-4 flex-1 rounded-full bg-bartr-primary/30"></div>
                    </div>
                    <div className="flex gap-2 items-center justify-end mb-4">
                      <div className="h-4 flex-1 rounded-full bg-bartr-secondary/30"></div>
                      <div className="h-8 w-8 rounded-full bg-bartr-secondary/30"></div>
                    </div>
                    <div className="flex gap-2 items-center mb-4">
                      <div className="h-8 w-8 rounded-full bg-bartr-primary/30"></div>
                      <div className="h-4 flex-1 rounded-full bg-bartr-primary/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to start?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-bartr-primary hover:bg-bartr-dark" asChild>
                <Link to="/signup">Sign up now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/explore">Browse skills</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
