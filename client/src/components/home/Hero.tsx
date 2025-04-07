import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/lib/types";
import { Twitter, GitPullRequest, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer } from "@/lib/motion";

export default function Hero() {
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });
  
  if (isLoading) {
    return (
      <section id="hero" className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded-md mb-6"></div>
              <div className="h-6 w-full bg-gray-200 animate-pulse rounded-md mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded-md mb-8"></div>
              <div className="flex gap-4">
                <div className="h-12 w-36 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="h-12 w-36 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6">
        <motion.div 
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col-reverse md:flex-row items-center"
        >
          <motion.div 
            variants={fadeIn('right', 0.3)}
            className="md:w-1/2 mt-10 md:mt-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Hello, I'm <span className="text-secondary">{profile?.name}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
              {profile?.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#books">
                <Button className="px-6 py-6 bg-secondary text-white rounded-md hover:bg-secondary/90 transition duration-300">
                  Explore My Work
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="px-6 py-6 border border-secondary text-secondary rounded-md hover:bg-secondary/10 transition duration-300">
                  Get In Touch
                </Button>
              </a>
            </div>
            <div className="mt-12 flex space-x-6">
              {profile?.socialLinks.twitter && (
                <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary transition duration-300">
                  <Twitter size={24} />
                </a>
              )}
              {profile?.socialLinks.github && (
                <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary transition duration-300">
                  <GitPullRequest size={24} />
                </a>
              )}
              {profile?.socialLinks.linkedin && (
                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary transition duration-300">
                  <Linkedin size={24} />
                </a>
              )}
              {profile?.socialLinks.medium && (
                <a href={profile.socialLinks.medium} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary transition duration-300">
                  <FileText size={24} />
                </a>
              )}
            </div>
          </motion.div>
          <motion.div 
            variants={fadeIn('left', 0.5)}
            className="md:w-1/2 flex justify-center"
          >
            <img 
              src={profile?.avatar} 
              alt={profile?.name} 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-accent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
