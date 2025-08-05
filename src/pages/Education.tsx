import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Lightbulb, Recycle, Leaf, AlertCircle } from 'lucide-react';

export default function Education() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Recycling Guidelines",
      icon: <Recycle className="h-6 w-6" />,
      color: "bg-blue-500/10 text-blue-700",
      tips: [
        {
          title: "Plastic Recycling",
          content: "Only clean plastic containers with recycling symbols 1-7. Remove caps and lids before recycling.",
          importance: "High"
        },
        {
          title: "Paper & Cardboard",
          content: "Clean paper and cardboard can be recycled. Remove any plastic components like tape or bubble wrap.",
          importance: "High"
        },
        {
          title: "Glass Recycling",
          content: "All glass bottles and jars can be recycled. No need to remove labels, but rinse them clean.",
          importance: "Medium"
        },
        {
          title: "Metal Cans",
          content: "Aluminum and steel cans are highly recyclable. Rinse clean and remove labels if possible.",
          importance: "High"
        }
      ]
    },
    {
      title: "Composting Basics",
      icon: <Leaf className="h-6 w-6" />,
      color: "bg-green-500/10 text-green-700",
      tips: [
        {
          title: "What to Compost",
          content: "Fruit and vegetable scraps, coffee grounds, eggshells, yard trimmings, and shredded paper.",
          importance: "High"
        },
        {
          title: "What NOT to Compost",
          content: "Meat, dairy, oils, pet waste, diseased plants, and weeds with seeds.",
          importance: "High"
        },
        {
          title: "Maintain Your Compost",
          content: "Turn regularly, maintain moisture like a wrung-out sponge, and balance greens with browns.",
          importance: "Medium"
        },
        {
          title: "Indoor Composting",
          content: "Use a countertop composter or worm bin for apartment living. Collect scraps in a sealed container.",
          importance: "Medium"
        }
      ]
    },
    {
      title: "Waste Reduction Tips",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "bg-yellow-500/10 text-yellow-700",
      tips: [
        {
          title: "Buy Only What You Need",
          content: "Plan your purchases and avoid impulse buying. Use shopping lists and meal planning.",
          importance: "High"
        },
        {
          title: "Choose Reusable Items",
          content: "Invest in reusable bags, water bottles, containers, and utensils to reduce single-use items.",
          importance: "High"
        },
        {
          title: "Repair Instead of Replace",
          content: "Fix broken items when possible. Learn basic repair skills or find local repair services.",
          importance: "Medium"
        },
        {
          title: "Digital Over Physical",
          content: "Choose digital receipts, bills, and documents to reduce paper waste.",
          importance: "Low"
        }
      ]
    }
  ];

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "High":
        return <Badge variant="destructive">High Impact</Badge>;
      case "Medium":
        return <Badge variant="secondary">Medium Impact</Badge>;
      case "Low":
        return <Badge variant="outline">Low Impact</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/home')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Educational Resources</h1>
            <p className="text-muted-foreground">Learn how to reduce, reuse, and recycle effectively</p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle>Welcome to EcoTracker Education</CardTitle>
            </div>
            <CardDescription>
              Knowledge is power when it comes to environmental protection. Learn the best practices 
              for waste management and reduction to make a meaningful impact.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-primary">The 3 R's Hierarchy</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Reduce</strong> first (buy less), then <strong>Reuse</strong> (find new purposes), 
                    and finally <strong>Recycle</strong> (process into new materials).
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Educational Categories */}
        <div className="space-y-8">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold">{category.title}</h2>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {category.tips.map((tip, tipIndex) => (
                  <Card key={tipIndex}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                        {getImportanceBadge(tip.importance)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>
              Expand your knowledge with these helpful resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Local Resources</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Contact your local waste management authority</li>
                  <li>• Visit community recycling centers</li>
                  <li>• Join local environmental groups</li>
                  <li>• Attend waste reduction workshops</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Online Learning</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• EPA's recycling guidelines</li>
                  <li>• Composting tutorials and videos</li>
                  <li>• Zero waste lifestyle blogs</li>
                  <li>• Environmental impact calculators</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}