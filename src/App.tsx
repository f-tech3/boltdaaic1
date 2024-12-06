import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { EventList } from './components/EventList';
import { SponsorsPage } from './components/SponsorsPage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Terms } from './components/Terms';
import { useEventStore } from './store/eventStore';
import { useThemeStore } from './store/themeStore';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFilterBar?: boolean;
}

function Layout({ children, showHeader = false, showFilterBar = false }: LayoutProps) {
  const [currentPage, setCurrentPage] = React.useState<'events' | 'sponsors'>('events');

  const handlePageChange = (page: 'events' | 'sponsors') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar onPageChange={handlePageChange} currentPage={currentPage} />
      <div className="flex-1 flex flex-col">
        {showHeader && <Header />}
        {showFilterBar && <FilterBar />}
        <main className="flex-1 bg-slate-50 dark:bg-slate-900">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

function MainContent() {
  return <EventList />;
}

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout showHeader showFilterBar>
            <MainContent />
          </Layout>
        } />
        <Route path="/sponsors" element={
          <Layout>
            <SponsorsPage />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <AboutPage />
          </Layout>
        } />
        <Route path="/privacy" element={
          <Layout>
            <PrivacyPolicy />
          </Layout>
        } />
        <Route path="/terms" element={
          <Layout>
            <Terms />
          </Layout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;