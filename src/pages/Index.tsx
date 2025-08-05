import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Recycle, TrendingDown, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Leaf className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            EcoTracker
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Track your waste, reduce your impact, and join a community committed to environmental sustainability.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose EcoTracker?</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to manage and reduce your environmental footprint
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-chart-1/10 rounded-full">
                  <TrendingDown className="h-8 w-8 text-chart-1" />
                </div>
              </div>
              <CardTitle>Track Your Waste</CardTitle>
              <CardDescription>
                Log your daily waste and watch your environmental impact decrease over time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-chart-2/10 rounded-full">
                  <Users className="h-8 w-8 text-chart-2" />
                </div>
              </div>
              <CardTitle>Join Challenges</CardTitle>
              <CardDescription>
                Participate in community challenges and compete with others to reduce waste
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-chart-3/10 rounded-full">
                  <Recycle className="h-8 w-8 text-chart-3" />
                </div>
              </div>
              <CardTitle>Learn & Improve</CardTitle>
              <CardDescription>
                Access educational resources and find local recycling services near you
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Make a Difference?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of users already reducing their environmental impact with EcoTracker
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/register">
              <Button size="lg" className="text-lg px-12">
                Start Your Journey
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
