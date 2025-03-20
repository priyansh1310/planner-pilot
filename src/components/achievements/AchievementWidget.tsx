
import React, { useState } from 'react';
import Card from '../common/Card';
import { cn } from '@/lib/utils';
import { Award, Star, Medal, Clock, BookOpen, Flame, Target, Sparkles, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  isNew?: boolean;
  type: 'streak' | 'mastery' | 'milestone' | 'improvement';
}

interface AchievementWidgetProps {
  className?: string;
}

const AchievementWidget = ({ className }: AchievementWidgetProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Sample achievements data
  const achievements: Achievement[] = [
    {
      id: 'achievement-1',
      title: '7-Day Study Streak',
      description: 'You studied for 7 consecutive days!',
      icon: <Flame className="h-5 w-5" />,
      date: 'May 15, 2023',
      isNew: true,
      type: 'streak'
    },
    {
      id: 'achievement-2',
      title: 'Calculus Master',
      description: 'You completed all calculus modules with a score above 90%!',
      icon: <Star className="h-5 w-5" />,
      date: 'May 10, 2023',
      type: 'mastery'
    },
    {
      id: 'achievement-3',
      title: '50 Hours of Learning',
      description: 'You\'ve spent over 50 hours studying this month!',
      icon: <Clock className="h-5 w-5" />,
      date: 'May 8, 2023',
      type: 'milestone'
    },
    {
      id: 'achievement-4',
      title: 'Physics Improvement',
      description: 'Your physics scores improved by 25% over the last month!',
      icon: <TrendingUp className="h-5 w-5" />,
      date: 'May 5, 2023',
      type: 'improvement'
    },
    {
      id: 'achievement-5',
      title: '10 Topics Mastered',
      description: 'You\'ve mastered 10 different study topics!',
      icon: <BookOpen className="h-5 w-5" />,
      date: 'May 1, 2023',
      type: 'milestone'
    },
    {
      id: 'achievement-6',
      title: 'Goal Crusher',
      description: 'You completed all your weekly study goals!',
      icon: <Target className="h-5 w-5" />,
      date: 'April 28, 2023',
      type: 'milestone'
    }
  ];
  
  const filterTypes = [
    { id: 'all', label: 'All', icon: <Award className="h-4 w-4" /> },
    { id: 'streak', label: 'Streaks', icon: <Flame className="h-4 w-4" /> },
    { id: 'mastery', label: 'Mastery', icon: <Star className="h-4 w-4" /> },
    { id: 'milestone', label: 'Milestones', icon: <Medal className="h-4 w-4" /> },
    { id: 'improvement', label: 'Improvements', icon: <TrendingUp className="h-4 w-4" /> }
  ];
  
  const filteredAchievements = activeFilter && activeFilter !== 'all'
    ? achievements.filter(a => a.type === activeFilter)
    : achievements;
  
  const iconColors = {
    streak: 'text-amber-500',
    mastery: 'text-purple-500',
    milestone: 'text-blue-500',
    improvement: 'text-green-500'
  };
  
  const bgColors = {
    streak: 'bg-amber-100 dark:bg-amber-900/30',
    mastery: 'bg-purple-100 dark:bg-purple-900/30',
    milestone: 'bg-blue-100 dark:bg-blue-900/30',
    improvement: 'bg-green-100 dark:bg-green-900/30'
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Achievements</h2>
        
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {filterTypes.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id === 'all' ? null : filter.id)}
              className={cn(
                "flex items-center space-x-1 rounded-full px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
                activeFilter === filter.id || (filter.id === 'all' && !activeFilter)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={cn(
              "relative overflow-hidden transition-all duration-300",
              achievement.isNew && "ring-2 ring-primary ring-offset-2"
            )}
            hoverable
          >
            {achievement.isNew && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  New
                </span>
              </div>
            )}
            
            <div className="flex items-start space-x-4">
              <div className={cn(
                "rounded-full p-3 flex-shrink-0",
                bgColors[achievement.type]
              )}>
                <div className={iconColors[achievement.type]}>
                  {achievement.icon}
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground mt-2">Achieved on {achievement.date}</p>
              </div>
            </div>
            
            {achievement.isNew && (
              <div className="absolute -top-6 -right-6">
                <div className="confetti-container">
                  <div className="confetti bg-yellow-300 animate-confetti-1" style={{ left: '10%' }}></div>
                  <div className="confetti bg-blue-300 animate-confetti-2" style={{ left: '30%' }}></div>
                  <div className="confetti bg-pink-300 animate-confetti-3" style={{ left: '50%' }}></div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementWidget;
