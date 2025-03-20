
import React from 'react';
import Layout from '@/components/layout/Layout';
import StudyPlan from '@/components/studyplan/StudyPlan';
import StudyPlanGenerator from '@/components/studyplan/StudyPlanGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudyPlanPage = () => {
  return (
    <Layout>
      <div className="container py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your Study Plan</h1>
          <p className="text-muted-foreground">
            AI-optimized study schedule based on your learning patterns and goals.
          </p>
        </div>
        
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="current">Current Plan</TabsTrigger>
            <TabsTrigger value="generator">Plan Generator</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <StudyPlan />
          </TabsContent>
          <TabsContent value="generator">
            <StudyPlanGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudyPlanPage;
