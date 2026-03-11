import Header from "./components/Header";
import Banner from "./components/Banner";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="page">
      <Header />
      <main className="container">
        <Banner />
        <Features />
      </main>
      <Footer />
    </div>
  );
}