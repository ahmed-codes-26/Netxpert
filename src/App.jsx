import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/Common/ScrollToTop';
import NavBar from './components/Home/NavBar';
import Footer from './components/Home/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;