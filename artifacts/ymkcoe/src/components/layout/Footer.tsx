import { Link } from "wouter";
import { MapPin, Phone, Mail, ChevronRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* About */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold tracking-tight mb-4">YMKCOE</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Yashoda Mahadeo Kakade College of Engineering (YMKCOE) is a premier institution under Indrayani Vidya Mandir, dedicated to excellence in technical education and innovation since 1965.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="/social/facebook">
                <span className="text-primary-foreground/60 hover:text-accent transition-colors cursor-pointer"><Facebook className="h-5 w-5" /></span>
              </Link>
              <Link href="/social/twitter">
                <span className="text-primary-foreground/60 hover:text-accent transition-colors cursor-pointer"><Twitter className="h-5 w-5" /></span>
              </Link>
              <Link href="/social/linkedin">
                <span className="text-primary-foreground/60 hover:text-accent transition-colors cursor-pointer"><Linkedin className="h-5 w-5" /></span>
              </Link>
              <Link href="/social/instagram">
                <span className="text-primary-foreground/60 hover:text-accent transition-colors cursor-pointer"><Instagram className="h-5 w-5" /></span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-primary-foreground/10 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Admissions", href: "/admissions" },
                { label: "Departments", href: "/departments" },
                { label: "Faculty Directory", href: "/faculty" },
                { label: "Placements", href: "/placements" },
                { label: "Campus News", href: "/news" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-primary-foreground/80 hover:text-accent transition-colors flex items-center group">
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-primary-foreground/10 pb-2">Departments</h4>
            <ul className="space-y-2">
              {[
                { name: "Computer Science & Engineering", slug: "cse" },
                { name: "Artificial Intelligence & Data Science", slug: "aids" },
                { name: "Electronics & Telecommunication Engg", slug: "entc" },
                { name: "Information Technology", slug: "it" },
              ].map((dept) => (
                <li key={dept.slug}>
                  <Link href={`/department/${dept.slug}`}>
                    <span className="text-sm text-primary-foreground/80 hover:text-accent transition-colors flex items-center group">
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {dept.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-primary-foreground/10 pb-2">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Talegaon - Chakan Hwy, near Manohar Nagar, Yashwant Nagar, Talegaon Dabhade, Talegaon Dabhade R, Maharashtra 410507</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span>+91 89836 83005 / +91 89836 73005</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href="mailto:admission@ymkcoe.com" className="hover:text-accent transition-colors">admission@ymkcoe.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      <div className="bg-primary/95 border-t border-primary-foreground/10 py-3">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
          <p>&copy; {currentYear} Yashoda Mahadeo Kakade College of Engineering. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/admin"><span className="hover:text-accent transition-colors cursor-pointer">Admin Portal</span></Link>
            <Link href="/privacy-policy"><span className="hover:text-accent transition-colors cursor-pointer">Privacy Policy</span></Link>
            <Link href="/terms-of-service"><span className="hover:text-accent transition-colors cursor-pointer">Terms of Service</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
