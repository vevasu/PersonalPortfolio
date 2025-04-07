import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Blog } from "@/lib/types";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetail() {
  const { id } = useParams();
  const blogId = parseInt(id || "0");
  
  const { data: blog, isLoading, error } = useQuery<Blog>({
    queryKey: [`/api/blogs/${blogId}`],
    enabled: !!blogId,
  });
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <Skeleton className="h-10 w-36 mb-8" />
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <div className="flex items-center justify-center mb-8 gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="w-full h-80 mb-8 rounded-lg" />
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-6" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3 mb-6" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (error || !blog) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link href="/#blogs">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
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
            <Link href="/#blogs">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
              </Button>
            </Link>
          </div>
          
          <motion.div
            variants={fadeIn('up', 0.3)}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center justify-center gap-4">
              <span className="text-gray-600">{blog.date}</span>
              <Badge variant="secondary">{blog.category}</Badge>
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeIn('up', 0.5)}
            className="w-full max-w-4xl mx-auto mb-10 rounded-lg overflow-hidden"
          >
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-auto"
            />
          </motion.div>
          
          <motion.div
            variants={fadeIn('up', 0.7)}
            className="prose prose-lg max-w-3xl mx-auto"
          >
            <p className="lead text-xl text-gray-600 mb-6">{blog.excerpt}</p>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            
            {/* Adding some dummy content since the actual content is not available */}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
            
            <h2>Key Points</h2>
            <p>Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
            
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
              <li>Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl</li>
              <li>Eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
