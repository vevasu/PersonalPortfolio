import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Book } from "@/lib/types";
import { sectionVariant, cardHover } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Books() {
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  // Loading skeleton
  if (isLoading) {
    return (
      <section id="books" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-1/2 mb-3" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-6 w-36" />
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
      id="books" 
      className="py-20 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariant}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Books I've Read</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">A collection of books that have influenced my thinking and professional growth.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books?.map((book) => (
            <motion.div 
              key={book.id}
              whileHover="hover"
              initial="rest"
              variants={cardHover}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-heading">{book.title}</h3>
                <p className="text-gray-600 mb-3">{book.author}</p>
                <p className="text-gray-700 mb-4">{book.description}</p>
                <Link href={`/books/${book.id}`}>
                  <a className="text-secondary hover:underline inline-flex items-center font-medium">
                    Read Summary <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/books">
            <a className="inline-flex items-center px-6 py-3 border border-secondary text-secondary rounded-md hover:bg-secondary/10 transition duration-300">
              View All Books <i className="fas fa-book ml-2"></i>
            </a>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
