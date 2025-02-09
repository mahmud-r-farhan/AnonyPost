import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import PostDetail from "./pages/PostDetail"
import About from "./pages/About"
import Support from "./pages/Support"
import Terms from "./pages/Terms"
import Chat from "./pages/Chat"
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import Sidebar from "./components/Sidebar";
import { AvatarProvider } from './contexts/AvatarContext';

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AvatarProvider>
          <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <div className="flex">
                  <Sidebar />
                  <main className="lg:ml-64 w-full">
                    <div className="container mx-auto px-4 py-8 max-w-4xl">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/*/*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </main>
                </div>
                <Toaster position="top-right" expand={true} richColors />
              </div>
          </Router>
        </AvatarProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App

