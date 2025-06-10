
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ChatProvider } from '@/contexts/ChatContext';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import Blog from '@/pages/dashboard/Blog';
import Jobs from '@/pages/dashboard/Jobs';
import JobDetails from '@/pages/dashboard/JobDetails';
import MyJobs from '@/pages/dashboard/MyJobs';
import AIAssistant from '@/pages/dashboard/AIAssistant';
import Profile from '@/pages/dashboard/Profile';
import Pricing from '@/pages/dashboard/Pricing';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard routes with layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="blog" element={<Blog />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="jobs/:id" element={<JobDetails />} />
              <Route path="my-jobs" element={<MyJobs />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              <Route path="profile" element={<Profile />} />
              <Route path="pricing" element={<Pricing />} />
            </Route>
            
            {/* Catch all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
