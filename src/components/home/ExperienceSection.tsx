import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";

export function ExperienceSection() {
  return (
    <AnimatedSection className="section-container hover-section">
      <div className="mb-12 text-center">
        <h2 className="section-heading">Experience</h2>
        <p className="section-subheading">My professional journey</p>
      </div>

      <StaggerContainer className="relative mx-auto max-w-3xl">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

        {profile.experience.map((exp, index) => (
          <StaggerItem key={exp.company}>
            <div className={`relative flex gap-8 pb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 z-10 h-3 w-3 rounded-full border-2 border-accent bg-background md:left-1/2 md:-translate-x-1/2" />
              
              {/* Content */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="glass-card">
                  <div className="mb-2 text-sm text-accent">{exp.period}</div>
                  <h3 className="mb-1 text-lg font-semibold">{exp.role}</h3>
                  <div className="mb-3 text-muted-foreground">{exp.company}</div>
                  <p className="mb-4 text-sm text-muted-foreground">{exp.description}</p>
                  <div className={`flex flex-wrap gap-1.5 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </AnimatedSection>
  );
}
