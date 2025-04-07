import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route('/api');
  
  // Get profile data
  app.get('/api/profile', async (req: Request, res: Response) => {
    try {
      const profile = await storage.getProfile();
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile' });
    }
  });
  
  // Get all books
  app.get('/api/books', async (req: Request, res: Response) => {
    try {
      const books = await storage.getBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books' });
    }
  });
  
  // Get a specific book by ID
  app.get('/api/books/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid book ID' });
      }
      
      const book = await storage.getBook(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book' });
    }
  });
  
  // Get all events
  app.get('/api/events', async (req: Request, res: Response) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events' });
    }
  });
  
  // Get a specific event by ID
  app.get('/api/events/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
      
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching event' });
    }
  });
  
  // Get all blogs
  app.get('/api/blogs', async (req: Request, res: Response) => {
    try {
      const blogs = await storage.getBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs' });
    }
  });
  
  // Get a specific blog by ID
  app.get('/api/blogs/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid blog ID' });
      }
      
      const blog = await storage.getBlog(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blog' });
    }
  });
  
  // Get all projects
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching projects' });
    }
  });
  
  // Get a specific project by ID
  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching project' });
    }
  });
  
  // Submit contact form
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const contactData = insertContactSchema.parse(req.body);
      
      // Create the contact message
      const message = await storage.createContactMessage(contactData);
      
      res.status(201).json({ 
        message: 'Thank you for your message! I\'ll get back to you soon.',
        id: message.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: 'Error submitting contact form' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
