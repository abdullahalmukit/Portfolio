import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart, Phone, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { profile } from "@/data/profile";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

const socialLinks = [
  { label: "GitHub", href: profile.social.github, icon: Github },
  { label: "LinkedIn", href: profile.social.linkedin, icon: Linkedin },
  { label: "Instagram", href: profile.social.instagram, icon: Instagram },
  { label: "Facebook", href: profile.social.facebook, icon: Facebook },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-card/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tight font-mono text-accent">
              &lt;MUKIT/&gt;
            </Link>
            <p className="text-muted-foreground max-w-md">
              {profile.tagline}. Software Engineering student passionate about building efficient, scalable, and user-focused solutions.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 transition-all hover:border-accent hover:bg-accent/10 hover:text-accent hover:scale-110"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/Mukit_CV.pdf"
                  target="_blank"
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/8801796124352`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  <Phone className="h-4 w-4" />
                  <span>{profile.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span>Discord: {profile.social.discord.username}</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{profile.location}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 fill-accent text-accent animate-pulse" /> by Mukit
          </p>
        </div>
      </div>
    </footer>
  );
}
