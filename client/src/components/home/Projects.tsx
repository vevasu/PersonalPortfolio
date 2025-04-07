import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/types";
import { sectionVariant, cardHover } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Loading skeleton
  if (isLoading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-24 w-full mb-4" />
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                  <div className="flex space-x-4">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-6 w-28" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      id="projects" 
      className="py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariant}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Projects I've Coded</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">A showcase of my technical abilities and problem-solving approach.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects?.map((project) => (
            <motion.div 
              key={project.id}
              whileHover="hover"
              initial="rest"
              variants={cardHover}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white"
            >
              <div className="h-64 bg-gray-100 overflow-hidden relative">
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center"
                />
                {project.featured && (
                  <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 text-sm">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-heading">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline inline-flex items-center font-medium"
                    >
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                  {project.codeLink && (
                    <a 
                      href={project.codeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-secondary inline-flex items-center font-medium"
                    >
                      <Github className="mr-2 h-4 w-4" /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center px-6 py-3 border border-secondary text-secondary rounded-md hover:bg-secondary/10 transition duration-300">
            View All Projects <i className="fas fa-code ml-2"></i>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
