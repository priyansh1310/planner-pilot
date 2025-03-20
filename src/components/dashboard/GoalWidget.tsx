
import React, { useState } from 'react';
import { Target, Check, Plus, Edit, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import { cn } from '@/lib/utils';

interface GoalProps {
  id: string;
  title: string;
  completed: boolean;
}

interface GoalWidgetProps {
  className?: string;
}

const GoalWidget = ({ className }: GoalWidgetProps) => {
  const [goals, setGoals] = useState<GoalProps[]>([
    { id: '1', title: 'Complete 3 study sessions this week', completed: false },
    { id: '2', title: 'Master the calculus fundamentals', completed: false },
    { id: '3', title: 'Review physics notes before Friday', completed: true }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  
  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };
  
  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals([
        ...goals, 
        { 
          id: Date.now().toString(), 
          title: newGoal, 
          completed: false 
        }
      ]);
      setNewGoal('');
      setIsEditing(false);
    }
  };

  return (
    <Card className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Your Study Goals</h3>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          {isEditing ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>
      
      {isEditing && (
        <form onSubmit={addGoal} className="flex space-x-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button 
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Add
          </button>
        </form>
      )}
      
      <ul className="space-y-3">
        {goals.map((goal) => (
          <li 
            key={goal.id}
            className="flex items-start space-x-3 group animate-fade-in"
          >
            <button
              onClick={() => toggleGoalCompletion(goal.id)}
              className={cn(
                "mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 transition-colors",
                goal.completed 
                  ? "bg-primary border-primary text-primary-foreground flex items-center justify-center" 
                  : "border-muted-foreground"
              )}
            >
              {goal.completed && <Check className="h-3 w-3" />}
            </button>
            <span className={cn(
              "text-sm transition-colors",
              goal.completed && "line-through text-muted-foreground"
            )}>
              {goal.title}
            </span>
          </li>
        ))}
      </ul>
      
      <div className="pt-2">
        <button className="inline-flex items-center space-x-1 text-sm font-medium text-primary transition-colors hover:text-primary-light">
          <span>View all goals</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};

export default GoalWidget;
