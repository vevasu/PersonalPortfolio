import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { sectionVariant } from "@/lib/motion";
import { ContactFormData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/lib/types";

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock, Twitter, Linkedin, Github, FileText } from "lucide-react";

// Define the contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { data: profile } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  // Define the form
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  // Contact form mutation
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
  
  // Form submission handler
  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <motion.section 
      id="contact" 
      className="py-20 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariant}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Get In Touch</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Interested in working together or have a question? Feel free to reach out.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="text-secondary text-5xl mb-4">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your message has been sent successfully. I'll get back to you soon.</p>
                  <Button 
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={5}
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-secondary text-white px-6 py-3 rounded-md hover:bg-secondary/90 transition duration-300"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h3 className="text-xl font-bold mb-6 font-heading">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-secondary mt-1 mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="mt-1 text-gray-600">{profile?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-secondary mt-1 mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Location</h4>
                    <p className="mt-1 text-gray-600">{profile?.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-secondary mt-1 mr-4">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Working Hours</h4>
                    <p className="mt-1 text-gray-600">{profile?.workingHours}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-medium text-gray-900 mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  {profile?.socialLinks.twitter && (
                    <a 
                      href={profile.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-secondary hover:text-white transition duration-300"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {profile?.socialLinks.linkedin && (
                    <a 
                      href={profile.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-secondary hover:text-white transition duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {profile?.socialLinks.github && (
                    <a 
                      href={profile.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-secondary hover:text-white transition duration-300"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {profile?.socialLinks.medium && (
                    <a 
                      href={profile.socialLinks.medium} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-secondary hover:text-white transition duration-300"
                    >
                      <FileText className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
