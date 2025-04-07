import { 
  users, type User, type InsertUser,
  books, type Book, type InsertBook,
  events, type Event, type InsertEvent,
  blogs, type Blog, type InsertBlog,
  projects, type Project, type InsertProject,
  contactMessages, type ContactMessage, type InsertContact,
  profile, type Profile, type InsertProfile
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Book methods
  async getBooks(): Promise<Book[]> {
    return await db.select().from(books);
  }
  
  async getBook(id: number): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(eq(books.id, id));
    return book;
  }
  
  async createBook(insertBook: InsertBook): Promise<Book> {
    const [book] = await db.insert(books).values(insertBook).returning();
    return book;
  }
  
  // Event methods
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }
  
  // Blog methods
  async getBlogs(): Promise<Blog[]> {
    return await db.select().from(blogs);
  }
  
  async getBlog(id: number): Promise<Blog | undefined> {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog;
  }
  
  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const [blog] = await db.insert(blogs).values(insertBlog).returning();
    return blog;
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }
  
  // Contact methods
  async createContactMessage(insertMessage: InsertContact): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
  
  // Profile methods
  async getProfile(): Promise<Profile | undefined> {
    const [profileData] = await db.select().from(profile);
    return profileData;
  }
  
  async updateProfile(insertProfile: InsertProfile): Promise<Profile> {
    // Check if a profile exists
    const existingProfile = await this.getProfile();
    
    if (existingProfile) {
      // Update existing profile
      const [updatedProfile] = await db
        .update(profile)
        .set({
          name: insertProfile.name,
          title: insertProfile.title,
          bio: insertProfile.bio,
          avatar: insertProfile.avatar,
          email: insertProfile.email,
          location: insertProfile.location,
          workingHours: insertProfile.workingHours,
          socialLinks: insertProfile.socialLinks as any
        })
        .where(eq(profile.id, existingProfile.id))
        .returning();
      return updatedProfile;
    } else {
      // Create new profile
      const [newProfile] = await db
        .insert(profile)
        .values([{
          name: insertProfile.name,
          title: insertProfile.title,
          bio: insertProfile.bio,
          avatar: insertProfile.avatar,
          email: insertProfile.email,
          location: insertProfile.location,
          workingHours: insertProfile.workingHours,
          socialLinks: insertProfile.socialLinks as any
        }])
        .returning();
      return newProfile;
    }
  }
}

// Initialize with the database storage implementation
export const storage = new DatabaseStorage();
