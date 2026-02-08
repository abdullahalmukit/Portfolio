import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";

export function SkillsSection() {
  const technicalCategories = [
    { title: "Programming Languages", skills: profile.skills.technical.languages },
    { title: "Frameworks & Libraries", skills: profile.skills.technical.frameworks },
    { title: "Database Management", skills: profile.skills.technical.databases },
    { title: "Tools & Platforms", skills: profile.skills.technical.tools },
  ];

  const cpPlatforms = [
    { name: "Codeforces", href: profile.competitiveProgramming.codeforces },
    { name: "LeetCode", href: profile.competitiveProgramming.leetcode },
    { name: "HackerRank", href: profile.competitiveProgramming.hackerrank },
    { name: "CodeChef", href: profile.competitiveProgramming.codechef },
    { name: "Beecrowd", href: profile.competitiveProgramming.beecrowd },
  ];

  return (
    <AnimatedSection id="skills" className="section-container bg-secondary/30 py-12 lg:py-16 hover-section">
      <div className="mb-8 text-center">
        <h2 className="section-heading">Skills & Technologies</h2>
        <p className="section-subheading">Technologies and tools I work with</p>
      </div>

      {/* Technical Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center text-accent">Technical Skills</h3>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {technicalCategories.map((category) => (
            <StaggerItem key={category.title}>
              <div className="glass-card h-full">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Concepts */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center text-accent">Core Concepts</h3>
        <div className="glass-card">
          <div className="flex flex-wrap gap-2 justify-center">
            {profile.skills.technical.concepts.map((concept) => (
              <Badge 
                key={concept} 
                variant="outline"
                className="transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {concept}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Solving & Competitive Programming */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center text-accent">Problem Solving & Competitive Programming</h3>
        <div className="glass-card">
          <div className="flex flex-wrap gap-3 justify-center">
            {cpPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card/50 text-sm font-medium transition-all hover:border-accent hover:bg-accent/10 hover:text-accent hover:scale-105"
              >
                {platform.name}
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center text-accent">Soft Skills & Tools</h3>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StaggerItem>
            <div className="glass-card h-full">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Productivity Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.soft.tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="transition-colors hover:bg-accent hover:text-accent-foreground">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-card h-full">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Media & Design
              </h4>
              <div className="flex flex-wrap gap-2">
                {[...profile.skills.soft.media, ...profile.skills.soft.design].map((item) => (
                  <Badge key={item} variant="secondary" className="transition-colors hover:bg-accent hover:text-accent-foreground">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-card h-full">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Professional Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.soft.professional.map((skill) => (
                  <Badge key={skill} variant="secondary" className="transition-colors hover:bg-accent hover:text-accent-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Languages */}
        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">Languages: </span>
          {profile.skills.soft.languages.map((lang, i) => (
            <span key={lang} className="text-sm">
              {lang}{i < profile.skills.soft.languages.length - 1 && " • "}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}