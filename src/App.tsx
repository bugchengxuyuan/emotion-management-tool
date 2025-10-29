import { AppProvider, useApp } from '@/contexts/AppContext';
import Layout from '@/components/layout/Layout';
import EmotionCheckpoint from '@/components/checkpoint/EmotionCheckpoint';
import Dashboard from '@/components/dashboard/Dashboard';
import EmotionTracker from '@/components/emotion-tracker/EmotionTracker';
import ThoughtRecord from '@/components/thought-record/ThoughtRecord';
import CrisisTools from '@/components/crisis-tools/CrisisTools';
import DearManTool from '@/components/communication/DearManTool';
import ProgressAnalysis from '@/components/progress/ProgressAnalysis';
import UsageGuide from '@/components/guide/UsageGuide';

function AppContent() {
  const { state } = useApp();

  const renderContent = () => {
    switch (state.activeTab) {
      case 'checkpoint':
      case 'home':
        return <EmotionCheckpoint />;
      case 'dashboard':
        return <Dashboard />;
      case 'tracker':
        return <EmotionTracker />;
      case 'thought-record':
        return <ThoughtRecord />;
      case 'crisis':
        return <CrisisTools />;
      case 'communication':
        return <DearManTool />;
      case 'progress':
        return <ProgressAnalysis />;
      case 'guide':
        return <UsageGuide />;
      default:
        return <EmotionCheckpoint />;
    }
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return <Layout>{renderContent()}</Layout>;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
