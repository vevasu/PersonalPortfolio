import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Event } from "@/lib/types";
import { sectionVariant, cardHover } from "@/lib/motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  // Loading skeleton
  if (isLoading) {
    return (
      <section id="events" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>
          
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-gray-100 p-4 md:p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Skeleton className="h-8 w-40 mx-auto mb-2" />
                    <Skeleton className="h-6 w-32 mx-auto" />
                  </div>
                </div>
                <div className="md:w-2/3 p-6 border border-gray-200 bg-white">
                  <Skeleton className="h-7 w-3/4 mb-3" />
                  <Skeleton className="h-24 w-full mb-4" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      id="events" 
      className="py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariant}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Events I've Participated In</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Conferences, workshops, and meetups that have shaped my professional journey.</p>
        </div>
        
        <div className="space-y-12">
          {events?.map((event) => (
            <motion.div 
              key={event.id}
              whileHover="hover"
              initial="rest"
              variants={cardHover}
              className="flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 bg-gray-100 p-4 md:p-8 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-secondary">{event.date}</span>
                  <span className="block text-gray-600 mt-2">{event.location}</span>
                </div>
              </div>
              <div className="md:w-2/3 p-6 border border-gray-200 bg-white">
                <h3 className="text-xl font-bold mb-3 font-heading">{event.title}</h3>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-secondary/10 text-secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {event.link && (
                  <a 
                    href={event.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline inline-flex items-center font-medium"
                  >
                    View Event Details <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center px-6 py-3 border border-secondary text-secondary rounded-md hover:bg-secondary/10 transition duration-300">
            View All Events <i className="fas fa-calendar-alt ml-2"></i>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
