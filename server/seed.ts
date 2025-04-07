import { db } from './db';
import { 
  books, 
  events, 
  blogs, 
  projects,
  profile,
  type InsertBook,
  type InsertEvent,
  type InsertBlog,
  type InsertProject,
  type InsertProfile
} from '@shared/schema';

// Initial data for the portfolio
const initialBooks: InsertBook[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "An insightful guide to building good habits and breaking bad ones through small, incremental changes.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    summaryLink: "/books/atomic-habits",
    publishedYear: 2018,
    tags: ["Productivity", "Self-Improvement", "Psychology"]
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "A groundbreaking exploration of the two systems that drive the way we think and make decisions.",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    summaryLink: "/books/thinking-fast-and-slow",
    publishedYear: 2011,
    tags: ["Psychology", "Behavioral Economics", "Decision Making"]
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    description: "How constant innovation creates radically successful businesses through validated learning.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    summaryLink: "/books/the-lean-startup",
    publishedYear: 2011,
    tags: ["Business", "Entrepreneurship", "Innovation"]
  }
];

const initialEvents: InsertEvent[] = [
  {
    title: "TechCrunch Disrupt",
    description: "Attended as a speaker and panel moderator. Discussed the future of AI in software development and networked with industry leaders.",
    date: "June 2023",
    location: "San Francisco, CA",
    tags: ["Speaker", "AI", "Technology"],
    link: "https://techcrunch.com/events/disrupt-2023/"
  },
  {
    title: "Web Summit",
    description: "Presented a workshop on modern web development techniques and participated in a roundtable discussion on accessibility standards.",
    date: "November 2022",
    location: "Berlin, Germany",
    tags: ["Workshop", "Web Development", "Accessibility"],
    link: "https://websummit.com/"
  },
  {
    title: "SXSW Interactive",
    description: "Participated in a hackathon focused on sustainable technology solutions and networked with creative technologists from around the world.",
    date: "March 2022",
    location: "Austin, TX",
    tags: ["Hackathon", "Sustainability", "Innovation"],
    link: "https://www.sxsw.com/"
  }
];

const initialBlogs: InsertBlog[] = [
  {
    title: "Modern JavaScript Techniques Every Developer Should Know",
    excerpt: "An exploration of the latest JavaScript features that can improve your code quality and developer experience...",
    content: "Full article content goes here with detailed explanations and code examples.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "Web Development",
    date: "August 15, 2023",
    link: "/blogs/modern-javascript-techniques"
  },
  {
    title: "The Ethical Implications of Machine Learning Models",
    excerpt: "Examining how we can build more responsible AI systems and address potential biases in our algorithms...",
    content: "Full article content goes here with detailed explanations of ethical considerations in AI.",
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
    category: "AI & Ethics",
    date: "June 22, 2023",
    link: "/blogs/ethical-implications-machine-learning"
  },
  {
    title: "Effective Reading Strategies for Knowledge Workers",
    excerpt: "How to extract maximum value from your reading time and build a personal knowledge management system...",
    content: "Full article content goes here with detailed strategies for effective reading and knowledge retention.",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "Productivity",
    date: "April 10, 2023",
    link: "/blogs/reading-strategies-knowledge-workers"
  }
];

const initialProjects: InsertProject[] = [
  {
    title: "Intelligent Task Manager",
    description: "A productivity app that uses machine learning to prioritize tasks based on your working patterns and deadlines.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["React", "Node.js", "TensorFlow.js", "MongoDB"],
    demoLink: "https://task-manager-demo.example.com",
    codeLink: "https://github.com/johndoe/intelligent-task-manager",
    featured: true
  },
  {
    title: "E-commerce Analytics Dashboard",
    description: "An interactive dashboard for e-commerce businesses to visualize sales data and customer insights.",
    coverImage: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["Vue.js", "D3.js", "GraphQL", "Firebase"],
    demoLink: "https://ecommerce-analytics.example.com",
    codeLink: "https://github.com/johndoe/ecommerce-analytics",
    featured: false
  },
  {
    title: "Natural Language Processing API",
    description: "A RESTful API for text analysis, sentiment detection, and language translation with high accuracy.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["Python", "Flask", "spaCy", "Docker"],
    demoLink: "https://nlp-api-docs.example.com",
    codeLink: "https://github.com/johndoe/nlp-api",
    featured: false
  },
  {
    title: "Mobile Fitness App",
    description: "A cross-platform fitness application with workout tracking, nutrition planning, and progress analytics.",
    coverImage: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["React Native", "Redux", "Express", "PostgreSQL"],
    demoLink: "https://fitness-app.example.com",
    codeLink: "https://github.com/johndoe/fitness-app",
    featured: false
  }
];

const initialProfile: InsertProfile = {
  name: "John Doe",
  title: "Software Engineer & Tech Writer",
  bio: "Welcome to my personal portfolio showcasing my journey through books, events, blogs, and coding projects.",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  email: "hello@johndoe.com",
  location: "San Francisco, California",
  workingHours: "Monday - Friday: 9AM - 5PM PST",
  socialLinks: {
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    medium: "https://medium.com/@johndoe"
  }
};

async function seedDatabase() {
  try {
    console.log('Seeding database...');
    
    // Insert books
    await db.insert(books).values(initialBooks);
    console.log('✅ Books seeded successfully');
    
    // Insert events
    await db.insert(events).values(initialEvents);
    console.log('✅ Events seeded successfully');
    
    // Insert blogs
    await db.insert(blogs).values(initialBlogs);
    console.log('✅ Blogs seeded successfully');
    
    // Insert projects
    await db.insert(projects).values(initialProjects);
    console.log('✅ Projects seeded successfully');
    
    // Insert profile
    await db.insert(profile).values(initialProfile);
    console.log('✅ Profile seeded successfully');
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();