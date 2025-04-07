import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/types";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetail() {
  const { id } = useParams();
  const projectId = parseInt(id || "0");
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: [`/api/projects/${projectId}`],
    enabled: !!projectId,
  });
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <Skeleton className="h-10 w-36 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <Skeleton className="w-full h-96 rounded-lg mb-6" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
              <div>
                <Skeleton className="h-10 w-3/4 mb-4" />
                <div className="flex flex-wrap gap-2 mb-6">
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-6" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-2/3 mb-6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (error || !project) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
            <Link href="/#projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <motion.main 
        className="pt-24 pb-16"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        animate="show"
      >
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link href="/#projects">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              variants={fadeIn('right', 0.3)}
            >
              <div className="rounded-lg overflow-hidden shadow-lg mb-6 relative">
                {project.featured && (
                  <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 text-sm z-10">
                    Featured
                  </div>
                )}
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                {project.demoLink && (
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-secondary text-white">
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                )}
                
                {project.codeLink && (
                  <a 
                    href={project.codeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">
                      <Github className="mr-2 h-4 w-4" /> Source Code
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn('left', 0.5)}
            >
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{project.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p>{project.description}</p>
                
                {/* Adding some dummy content since the actual detailed content is not available */}
                <h2>Project Overview</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
                
                <h2>Technical Details</h2>
                <p>Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
                
                <h3>Key Features</h3>
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                  <li>Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl</li>
                  <li>Eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies</li>
                  <li>Nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl</li>
                </ul>
                
                <h3>Challenges & Solutions</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
