import NavBar from './components/Home/NavBar';
import Hero from './components/Home/Hero';
import About from './components/Home/About';
import Services from './components/Home/Services';
import Portfolio from './components/Home/Portfolio';
import Contact from './components/Home/Contact';
import Footer from './components/Home/Footer';

const App = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Contact />
            <Footer />
        </>
    );
};

export default App;