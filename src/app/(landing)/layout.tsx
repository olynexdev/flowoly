import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default LandingLayout;
