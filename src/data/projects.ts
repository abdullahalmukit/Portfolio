export interface Project {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  caseStudy: {
    problemStatement: string;
    proposedSolution: string;
    architecture: string;
    challenges: string[];
    outcome: string;
    metrics?: { label: string; value: string }[];
  };
}

export const projects: Project[] = [
  {
    id: "healthcare-management-system",
    title: "Healthcare-Management-System",
    description: "Built a C-based Healthcare Management System with patient management, appointment scheduling, and multi-module hospital operations.",
    excerpt: "C-based healthcare system with patient & appointment management",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop",
    technologies: ["C", "File I/O", "Data Structures"],
    category: "Backend",
    repoUrl: "https://github.com/abdullahalmukit/Healthcare-Management-System-in-C",
    featured: true,
    caseStudy: {
      problemStatement: "Hospitals needed a lightweight, efficient system to manage patient records, appointments, and hospital operations without complex infrastructure.",
      proposedSolution: "Developed a console-based Healthcare Management System in C with modular design for patient registration, appointment scheduling, and record management using file-based storage.",
      architecture: "Structured C program with separate modules for patients, appointments, doctors, and billing. Uses file I/O for persistent data storage and linked lists for runtime data management.",
      challenges: [
        "Managing complex data relationships in a procedural language without OOP constructs",
        "Ensuring data integrity during file read/write operations",
        "Building an intuitive console interface for non-technical hospital staff"
      ],
      outcome: "Successfully created a functional healthcare management system demonstrating strong C programming and system design skills.",
      metrics: [
        { label: "Modules", value: "5+" },
        { label: "Language", value: "C" },
        { label: "Storage", value: "File-based" }
      ]
    }
  },
  {
    id: "school-management-system",
    title: "School-Management-System",
    description: "Built a Python-based School Management System with OOP principles for automated student grading and classroom administration.",
    excerpt: "Python OOP system for student grading & administration",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
    technologies: ["Python", "OOP", "File Handling"],
    category: "Backend",
    repoUrl: "https://github.com/abdullahalmukit/School-Management-System",
    featured: true,
    caseStudy: {
      problemStatement: "Schools required a simple yet effective system to manage student records, grades, and classroom administration without expensive enterprise software.",
      proposedSolution: "Created a Python-based School Management System using Object-Oriented Programming principles with classes for Students, Teachers, Courses, and Grades.",
      architecture: "Clean OOP architecture with inheritance and encapsulation. Separate classes for entities (Student, Teacher, Course) with a main controller for operations.",
      challenges: [
        "Designing a flexible grading system that handles different assessment types",
        "Implementing proper data validation for student records",
        "Creating reports and analytics for student performance"
      ],
      outcome: "Delivered a comprehensive school management solution showcasing strong Python OOP skills and software design patterns.",
      metrics: [
        { label: "Design", value: "OOP" },
        { label: "Language", value: "Python" },
        { label: "Features", value: "10+" }
      ]
    }
  },
  {
    id: "restaurants-management-system",
    title: "Restaurants-Management-System",
    description: "Designed a Restaurant Management System in Python with OOP principles for customer ordering, admin inventory control, and employee management.",
    excerpt: "Python restaurant system with ordering & inventory",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    technologies: ["Python", "OOP", "Data Management"],
    category: "Backend",
    repoUrl: "https://github.com/abdullahalmukit/Restaurants-Management-System",
    featured: true,
    caseStudy: {
      problemStatement: "Restaurant owners needed an integrated system to handle customer orders, inventory tracking, and employee management in one solution.",
      proposedSolution: "Built a comprehensive Restaurant Management System using Python OOP with separate modules for orders, menu management, inventory, and employee scheduling.",
      architecture: "Modular Python application with classes for Menu, Order, Inventory, Employee, and Customer. Uses composition and inheritance for code reusability.",
      challenges: [
        "Synchronizing inventory levels with order processing in real-time",
        "Building a user-friendly interface for both customers and staff",
        "Implementing proper access control for admin vs staff operations"
      ],
      outcome: "Created a fully functional restaurant management solution demonstrating advanced Python programming and business logic implementation.",
      metrics: [
        { label: "Modules", value: "4" },
        { label: "User Types", value: "3" },
        { label: "Language", value: "Python" }
      ]
    }
  },
  {
    id: "ride-sharing-management-system",
    title: "Ride-Sharing-Management-System",
    description: "Built a Python-based Ride-Sharing System with OOP design for real-time ride matching, fare calculation, and multi-user management (riders/drivers).",
    excerpt: "Python ride-sharing with matching & fare calculation",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    technologies: ["Python", "OOP", "Algorithm Design"],
    category: "Backend",
    repoUrl: "https://github.com/abdullahalmukit/Ride-Sharing-Management-System",
    featured: true,
    caseStudy: {
      problemStatement: "The ride-sharing industry needs efficient systems for matching riders with drivers, calculating fares, and managing multiple user types.",
      proposedSolution: "Developed a Ride-Sharing Management System in Python with OOP architecture supporting rider and driver registration, ride matching algorithms, and dynamic fare calculation.",
      architecture: "Object-oriented design with classes for Rider, Driver, Ride, and FareCalculator. Implements matching algorithms and location-based services.",
      challenges: [
        "Implementing an efficient ride-matching algorithm based on proximity",
        "Building a dynamic fare calculation system with surge pricing",
        "Managing concurrent ride requests and driver availability"
      ],
      outcome: "Successfully built a ride-sharing prototype demonstrating algorithm design skills and complex business logic handling.",
      metrics: [
        { label: "User Types", value: "2" },
        { label: "Matching", value: "Real-time" },
        { label: "Language", value: "Python" }
      ]
    }
  }
];

export const categories = ["All", "Full-Stack", "Backend", "DevOps", "Mobile", "Open Source"];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "All") return projects;
  return projects.filter((p) => p.category === category);
}
