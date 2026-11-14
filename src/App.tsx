import React, { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ObservatoryProvider, useObservatory } from './context/ObservatoryContext';
import { PERSONA_CARDS } from './data/experiencesData';
import { EARTH_ANALOG_SITES, HERO_ASSETS } from './data/planetaryData';
import { AboutPage } from './pages/AboutPage';
import { AstronautHubPage } from './pages/AstronautHubPage';
import { ComparePage } from './pages/ComparePage';
import { ExplorerHubPage } from './pages/ExplorerHubPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { HomePage } from './pages/HomePage';
import { LocationDetailPage } from './pages/LocationDetailPage';
import { MarsPage } from './pages/MarsPage';
import { MoonPage } from './pages/MoonPage';
import { ScientistHubPage } from './pages/ScientistHubPage';
import { SettingsPage } from './pages/SettingsPage';
import { StudentHubPage } from './pages/StudentHubPage';
import { WelcomePage } from './pages/WelcomePage';

const PRELOAD_URLS = Array.from(
  new Set([
    ...PERSONA_CARDS.map((c) => c.image),
    HERO_ASSETS.earthOrbit,
    HERO_ASSETS.moonSurface,
    HERO_ASSETS.marsSurface,
    ...EARTH_ANALOG_SITES.map((s) => s.image),
  ])
);

const ObservatoryShell: React.FC = () => {
  const { route } = useObservatory();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      PRELOAD_URLS.forEach((url) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      });
    }, 60);
    return () => window.clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (route.page) {
      case 'welcome':
        return <WelcomePage />;
      case 'explorer-hub':
        return <ExplorerHubPage />;
      case 'student-hub':
        return <StudentHubPage />;
      case 'scientist-hub':
        return <ScientistHubPage />;
      case 'astronaut-hub':
        return <AstronautHubPage />;
      case 'about':
        return <AboutPage />;
      case 'settings':
        return <SettingsPage />;
      case 'moon':
        return <MoonPage />;
      case 'mars':
        return <MarsPage />;
      case 'explorer':
        return <ExplorerPage />;
      case 'location':
        return <LocationDetailPage />;
      case 'compare':
        return <ComparePage />;
      case 'home':
        return <HomePage />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F7F8FA] dark:bg-[#010205] space-void-backdrop text-[#101B2B] dark:text-[#F5F7FA] transition-colors duration-200">
      {/* Subtle fixed starfield layer visible in dark mode */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-0 dark:opacity-100 space-void-stars"
        aria-hidden="true"
      />
      {/* Subtle fixed terminal scanline overlay visible in dark mode */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-0 dark:opacity-100 space-scanline-overlay"
        aria-hidden="true"
      />
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div key={`${route.page}-${route.locationId}`}>{renderPage()}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ObservatoryProvider>
      <ObservatoryShell />
    </ObservatoryProvider>
  );
}
