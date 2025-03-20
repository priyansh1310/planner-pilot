
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, Brain, Clock, Target, Trophy } from 'lucide-react';
import Card from '../common/Card';

type FormValues = {
  subjects: string[];
  hoursPerDay: number;
  weakSubjects: string[];
  targetScore: number;
  isJeeNeet: boolean;
  examDate: string;
}

const StudyPlanGenerator = () => {
  const { toast } = useToast();
  const [generatedPlan, setGeneratedPlan] = useState<boolean>(false);
  
  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", 
    "English", "Computer Science", "History", "Geography"
  ];
  
  const form = useForm<FormValues>({
    defaultValues: {
      subjects: [],
      hoursPerDay: 4,
      weakSubjects: [],
      targetScore: 80,
      isJeeNeet: false,
      examDate: ""
    }
  });
  
  const onSubmit = (data: FormValues) => {
    toast({
      title: "Study Plan Generated",
      description: "Your personalized study plan has been created based on your preferences.",
    });
    setGeneratedPlan(true);
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Personalized Study Plan Generator</h2>
          <p className="text-muted-foreground">Create a customized study plan based on your preferences and goals</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Focus Subjects</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange([...field.value, value])}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subjects" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((subject) => (
                        <div 
                          key={subject}
                          className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center"
                        >
                          {subject}
                          <button 
                            type="button"
                            className="ml-2 h-4 w-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs"
                            onClick={() => field.onChange(field.value.filter(s => s !== subject))}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <FormDescription>
                      Select the subjects you want to focus on
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weakSubjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weak Subjects</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange([...field.value, value])}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select weak subjects" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((subject) => (
                        <div 
                          key={subject}
                          className="bg-destructive/10 text-destructive rounded-full px-3 py-1 text-sm flex items-center"
                        >
                          {subject}
                          <button 
                            type="button"
                            className="ml-2 h-4 w-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs"
                            onClick={() => field.onChange(field.value.filter(s => s !== subject))}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <FormDescription>
                      Subjects you need more focus on
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hoursPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Study Hours Per Day</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={1}
                          max={12}
                          step={0.5}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">1 hour</span>
                          <span className="text-sm font-medium">{field.value} hours</span>
                          <span className="text-sm text-muted-foreground">12 hours</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      How many hours can you dedicate to studying each day?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="targetScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Score/Rank</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your target score or rank"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your target score or rank for the exam
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="examDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      When is your exam scheduled?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isJeeNeet"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">JEE/NEET Focused</FormLabel>
                      <FormDescription>
                        Optimize study plan for JEE/NEET preparation
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full">Generate Study Plan</Button>
          </form>
        </Form>
      </Card>
      
      {generatedPlan && (
        <Card className="p-6 mt-6 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              Your Personalized Study Plan
            </h2>
            <p className="text-muted-foreground">AI-optimized based on your preferences and learning style</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-start space-x-3">
              <Brain className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Focus Areas</h3>
                <p className="text-sm text-muted-foreground">Mathematics, Physics, Chemistry</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Daily Schedule</h3>
                <p className="text-sm text-muted-foreground">4 hours, optimal time: Morning</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Target className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Target Timeline</h3>
                <p className="text-sm text-muted-foreground">85 days until exam</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 pb-2">
            <h3 className="font-medium mb-4">Weekly Schedule Preview</h3>
            <div className="grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center">
                  <div className="font-medium text-sm mb-2">{day}</div>
                  <div className="bg-primary/10 rounded-md p-2 mb-2 text-xs">Physics (1.5h)</div>
                  <div className="bg-amber-500/10 rounded-md p-2 mb-2 text-xs">Maths (1h)</div>
                  <div className="bg-green-500/10 rounded-md p-2 text-xs">Chemistry (1.5h)</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline">Modify Plan</Button>
            <Button>Save Plan</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StudyPlanGenerator;
