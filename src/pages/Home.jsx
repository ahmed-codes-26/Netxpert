import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Services from '../components/Home/Services';
import Portfolio from '../components/Home/Portfolio';
import Contact from '../components/Home/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Contact />
        </main>
    );
};

export default Home;
