import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteConfigProvider } from '@/context/SiteConfigContext';
import { Toaster } from '@/components/ui/sonner';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <SiteConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
    </SiteConfigProvider>
  );
}

export default App;
