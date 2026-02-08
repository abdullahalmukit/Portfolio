import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Calendar, GitCommit, Download, Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Instagram, Facebook, MessageCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection, AnimatedDiv, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { useMotion } from "@/contexts/MotionContext";

import { profile } from "@/data/profile";
import { getFeaturedProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import profilePhoto from "@/assets/profile-photo.png";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Index() {
  const { shouldAnimate } = useMotion();
  
  const featuredProjects = getFeaturedProjects();

  const [formData, setFormData] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: { name: formData.name, email: formData.email, message: formData.message },
      });

      if (error) throw error;

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-container flex items-center min-h-[calc(100vh-5rem)] py-8 lg:py-10 hover-section">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center w-full">
          <AnimatedDiv className="space-y-5 text-center lg:text-left">
            {/* Status badges - centered on mobile */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {profile.availableForHire && (
                <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Available for hire
                </Badge>
              )}
              <Badge variant="outline" className="gap-1.5">
                <Calendar className="h-3 w-3" />
                Updated {profile.lastUpdated}
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground sm:text-2xl">
                {profile.title}
              </p>
              <p className="mx-auto max-w-lg text-muted-foreground lg:mx-0">
                {profile.tagline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/Mukit_CV.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>

            {/* Social links */}
            <div className="flex gap-3 justify-center lg:justify-start">
              {[
                { href: profile.social.github, icon: Github, label: "GitHub" },
                { href: profile.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: profile.social.instagram, icon: Instagram, label: "Instagram" },
                { href: profile.social.facebook, icon: Facebook, label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-accent hover:bg-accent/10 hover:text-accent hover-lift"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </AnimatedDiv>

          {/* Profile Photo */}
          <AnimatedDiv delay={0.2} className="hidden lg:block">
            <div className="relative max-w-sm mx-auto">
              {/* Decorative background */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-blue-500/20 blur-3xl" />
              
              {/* Profile Image - cropped square */}
              <div className="glass-card overflow-hidden p-2">
                <img
                  src={profilePhoto}
                  alt={profile.name}
                  className="w-full aspect-square object-cover object-top rounded-2xl"
                />
              </div>
            </div>
          </AnimatedDiv>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Featured Projects */}
      <AnimatedSection className="section-container hover-section">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="section-heading">Featured Projects</h2>
            <p className="section-subheading">Some of my best work</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/projects">View all projects</Link>
          </Button>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="section-container hover-section">
        <div className="mb-12 text-center">
          <h2 className="section-heading">Get in Touch</h2>
          <p className="section-subheading">Have a project in mind? Let's talk about how we can work together.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <AnimatedDiv className="space-y-6">
            <div className="glass-card">
              <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-secondary/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{profile.email}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/8801796124352`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-secondary/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">WhatsApp / Telegram</div>
                    <div className="font-medium">{profile.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Discord</div>
                    <div className="font-medium">{profile.social.discord.username}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium">{profile.location}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-semibold mb-4">Connect with me</h4>
                <div className="flex gap-3">
                  {[
                    { href: profile.social.github, icon: Github, label: "GitHub" },
                    { href: profile.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                    { href: profile.social.instagram, icon: Instagram, label: "Instagram" },
                    { href: profile.social.facebook, icon: Facebook, label: "Facebook" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
                      aria-label={link.label}
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedDiv>

          {/* Contact Form */}
          <AnimatedDiv delay={0.1}>
            <form onSubmit={handleSubmit} className="glass-card">
              <h3 className="text-lg font-semibold mb-6">Send a Message</h3>
              
              <div className="space-y-6">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute -left-[9999px] top-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    disabled={status === "sending"}
                    className={cn(errors.name && "border-destructive")}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    disabled={status === "sending"}
                    className={cn(errors.email && "border-destructive")}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    disabled={status === "sending"}
                    className={cn(errors.message && "border-destructive")}
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={status === "sending" || status === "success"}>
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </motion.span>
                    )}
                    {status === "sending" && (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-4 w-4 rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </motion.span>
                    )}
                    {status === "success" && (
                      <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Message Sent!
                      </motion.span>
                    )}
                    {status === "error" && (
                      <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        Error - Try Again
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </form>
          </AnimatedDiv>
        </div>
      </AnimatedSection>

    </Layout>
  );
}
