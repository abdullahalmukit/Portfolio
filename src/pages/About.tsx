import { Link } from "react-router-dom";
import { Download, Mail, MapPin, FileText, Eye, Phone, GraduationCap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection, AnimatedDiv, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { profile } from "@/data/profile";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { useState } from "react";
import profilePhoto from "@/assets/profile-photo.png";

export default function About() {
  const [resumeDownloads, setResumeDownloads] = useState(() => {
    const stored = localStorage.getItem("resumeDownloads");
    return stored ? parseInt(stored, 10) : 0;
  });

  const handleDownload = () => {
    const newCount = resumeDownloads + 1;
    setResumeDownloads(newCount);
    localStorage.setItem("resumeDownloads", String(newCount));
    window.open("/Mukit_CV.pdf", "_blank");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Photo */}
          <AnimatedDiv className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-blue-500/30 blur-3xl" />
              <div className="glass-card overflow-hidden p-2">
                <img
                  src={profilePhoto}
                  alt={profile.name}
                  className="aspect-square w-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </AnimatedDiv>

          {/* Bio */}
          <AnimatedDiv className="order-1 space-y-6 lg:order-2">
            <div>
              <h1 className="section-heading">About Me</h1>
              <p className="section-subheading">{profile.tagline}</p>
            </div>

            <div className="space-y-4 text-muted-foreground">
              {profile.bio.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {profile.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {profile.phone}
              </span>
            </div>

            {/* Resume Actions */}
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview CV
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>CV Preview</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-[8.5/11] w-full rounded-lg overflow-hidden">
                    <iframe
                      src="/Mukit_CV.pdf"
                      className="w-full h-full"
                      title="CV Preview"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>
          </AnimatedDiv>
        </div>
      </section>

      {/* Education */}
      <AnimatedSection className="section-container">
        <div className="mb-12 text-center">
          <h2 className="section-heading">Education</h2>
        </div>

        <StaggerContainer className="mx-auto max-w-2xl">
          {profile.education.map((edu) => (
            <StaggerItem key={edu.institution}>
              <div className="glass-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-accent border-accent/50">
                        {edu.year}
                      </Badge>
                      {edu.result && (
                        <Badge variant="secondary">
                          {edu.result}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* Skills */}
      <SkillsSection />

      {/* Experience */}
      <ExperienceSection />
    </Layout>
  );
}
