// ============================================================
// ★ PERSONAL CONTENT — Edit this file to update your info ★
// ============================================================
// This is the single source of truth for all personal content.
// Components read from here. You never need to touch component files.

export const personal = {
  name: "Ravi Teja Geddada",
  tagline: "Building scalable web experiences that users love.",
  roles: [
    "Software Engineer",
    "Front End Developer",
    "Angular Specialist",
    "React Developer",
    "Full Stack Engineer",
  ],
  bio: `Detail-oriented Software Engineer with extensive experience in developing
        responsive web applications using Angular and React. Passionate about crafting
        impactful digital experiences that prioritize seamlessness and user-centric design.`,
  location: "Roanoke, TX, US",
  email: "geddadaraviteja612@gmail.com",
  availableForWork: false,

  social: {
    github: "https://github.com/Raviteja77",
    linkedin: "https://www.linkedin.com/in/raviteja77",
    twitter: "",
    dribbble: "",
  },
} as const;

// ============================================================
// PROJECTS — Add/remove/edit your work here
// ============================================================
export const projects = [
  {
    id: "rove-around",
    title: "Rove Around",
    description:
      "A travel planning web app with Google Maps integration for destination selection, route visualization, and itinerary management.",
    longDescription: `Rove Around is a full-stack travel planning application that helps users discover
                      and organize their trips. Built with Angular and Java Spring Boot, it integrates
                      Google Maps and the Google Autocomplete API for intuitive destination search.
                      Users can pin destinations, plan routes, and manage itineraries in real time.`,
    tech: ["Angular", "TypeScript", "Java Spring Boot", "MySQL", "Google Maps API"],
    role: "Full-Stack Engineer",
    year: "2023",
    status: "live" as const,
    links: {
      live: "",
      github: "https://github.com/Raviteja77",
      caseStudy: "",
    },
    images: {
      thumbnail: "/assets/work/rove-around-thumb.jpg",
      screenshots: [
        "/assets/work/rove-around-thumb.jpg",
        "/assets/work/rove-around-2.jpg",
        "/assets/work/rove-around-3.jpg",
      ],
    },
    featured: true,
  },
  {
    id: "acronet",
    title: "Acronet",
    description:
      "A comprehensive network management platform built with Angular and Django, containerized with Docker for scalable deployment.",
    longDescription: `Acronet is a comprehensive software solution developed for Clark University.
                      It combines an Angular frontend with a Django backend, SQL database, and Docker
                      containerization for consistent deployment. The platform provides robust network
                      management capabilities with a focus on scalability and maintainability.`,
    tech: ["Angular", "TypeScript", "Django", "SQL", "Docker"],
    role: "Full-Stack Engineer",
    year: "2023",
    status: "live" as const,
    links: {
      live: "",
      github: "https://github.com/Raviteja77",
      caseStudy: "",
    },
    images: {
      thumbnail: "/assets/work/acronet-thumb.png",
      screenshots: [
        "/assets/work/acronet-thumb.png",
        "/assets/work/acronet-2.png",
        "/assets/work/acronet-3.png",
      ],
    },
    featured: true,
  },
  {
    id: "find-jobs",
    title: "Find Jobs",
    description:
      "A job posting and application platform for managers and candidates, built with Flask and Django as a full-stack web app.",
    longDescription: `Find Jobs streamlines the job posting and application process for both
                      managers and candidates. Managers can post listings, close them, and review
                      applications. Candidates can browse, apply, and track status — all within
                      a clean Bootstrap interface backed by Django's ORM and authentication.`,
    tech: ["Flask", "Django", "Bootstrap", "Python", "SQL"],
    role: "Full-Stack Engineer",
    year: "2023",
    status: "live" as const,
    links: {
      live: "",
      github: "https://github.com/Raviteja77",
      caseStudy: "",
    },
    images: {
      thumbnail: "/assets/work/find-jobs-thumb.png",
      screenshots: [
        "/assets/work/find-jobs-thumb.png",
        "/assets/work/find-jobs-2.png",
        "/assets/work/find-jobs-3.png",
      ],
    },
    featured: false,
  },
  {
    id: "inventory-angular",
    title: "Inventory Management",
    description:
      "A full-stack inventory tracking system with Angular frontend and Java Spring Boot REST API, managing assets and personnel.",
    longDescription: `A sophisticated inventory management application designed to streamline
                      asset tracking within organizations. The Angular frontend communicates with
                      a Java Spring Boot REST API backed by MySQL, offering features for asset
                      management, owner assignment, and personnel tracking with role-based access.`,
    tech: ["Angular", "TypeScript", "Java Spring Boot", "MySQL"],
    role: "Full-Stack Engineer",
    year: "2023",
    status: "live" as const,
    links: {
      live: "",
      github: "https://github.com/Raviteja77",
      caseStudy: "",
    },
    images: {
      thumbnail: "/assets/work/inventory-thumb.png",
      screenshots: [
        "/assets/work/inventory-thumb.png",
        "/assets/work/inventory-2.png",
        "/assets/work/inventory-3.png",
      ],
    },
    featured: false,
  },
];

// ============================================================
// EXPERIENCE — Work history
// ============================================================
export const experience = [
  {
    company: "Compunnel Inc",
    role: "Software Engineer",
    client: "Fidelity Investments",
    start: "Oct 2024",
    end: "Present",
    location: "Roanoke, TX, US",
    bullets: [
      "Developing custom web components using Lit Elements, creating modular and reusable UI building blocks across Fidelity's financial services platform",
      "Leveraging Storybook for component development and documentation, enabling isolated testing and visual QA before integration",
      "Working within a monorepo architecture (Nx Workspace) to maintain multiple Angular applications with shared component utilization",
      "Implementing GraphQL queries and mutations to dynamically fetch content, reducing payload sizes and improving performance",
      "Designing responsive interfaces adhering to Fidelity's design system and accessibility standards",
    ],
  },
  {
    company: "Compnova LLC",
    role: "Software Engineer",
    client: "CSX",
    start: "Feb 2024",
    end: "Oct 2024",
    location: "Jacksonville, FL, US",
    bullets: [
      "Migrated Angular 9 application to Angular 15+, resulting in 25% reduction in maintenance efforts and enhanced stability",
      "Developed user interfaces using Angular and TypeScript, achieving 30% improvement in user engagement",
      "Led implementation of Reactive Forms with Sass, resulting in 25% increase in form submission efficiency",
    ],
  },
  {
    company: "EPAM Systems",
    role: "Software Engineer",
    client: "Google",
    start: "May 2021",
    end: "Dec 2022",
    location: "Hyderabad, Telangana, India",
    bullets: [
      "Implemented and maintained complex Angular + TypeScript applications with NgRx state management, enhancing responsiveness by 20%",
      "Conducted Unit Testing with Jasmine and Karma, reducing defects by 20%",
      "Built GraphQL layer and maintained unified monorepo ensuring seamless data integration across projects",
      "Leveraged Swagger for API specification implementation, enhancing overall API functionality by 20%",
    ],
  },
  {
    company: "OpenText",
    role: "Associate Software Engineer Intern",
    client: "",
    start: "Dec 2020",
    end: "May 2021",
    location: "Remote",
    bullets: [
      "Developed highly interactive web applications using React JS and Redux, enhancing user engagement by 35%",
      "Implemented dynamic React components including Forms, Events, Router, and Redux, boosting development efficiency by 25%",
      "Engineered a reusable React Components Library, cutting feature development time by 20%",
    ],
  },
];

// ============================================================
// EDUCATION
// ============================================================
export const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Clark University",
    location: "Worcester, MA, US",
    start: "Jan 2023",
    end: "May 2024",
    gpa: "3.81 / 4.0",
  },
  {
    degree: "Bachelor of Technology in Electronics & Communications Engineering",
    school: "CMR Institute of Technology",
    location: "Hyderabad, India",
    start: "Jul 2017",
    end: "Jun 2021",
    gpa: "3.55 / 4.0",
  },
];

// ============================================================
// SKILLS — Shown in the about/skills section
// ============================================================
export const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "Java", "HTML5", "CSS3"],
  frontend: ["Angular", "React", "Redux", "NgRx", "RxJS", "Lit Elements", "PrimeNG", "Storybook"],
  backend: ["Java Spring Boot", "Django", "Flask", "Laravel", "GraphQL", "REST APIs"],
  database: ["MySQL", "MongoDB", "SQL"],
  devops: ["Docker", "Nx Workspace", "Webpack", "Git", "Jira"],
};

// ============================================================
// CERTIFICATIONS
// ============================================================
export const certifications = [
  {
    title: "GraphQL",
    issuer: "HackerRank",
    image: "/assets/certificates/graphql.png",
    category: "Backend",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    image: "/assets/certificates/responsive-web.png",
    category: "Frontend",
  },
  {
    title: "Object Oriented Programming in Java",
    issuer: "HackerRank",
    image: "/assets/certificates/oops-java.png",
    category: "Languages",
  },
  {
    title: "Problem Solving with Java",
    issuer: "HackerRank",
    image: "/assets/certificates/problem-solving-java.png",
    category: "Languages",
  },
  {
    title: "Python: Programming, Data Structures & Algorithms",
    issuer: "NPTEL",
    image: "/assets/certificates/python-dsa.jpg",
    category: "Languages",
  },
  {
    title: "EPAM Professional Education Program",
    issuer: "EPAM Systems",
    image: "/assets/certificates/epam-pep.png",
    category: "Professional",
  },
  {
    title: "Artificial Intelligence Foundations",
    issuer: "LinkedIn Learning",
    image: "/assets/certificates/ai.png",
    category: "AI/ML",
  },
  {
    title: "TechGig Code Gladiators",
    issuer: "TechGig",
    image: "/assets/certificates/techgig.png",
    category: "Competition",
  },
  {
    title: "TEKSystems Training Program",
    issuer: "TEKSystems",
    image: "/assets/certificates/teksystems.jpg",
    category: "Professional",
  },
] as const;

// ============================================================
// SITE CONFIG — SEO, metadata
// ============================================================
export const siteConfig = {
  title: "Ravi Teja Geddada — Software Engineer",
  description:
    "Software Engineer specializing in Angular, React, and scalable web applications. Currently building web components for Fidelity Investments.",
  url: "https://raviteja-geddada.is-a.dev",
  ogImage: "/assets/og-image.jpg",
  twitterHandle: "",
};
