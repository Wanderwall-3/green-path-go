import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Trophy, Users, Calendar, Target } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  target_reduction: number;
}

interface Participation {
  challenge_id: string;
  joined_at: string;
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchChallenges();
      fetchParticipations();
      fetchUserProgress();
    }
  }, [user]);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load challenges",
        variant: "destructive",
      });
    }
  };

  const fetchParticipations = async () => {
    try {
      const { data, error } = await supabase
        .from('challenge_participants')
        .select('challenge_id, joined_at')
        .eq('user_id', user?.id);

      if (error) throw error;
      setParticipations(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load participations",
        variant: "destructive",
      });
    }
  };

  const fetchUserProgress = async () => {
    try {
      // Get user's waste logs for each challenge category
      const { data: wasteLogs, error } = await supabase
        .from('waste_logs')
        .select('category, quantity, date')
        .eq('user_id', user?.id);

      if (error) throw error;

      // Calculate progress for each challenge
      const progress: Record<string, number> = {};
      challenges.forEach(challenge => {
        const relevantLogs = (wasteLogs || []).filter(log => 
          log.category === challenge.category &&
          new Date(log.date) >= new Date(challenge.start_date) &&
          new Date(log.date) <= new Date(challenge.end_date)
        );
        
        const totalReduction = relevantLogs.reduce((sum, log) => sum + log.quantity, 0);
        progress[challenge.id] = Math.min((totalReduction / challenge.target_reduction) * 100, 100);
      });

      setUserProgress(progress);
    } catch (error: any) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinChallenge = async (challengeId: string) => {
    try {
      const { error } = await supabase
        .from('challenge_participants')
        .insert({
          challenge_id: challengeId,
          user_id: user?.id
        });

      if (error) throw error;

      toast({
        title: "Challenge Joined!",
        description: "You've successfully joined the challenge. Good luck!",
      });

      fetchParticipations();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const leaveChallenge = async (challengeId: string) => {
    try {
      const { error } = await supabase
        .from('challenge_participants')
        .delete()
        .match({
          challenge_id: challengeId,
          user_id: user?.id
        });

      if (error) throw error;

      toast({
        title: "Left Challenge",
        description: "You've left the challenge.",
      });

      fetchParticipations();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isParticipating = (challengeId: string) => {
    return participations.some(p => p.challenge_id === challengeId);
  };

  const isActive = (challenge: Challenge) => {
    const now = new Date();
    const start = new Date(challenge.start_date);
    const end = new Date(challenge.end_date);
    return now >= start && now <= end;
  };

  const isUpcoming = (challenge: Challenge) => {
    const now = new Date();
    const start = new Date(challenge.start_date);
    return now < start;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/home')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Community Challenges</h1>
            <p className="text-muted-foreground">Join challenges to reduce waste together</p>
          </div>
        </div>

        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className={isActive(challenge) ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                      {isActive(challenge) && (
                        <Badge variant="default">Active</Badge>
                      )}
                      {isUpcoming(challenge) && (
                        <Badge variant="secondary">Upcoming</Badge>
                      )}
                      {!isActive(challenge) && !isUpcoming(challenge) && (
                        <Badge variant="outline">Ended</Badge>
                      )}
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </div>
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(challenge.start_date).toLocaleDateString()} - {new Date(challenge.end_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span>Target: {challenge.target_reduction} kg reduction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{challenge.category}</Badge>
                  </div>
                </div>

                {isParticipating(challenge.id) && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Progress</span>
                      <span>{userProgress[challenge.id]?.toFixed(1) || 0}%</span>
                    </div>
                    <Progress value={userProgress[challenge.id] || 0} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {((userProgress[challenge.id] || 0) / 100 * challenge.target_reduction).toFixed(1)} kg of {challenge.target_reduction} kg target
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  {isParticipating(challenge.id) ? (
                    <Button variant="destructive" onClick={() => leaveChallenge(challenge.id)}>
                      Leave Challenge
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => joinChallenge(challenge.id)}
                      disabled={!isActive(challenge) && !isUpcoming(challenge)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Join Challenge
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {challenges.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Challenges Available</h3>
                <p className="text-muted-foreground">Check back later for new community challenges!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}