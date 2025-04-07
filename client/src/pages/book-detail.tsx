import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Book } from "@/lib/types";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookDetail() {
  const { id } = useParams();
  const bookId = parseInt(id || "0");
  
  const { data: book, isLoading, error } = useQuery<Book>({
    queryKey: [`/api/books/${bookId}`],
    enabled: !!bookId,
  });
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <Skeleton className="w-full h-96 rounded-lg" />
              </div>
              <div className="md:w-2/3">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-48 mb-6" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-6" />
                <div className="flex flex-wrap gap-2 mb-6">
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
                <Skeleton className="h-10 w-36" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (error || !book) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Book Not Found</h1>
            <p className="text-gray-600 mb-8">The book you're looking for doesn't exist or has been removed.</p>
            <Link href="/#books">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
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
            <Link href="/#books">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div 
              variants={fadeIn('right', 0.3)}
              className="md:w-1/3"
            >
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full rounded-lg shadow-md"
              />
            </motion.div>
            
            <motion.div 
              variants={fadeIn('left', 0.5)}
              className="md:w-2/3"
            >
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{book.title}</h1>
              <h2 className="text-xl text-gray-600 mb-6">by {book.author}</h2>
              
              <div className="prose prose-lg max-w-none mb-6">
                <p>{book.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
                <p>Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Key Takeaways</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                  <li>Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl</li>
                  <li>Eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies</li>
                  <li>Nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl</li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {book.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-secondary/10 text-secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {book.publishedYear && (
                <p className="text-gray-600 mb-6">Published: {book.publishedYear}</p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
