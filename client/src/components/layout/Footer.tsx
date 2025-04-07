import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/lib/types";

export default function Footer() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Books', href: '/#books' },
    { name: 'Events', href: '/#events' },
    { name: 'Blogs', href: '/#blogs' },
    { name: 'Projects', href: '/#projects' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: profile?.socialLinks.twitter || '#', icon: 'twitter' },
    { name: 'LinkedIn', href: profile?.socialLinks.linkedin || '#', icon: 'linkedin' },
    { name: 'GitHub', href: profile?.socialLinks.github || '#', icon: 'github' },
    { name: 'Medium', href: profile?.socialLinks.medium || '#', icon: 'medium' },
  ];

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold font-heading">{profile?.name || 'John Doe'}</h3>
            <p className="mt-2 text-gray-300">Building digital experiences that matter.</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0">
            <div>
              <h4 className="text-lg font-bold mb-4">Sitemap</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition duration-300">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Social</h4>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {currentYear} {profile?.name || 'John Doe'}. All rights reserved.</p>
          <p className="text-gray-400 mt-4 md:mt-0">Designed & Developed with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
