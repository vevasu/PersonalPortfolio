import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Books from "@/components/home/Books";
import Events from "@/components/home/Events";
import Blogs from "@/components/home/Blogs";
import Projects from "@/components/home/Projects";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/lib/types";

export default function Home() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  return (
    <>
      <Helmet>
        <title>{profile?.name || 'Personal Portfolio'}</title>
        <meta name="description" content="Personal portfolio showcasing books, events, blogs, and projects" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style>{`
          .font-heading { font-family: 'Playfair Display', serif; }
          html { scroll-behavior: smooth; }
          body { font-family: 'Inter', sans-serif; }
        `}</style>
      </Helmet>
      
      <Header />
      
      <main>
        <Hero />
        <Books />
        <Events />
        <Blogs />
        <Projects />
      </main>
      
      <Footer />
    </>
  );
}
