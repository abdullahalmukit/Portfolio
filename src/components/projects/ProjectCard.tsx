import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMotion } from "@/contexts/MotionContext";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { shouldAnimate } = useMotion();

  const CardWrapper = shouldAnimate ? motion.div : "div";
  const cardProps = shouldAnimate
    ? {
        whileHover: { y: -4 },
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      }
    : {};

  return (
    <CardWrapper
      className={cn("glass-card group overflow-hidden", className)}
      {...cardProps}
    >
      {/* Image */}
      <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        
        {/* Category badge */}
        <Badge className="absolute bottom-3 left-3" variant="secondary">
          {project.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.excerpt}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button variant="default" size="sm" asChild className="flex-1">
            <Link to={`/projects/${project.id}`}>
              View Case Study
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
          
          {project.demoUrl && (
            <Button variant="outline" size="icon" asChild className="h-8 w-8">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live demo"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
          
          {project.repoUrl && (
            <Button variant="outline" size="icon" asChild className="h-8 w-8">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source code"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}
