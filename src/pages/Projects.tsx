import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, categories } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="section-container">
        {/* Header */}
        <AnimatedSection className="mb-12 text-center">
          <h1 className="section-heading">Projects</h1>
          <p className="section-subheading mx-auto max-w-2xl">
            A collection of projects I've built, from full-stack applications to open-source contributions.
            Each project includes a detailed case study.
          </p>
        </AnimatedSection>

        {/* Filter */}
        <AnimatedSection className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full",
                  activeCategory === category && "shadow-md"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No projects found in this category.
          </div>
        )}
      </section>
    </Layout>
  );
}
