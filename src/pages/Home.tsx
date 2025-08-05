import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from '@/hooks/use-toast';
import { Leaf, LogOut, PlusCircle, Trophy, BookOpen, MapPin, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WasteLog {
  id: string;
  date: string;
  category: string;
  item_name: string;
  quantity: number;
}

interface Profile {
  name: string;
  community: string;
}

export default function Home() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [wasteLogs, setWasteLogs] = useState<WasteLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchWasteLogs();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, community')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    }
  };

  const fetchWasteLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('waste_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setWasteLogs(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load waste logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  // Prepare chart data
  const weeklyData = wasteLogs.reduce((acc: any[], log) => {
    const date = new Date(log.date).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.quantity += log.quantity;
    } else {
      acc.push({ date, quantity: log.quantity });
    }
    return acc;
  }, []).slice(0, 7).reverse();

  const categoryData = wasteLogs.reduce((acc: any[], log) => {
    const existing = acc.find(item => item.category === log.category);
    if (existing) {
      existing.quantity += log.quantity;
    } else {
      acc.push({ category: log.category, quantity: log.quantity });
    }
    return acc;
  }, []);

  const COLORS = {
    'Recyclable': '#10b981',
    'Compostable': '#f59e0b',
    'Landfill': '#ef4444'
  };

  const totalWaste = wasteLogs.reduce((sum, log) => sum + log.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">EcoTracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{profile?.name}</p>
              <p className="text-sm text-muted-foreground">{profile?.community}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/log-waste">
            <Button className="w-full h-16 flex flex-col gap-1">
              <PlusCircle className="h-5 w-5" />
              <span className="text-sm">Log Waste</span>
            </Button>
          </Link>
          <Link to="/challenges">
            <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
              <Trophy className="h-5 w-5" />
              <span className="text-sm">Challenges</span>
            </Button>
          </Link>
          <Link to="/education">
            <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Learn</span>
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Services</span>
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Waste Logged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWaste.toFixed(1)} kg</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 inline mr-1" />
                Track your progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Entries This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wasteLogs.length}</div>
              <p className="text-xs text-muted-foreground">Keep logging daily</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Most Common Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categoryData.length > 0 
                  ? categoryData.reduce((a, b) => a.quantity > b.quantity ? a : b).category
                  : 'None'
                }
              </div>
              <p className="text-xs text-muted-foreground">Focus area for reduction</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Waste Trend</CardTitle>
              <CardDescription>Your daily waste logging over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="quantity" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Waste by Category</CardTitle>
              <CardDescription>Distribution of your waste types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="quantity"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.category as keyof typeof COLORS]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {categoryData.map((entry) => (
                  <div key={entry.category} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[entry.category as keyof typeof COLORS] }}
                    />
                    <span className="text-sm">{entry.category}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Waste Logs</CardTitle>
            <CardDescription>Your latest waste entries</CardDescription>
          </CardHeader>
          <CardContent>
            {wasteLogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No waste logs yet</p>
                <Link to="/log-waste">
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Log Your First Entry
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {wasteLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline"
                        style={{ 
                          borderColor: COLORS[log.category as keyof typeof COLORS],
                          color: COLORS[log.category as keyof typeof COLORS]
                        }}
                      >
                        {log.category}
                      </Badge>
                      <div>
                        <p className="font-medium">{log.item_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(log.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{log.quantity} kg</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}