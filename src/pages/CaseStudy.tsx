import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection, AnimatedDiv, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjectById, projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-container">
        <AnimatedDiv className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <Badge variant="outline">{project.category}</Badge>
              <h1 className="section-heading">{project.title}</h1>
              <p className="text-lg text-muted-foreground">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                {project.demoUrl && (
                  <Button asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-blue-500/20 blur-3xl" />
              <img
                src={project.image}
                alt={project.title}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </AnimatedDiv>
      </section>

      {/* Metrics */}
      {project.caseStudy.metrics && (
        <AnimatedSection className="section-container bg-secondary/30 py-12">
          <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
            {project.caseStudy.metrics.map((metric) => (
              <StaggerItem key={metric.label} className="text-center">
                <div className="text-3xl font-bold text-accent md:text-4xl">{metric.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{metric.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>
      )}

      {/* Case Study Content */}
      <section className="section-container">
        <div className="mx-auto max-w-3xl space-y-16">
          {/* Problem Statement */}
          <AnimatedSection>
            <h2 className="mb-4 text-2xl font-bold">The Problem</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.caseStudy.problemStatement}
            </p>
          </AnimatedSection>

          {/* Proposed Solution */}
          <AnimatedSection>
            <h2 className="mb-4 text-2xl font-bold">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.caseStudy.proposedSolution}
            </p>
          </AnimatedSection>

          {/* Architecture */}
          <AnimatedSection>
            <h2 className="mb-4 text-2xl font-bold">System Architecture</h2>
            <div className="glass-card">
              <p className="text-muted-foreground leading-relaxed">
                {project.caseStudy.architecture}
              </p>
            </div>
          </AnimatedSection>

          {/* Challenges */}
          <AnimatedSection>
            <h2 className="mb-6 text-2xl font-bold">Challenges Faced</h2>
            <StaggerContainer className="space-y-4">
              {project.caseStudy.challenges.map((challenge, index) => (
                <StaggerItem key={index}>
                  <div className="flex gap-4 rounded-xl bg-secondary/50 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground">{challenge}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>

          {/* Outcome */}
          <AnimatedSection>
            <h2 className="mb-4 text-2xl font-bold">The Outcome</h2>
            <div className="flex gap-4 rounded-xl bg-green-500/10 border border-green-500/20 p-6">
              <CheckCircle className="h-6 w-6 shrink-0 text-green-500" />
              <p className="text-muted-foreground leading-relaxed">
                {project.caseStudy.outcome}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <AnimatedSection className="section-container">
          <h2 className="mb-8 text-center text-2xl font-bold">Related Projects</h2>
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((p) => (
              <StaggerItem key={p.id}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>
      )}
    </Layout>
  );
}
