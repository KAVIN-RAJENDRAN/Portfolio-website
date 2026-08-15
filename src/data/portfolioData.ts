export interface Project {
  number: string;
  title: string;
  duration?: string;
  type?: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  confidential?: boolean;
  ndaLabel?: string;
  caseStudy?: {
    overview: string;
    challenges: string[];
    solutions: string[];
    results: string[];
  };
}

export interface Experience {
  company: string;
  companyUrl: string;
  logo: string;
  role: string;
  location: string;
  locationMapsUrl: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  duration: string;
  description: string;
  techStack: string[];
  year: number;
  shortLabel: string;
}

export interface Certification {
  category: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  certNumber?: string;
  skills: string[];
  logo: string;
  certificateUrl?: string;
  verificationUrl?: string;
  status: 'CERTIFIED' | 'IN_PROGRESS' | 'EXPIRED';
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    headline: string;
    bio: string;
    profileImage: string;
    resumePdf: string;
    socials: {
      linkedin: string;
      github: string;
    };
  };
  education: {
    degree: string;
    specialization: string;
    institution: string;
    institutionUrl: string;
    logo: string;
    gpa: string;
    duration: string;
    location: string;
  };
  skills: {
    category: string;
    items: { name: string; icon?: string; url?: string }[];
  }[];
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  contact: {
    timezone: string;
    responseTime: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
  };
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    ogImage: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Kavin Rajendran",
    role: "AI Engineer",
    headline: "B.Tech CSE with Specialization in Artificial Intelligence and Machine Learning",
    bio: "B.Tech student in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology. Passionate about building intelligent software solutions that combine AI, full-stack development and data-driven technologies. With hands-on experience through industry internships and research projects, I enjoy solving real-world problems by developing scalable, efficient and impactful applications. Always learning, always building.",
    profileImage: "./assets/kavin-profile.webp",
    resumePdf: "./assets/Kavin_Rajendran_Resume.pdf",
    socials: {
      linkedin: "https://www.linkedin.com/in/kavin-rajendran-13514b282/",
      github: "https://github.com/KAVIN-RAJENDRAN"
    }
  },
  education: {
    degree: "B.Tech CSE (AI & ML)",
    specialization: "Artificial Intelligence & Machine Learning",
    institution: "SRM Institute of Science and Technology",
    institutionUrl: "https://www.srmist.edu.in/",
    logo: "./assets/srm-logo.webp",
    gpa: "9.57",
    duration: "2023–2027",
    location: "Kattankulathur, Chennai"
  },
  skills: [
    {
      category: "Languages",
      items: [
        { name: "Python", url: "https://www.python.org/" },
        { name: "TypeScript", url: "https://www.typescriptlang.org/" },
        { name: "Java", url: "https://www.java.com/" },
        { name: "C++", url: "https://isocpp.org/" }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", url: "https://nodejs.org/" },
        { name: "FastAPI", url: "https://fastapi.tiangolo.com/" },
        { name: "REST APIs", url: "https://restfulapi.net/" },
        { name: "LangGraph", url: "https://langchain-ai.github.io/langgraph/" }
      ]
    },
    {
      category: "Databases and Cloud",
      items: [
        { name: "MySQL", url: "https://www.mysql.com/" },
        { name: "PostgreSQL", url: "https://www.postgresql.org/" },
        { name: "Firebase", url: "https://firebase.google.com/" },
        { name: "Supabase", url: "https://supabase.com/" }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React.js", url: "https://react.dev/" },
        { name: "React Native", url: "https://reactnative.dev/" },
        { name: "Three.js", url: "https://threejs.org/" },
        { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
      ]
    },
    {
      category: "AI, Data and Analytics",
      items: [
        { name: "Machine Learning", url: "https://en.wikipedia.org/wiki/Machine_learning" },
        { name: "Data Science", url: "https://en.wikipedia.org/wiki/Data_science" },
        { name: "Data Engineering", url: "https://en.wikipedia.org/wiki/Data_engineering" },
        { name: "Pandas", url: "https://pandas.pydata.org/" },
        { name: "NumPy", url: "https://numpy.org/" },
        { name: "SciPy", url: "https://scipy.org/" },
        { name: "Matplotlib", url: "https://matplotlib.org/" },
        { name: "Power BI", url: "https://powerbi.microsoft.com/" }
      ]
    },
    {
      category: "DevOps and Tools",
      items: [
        { name: "Docker", url: "https://www.docker.com/" },
        { name: "Kubernetes", url: "https://kubernetes.io/" },
        { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
        { name: "CI/CD", url: "https://en.wikipedia.org/wiki/CI/CD" },
        { name: "Git", url: "https://git-scm.com/" },
        { name: "GitHub", url: "https://github.com/" }
      ]
    }
  ],
  experiences: [
    {
      company: "Renault Nissan Automotive India Private Limited",
      companyUrl: "https://www.renault-nissan-india.com/",
      logo: "./assets/renault-logo.webp",
      role: "RPA & Data Intern",
      location: "Oragadam, Chennai",
      locationMapsUrl: "https://maps.app.goo.gl/9mS18n6e1H6WkM1L9",
      startDate: "2025-03-01",
      endDate: "2025-04-30",
      duration: "2 Months",
      description: "Designed RPA workflows and custom data-visualization solutions to automate manufacturing business processes. Engineered Excel macros, Power Apps pipelines and interactive Power BI dashboards to improve reporting efficiency and operational visibility.",
      techStack: ["RPA", "Excel Macros", "Power BI", "Power Apps", "Automation", "Data Visualization"],
      year: 2025,
      shortLabel: "RNAIPL · Chennai"
    },
    {
      company: "Tube Products of India, Murugappa Group",
      companyUrl: "https://www.tiindia.com/",
      logo: "./assets/murugappa-logo.webp",
      role: "Automation & AI Intern",
      location: "Avadi, Chennai",
      locationMapsUrl: "https://maps.app.goo.gl/hGf25eJcWkP6p97U8",
      startDate: "2026-02-01",
      endDate: "2026-05-31",
      duration: "4 Months",
      description: "Designed AI-driven process-monitoring solutions and full-stack system architectures for industrial environments. Spearheaded a QR-enabled smart inventory system and developed a computer-vision-based wet-process monitoring solution using Raspberry Pi.",
      techStack: ["Automation", "Full Stack", "QR Tracking", "Firebase", "Supabase", "Raspberry Pi", "Computer Vision"],
      year: 2026,
      shortLabel: "Murugappa Group · Avadi, Chennai"
    }
  ],
  projects: [
    {
      number: "01",
      title: "Adaptive Behavioral Fingerprinting for Black-Box Backdoor Detection",
      description: "Developed a web-based software application using Flask to analyze and classify the behavior of black-box AI models through a structured response-processing pipeline. Designed and implemented modular components for request handling, feature extraction, response analysis, and machine learning classification. Integrated the machine learning modules, achieving approximately 86% detection accuracy while improving system scalability and maintainability.",
      techStack: ["Flask", "Python", "Machine Learning", "REST APIs", "HTML/CSS"],
      githubUrl: "https://github.com/KAVIN-RAJENDRAN/Adaptive-Behavioral-Fingerprinting",
      featured: true
    },
    {
      number: "02",
      title: "SignX",
      description: "Developed a full-stack web application that recognizes sign language gestures using computer vision and deep learning models. Designed and integrated frontend, backend, image processing, and machine learning modules. Achieved 92% recognition accuracy and won recognition under the Web Application category for delivering an accessible and user-centric software solution.",
      techStack: ["Computer Vision", "Deep Learning", "Python", "React", "Flask"],
      githubUrl: "https://github.com/KAVIN-RAJENDRAN/SignX",
      featured: true
    },
    {
      number: "03",
      title: "Electra",
      description: "Developed a secure full-stack web application using React, Flask, MySQL, and REST APIs. Implemented authentication, role-based access control, CRUD operations, and backend API integration. Designed a scalable relational database architecture for secure and efficient data management.",
      techStack: ["React", "Flask", "MySQL", "REST APIs", "Tailwind CSS"],
      githubUrl: "https://github.com/KAVIN-RAJENDRAN/Electra",
      featured: true
    },
    {
      number: "04",
      title: "Job Salary Prediction and Career Path Modeling",
      duration: "September 2025 – November 2025",
      type: "Academic Project",
      description: "Built a machine-learning model to predict job salaries based on role, skills, experience and industry data. Performed data preprocessing, feature engineering and model evaluation. Analysed career trends to help users understand potential career-growth paths.",
      techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Machine Learning"],
      githubUrl: "", // Empty string triggers the disabled button state
      featured: false
    }
  ],
  certifications: [
    {
      category: "Generative AI",
      name: "GitHub Copilot",
      issuer: "Microsoft Learn",
      issueDate: "16 April 2026",
      expiryDate: "17 April 2028",
      credentialId: "8CC05683AD70D304",
      certNumber: "E9679C-1U5D46",
      skills: ["GitHub Copilot", "Generative AI", "Developer Productivity", "Software Automation"],
      logo: "./assets/microsoft-logo.webp",
      certificateUrl: "./assets/copilot-cert.pdf",
      verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-gb/KAVINRAJENDRAN-5309/8CC05683AD70D304?sharingId=D3171EA5FFE8213",
      status: "CERTIFIED"
    },
    {
      category: "Machine Learning",
      name: "Supervised Machine Learning: Regression and Classification",
      issuer: "DeepLearning.AI | Stanford Online",
      issueDate: "Feb 11, 2025",
      credentialId: "X1A8JUJAKUVN",
      skills: ["Supervised Learning", "Regression Models", "Classification Algorithms", "Python", "Machine Learning"],
      logo: "./assets/deeplearning-logo.webp",
      certificateUrl: "./assets/ml-cert.webp",
      verificationUrl: "https://coursera.org/verify/X1A8JUJAKUVN",
      status: "CERTIFIED"
    }
  ],
  contact: {
    timezone: "IST (UTC+5:30)",
    responseTime: "within 24 hours",
    email: "kavin.rajendran1210@gmail.com",
    phone: "+91 8925450697",
    whatsapp: "+918925450697",
    location: "Avadi, Chennai, Tamil Nadu, India"
  },
  seo: {
    title: "Kavin Rajendran | AI Engineer",
    description: "Portfolio of Kavin Rajendran, an Artificial Intelligence and Machine Learning engineering student focused on AI systems, full-stack development, data engineering and intelligent industrial solutions.",
    canonicalUrl: "https://kavin-rajendran.github.io/",
    ogImage: "./assets/favicon.svg"
  }
};
