
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import NotificationPanel from '@/components/ui/NotificationPanel';

const Index = () => {
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
  
  return (
    <Layout>
      <Dashboard />
      <NotificationPanel 
        isOpen={isNotificationPanelOpen} 
        onClose={() => setNotificationPanelOpen(false)} 
      />
    </Layout>
  );
};

export default Index;
