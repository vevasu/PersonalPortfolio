import { 
  users, type User, type InsertUser,
  books, type Book, type InsertBook,
  events, type Event, type InsertEvent,
  blogs, type Blog, type InsertBlog,
  projects, type Project, type InsertProject,
  contactMessages, type ContactMessage, type InsertContact,
  profile, type Profile, type InsertProfile
} from "@shared/schema";

// Initial data for the portfolio
const initialBooks: Omit<Book, 'id'>[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "An insightful guide to building good habits and breaking bad ones through small, incremental changes.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    summaryLink: "/books/atomic-habits",
    publishedYear: 2018,
    tags: ["Productivity", "Self-Improvement", "Psychology"],
    createdAt: new Date()
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "A groundbreaking exploration of the two systems that drive the way we think and make decisions.",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    summaryLink: "/books/thinking-fast-and-slow",
    publishedYear: 2011,
    tags: ["Psychology", "Behavioral Economics", "Decision Making"],
    createdAt: new Date()
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    description: "How constant innovation creates radically successful businesses through validated learning.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    summaryLink: "/books/the-lean-startup",
    publishedYear: 2011,
    tags: ["Business", "Entrepreneurship", "Innovation"],
    createdAt: new Date()
  }
];

const initialEvents: Omit<Event, 'id'>[] = [
  {
    title: "TechCrunch Disrupt",
    description: "Attended as a speaker and panel moderator. Discussed the future of AI in software development and networked with industry leaders.",
    date: "June 2023",
    location: "San Francisco, CA",
    tags: ["Speaker", "AI", "Technology"],
    link: "https://techcrunch.com/events/disrupt-2023/",
    createdAt: new Date()
  },
  {
    title: "Web Summit",
    description: "Presented a workshop on modern web development techniques and participated in a roundtable discussion on accessibility standards.",
    date: "November 2022",
    location: "Berlin, Germany",
    tags: ["Workshop", "Web Development", "Accessibility"],
    link: "https://websummit.com/",
    createdAt: new Date()
  },
  {
    title: "SXSW Interactive",
    description: "Participated in a hackathon focused on sustainable technology solutions and networked with creative technologists from around the world.",
    date: "March 2022",
    location: "Austin, TX",
    tags: ["Hackathon", "Sustainability", "Innovation"],
    link: "https://www.sxsw.com/",
    createdAt: new Date()
  }
];

const initialBlogs: Omit<Blog, 'id'>[] = [
  {
    title: "Modern JavaScript Techniques Every Developer Should Know",
    excerpt: "An exploration of the latest JavaScript features that can improve your code quality and developer experience...",
    content: "Full article content goes here with detailed explanations and code examples.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "Web Development",
    date: "August 15, 2023",
    link: "/blogs/modern-javascript-techniques",
    createdAt: new Date()
  },
  {
    title: "The Ethical Implications of Machine Learning Models",
    excerpt: "Examining how we can build more responsible AI systems and address potential biases in our algorithms...",
    content: "Full article content goes here with detailed explanations of ethical considerations in AI.",
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
    category: "AI & Ethics",
    date: "June 22, 2023",
    link: "/blogs/ethical-implications-machine-learning",
    createdAt: new Date()
  },
  {
    title: "Effective Reading Strategies for Knowledge Workers",
    excerpt: "How to extract maximum value from your reading time and build a personal knowledge management system...",
    content: "Full article content goes here with detailed strategies for effective reading and knowledge retention.",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "Productivity",
    date: "April 10, 2023",
    link: "/blogs/reading-strategies-knowledge-workers",
    createdAt: new Date()
  }
];

const initialProjects: Omit<Project, 'id'>[] = [
  {
    title: "Intelligent Task Manager",
    description: "A productivity app that uses machine learning to prioritize tasks based on your working patterns and deadlines.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["React", "Node.js", "TensorFlow.js", "MongoDB"],
    demoLink: "https://task-manager-demo.example.com",
    codeLink: "https://github.com/johndoe/intelligent-task-manager",
    featured: true,
    createdAt: new Date()
  },
  {
    title: "E-commerce Analytics Dashboard",
    description: "An interactive dashboard for e-commerce businesses to visualize sales data and customer insights.",
    coverImage: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["Vue.js", "D3.js", "GraphQL", "Firebase"],
    demoLink: "https://ecommerce-analytics.example.com",
    codeLink: "https://github.com/johndoe/ecommerce-analytics",
    featured: false,
    createdAt: new Date()
  },
  {
    title: "Natural Language Processing API",
    description: "A RESTful API for text analysis, sentiment detection, and language translation with high accuracy.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["Python", "Flask", "spaCy", "Docker"],
    demoLink: "https://nlp-api-docs.example.com",
    codeLink: "https://github.com/johndoe/nlp-api",
    featured: false,
    createdAt: new Date()
  },
  {
    title: "Mobile Fitness App",
    description: "A cross-platform fitness application with workout tracking, nutrition planning, and progress analytics.",
    coverImage: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["React Native", "Redux", "Express", "PostgreSQL"],
    demoLink: "https://fitness-app.example.com",
    codeLink: "https://github.com/johndoe/fitness-app",
    featured: false,
    createdAt: new Date()
  }
];

const initialProfile: Omit<Profile, 'id'> = {
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

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Book methods
  getBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  
  // Event methods
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Blog methods
  getBlogs(): Promise<Blog[]>;
  getBlog(id: number): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Contact methods
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
  
  // Profile methods
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profile: InsertProfile): Promise<Profile>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private booksStore: Map<number, Book>;
  private eventsStore: Map<number, Event>;
  private blogsStore: Map<number, Blog>;
  private projectsStore: Map<number, Project>;
  private contactMessagesStore: Map<number, ContactMessage>;
  private profileStore: Map<number, Profile>;
  
  currentId: number;
  bookId: number;
  eventId: number;
  blogId: number;
  projectId: number;
  contactId: number;
  profileId: number;

  constructor() {
    // Initialize storage maps
    this.users = new Map();
    this.booksStore = new Map();
    this.eventsStore = new Map();
    this.blogsStore = new Map();
    this.projectsStore = new Map();
    this.contactMessagesStore = new Map();
    this.profileStore = new Map();
    
    // Initialize IDs
    this.currentId = 1;
    this.bookId = 1;
    this.eventId = 1;
    this.blogId = 1;
    this.projectId = 1;
    this.contactId = 1;
    this.profileId = 1;
    
    // Populate with initial data
    this.seedInitialData();
  }

  private seedInitialData() {
    // Add books
    initialBooks.forEach(book => {
      const id = this.bookId++;
      this.booksStore.set(id, { ...book, id });
    });
    
    // Add events
    initialEvents.forEach(event => {
      const id = this.eventId++;
      this.eventsStore.set(id, { ...event, id });
    });
    
    // Add blogs
    initialBlogs.forEach(blog => {
      const id = this.blogId++;
      this.blogsStore.set(id, { ...blog, id });
    });
    
    // Add projects
    initialProjects.forEach(project => {
      const id = this.projectId++;
      this.projectsStore.set(id, { ...project, id });
    });
    
    // Add profile
    this.profileStore.set(this.profileId, { ...initialProfile, id: this.profileId });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Book methods
  async getBooks(): Promise<Book[]> {
    return Array.from(this.booksStore.values());
  }
  
  async getBook(id: number): Promise<Book | undefined> {
    return this.booksStore.get(id);
  }
  
  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.bookId++;
    const book: Book = { ...insertBook, id, createdAt: new Date() };
    this.booksStore.set(id, book);
    return book;
  }
  
  // Event methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.eventsStore.values());
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.eventsStore.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventId++;
    const event: Event = { ...insertEvent, id, createdAt: new Date() };
    this.eventsStore.set(id, event);
    return event;
  }
  
  // Blog methods
  async getBlogs(): Promise<Blog[]> {
    return Array.from(this.blogsStore.values());
  }
  
  async getBlog(id: number): Promise<Blog | undefined> {
    return this.blogsStore.get(id);
  }
  
  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = this.blogId++;
    const blog: Blog = { ...insertBlog, id, createdAt: new Date() };
    this.blogsStore.set(id, blog);
    return blog;
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projectsStore.values());
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsStore.get(id);
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const project: Project = { ...insertProject, id, createdAt: new Date() };
    this.projectsStore.set(id, project);
    return project;
  }
  
  // Contact methods
  async createContactMessage(insertMessage: InsertContact): Promise<ContactMessage> {
    const id = this.contactId++;
    const message: ContactMessage = { ...insertMessage, id, createdAt: new Date() };
    this.contactMessagesStore.set(id, message);
    return message;
  }
  
  // Profile methods
  async getProfile(): Promise<Profile | undefined> {
    return this.profileStore.get(this.profileId);
  }
  
  async updateProfile(insertProfile: InsertProfile): Promise<Profile> {
    const profile: Profile = { ...insertProfile, id: this.profileId };
    this.profileStore.set(this.profileId, profile);
    return profile;
  }
}

export const storage = new MemStorage();
