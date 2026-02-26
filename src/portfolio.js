/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation
import localResumeFile from "./assets/docs/resume.pdf";

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Hadi Fathipour",
  title: "Hi, I'm Hadi",
  subTitle: emoji(
    "Backend & AI Engineer 🚀 building scalable APIs, asynchronous backend systems, and production-grade intelligent services with Python, Django, FastAPI, Docker, and modern ML tooling."
  ),
  resumeLink: localResumeFile, // Replace src/assets/docs/resume.pdf to change resume file
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/hadif1999",
  linkedin: "https://www.linkedin.com/in/hadi-fathipour-8b39071a2",
  gmail: "hadifathi13781378@gmail.com",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle:
    "Build backend and AI systems by turning complex domain requirements into reliable production services.",
  skills: [
    emoji(
      "⚡ Build secure and scalable backend APIs with Django, Django REST Framework, FastAPI, AsyncIO, and SQL/Redis stacks"
    ),
    emoji(
      "⚡ Apply AI/ML methods (TensorFlow, transformers, forecasting and vision pipelines) to practical products and analytics"
    ),
    emoji(
      "⚡ Engineer production-ready data pipelines and asynchronous services for reliable real-world AI applications"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  skillCategories: [
    {
      title: "Backend",
      skills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "fab fa-python",
          iconColor: "#3776ab",
          link: "https://www.python.org/"
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "fab fa-docker",
          iconColor: "#2496ed",
          link: "https://hub.docker.com/"
        },
        {
          skillName: "Celery",
          fontAwesomeClassname: "fas fa-leaf",
          iconSrc: require("./assets/images/celeryLogo.png"),
          iconColor: "#37814a",
          link: "https://docs.celeryq.dev/"
        },
        {
          skillName: "SQL Databases",
          fontAwesomeClassname: "fas fa-database",
          iconColor: "#336791",
          link: "https://www.postgresql.org/"
        },
        {
          skillName: "Linux",
          fontAwesomeClassname: "fab fa-linux",
          iconColor: "#fcc624",
          link: "https://www.kernel.org/"
        },
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "fas fa-bolt",
          iconSrc: "/FastAPILogo.svg",
          iconColor: "#009688",
          link: "https://fastapi.tiangolo.com/"
        },
        {
          skillName: "Redis",
          fontAwesomeClassname: "fas fa-server",
          iconSrc: "/redisLogo.svg",
          iconColor: "#dc382d",
          link: "https://redis.io/"
        }
      ]
    },
    {
      title: "Artificial Intelligence",
      skills: [
        {
          skillName: "TensorFlow",
          fontAwesomeClassname: "fas fa-brain",
          iconSrc: require("./assets/images/tensorflowLogo.svg"),
          iconColor: "#ff6f00",
          link: "https://www.tensorflow.org/"
        },
        {
          skillName: "OpenCV",
          fontAwesomeClassname: "fas fa-eye",
          iconSrc: require("./assets/images/opencvLogo.svg"),
          iconColor: "#5c3ee8",
          link: "https://opencv.org/"
        },
        {
          skillName: "IoT",
          fontAwesomeClassname: "fas fa-network-wired",
          iconSrc: require("./assets/images/iotLogo.svg"),
          iconColor: "#0ea5e9",
          link: "https://en.wikipedia.org/wiki/Internet_of_things"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "KNTU University of Technology",
      logo: require("./assets/images/kntuLogo.png"),
      subHeader: "Master of Science in Computer Engineering (Artificial Intelligence)",
      duration: "2026 - Present",
      desc: "Graduate studies focused on AI engineering, machine learning systems, and intelligent backend service design.",
      descBullets: [
        "Advanced focus on AI-driven software architecture and production-oriented ML systems",
        "Research and implementation work around real-world intelligent services"
      ]
    },
    {
      schoolName: "KNTU University of Technology",
      logo: require("./assets/images/kntuLogo.png"),
      subHeader: "Bachelor of Engineering",
      duration: "2017 - 2022",
      desc: "Graduated with GPA 3.81. Strong foundation in control systems, embedded implementation, system identification, and software programming.",
      descBullets: [
        "Designed, simulated, and implemented PID and LQR control systems on a reaction-wheel inverted pendulum",
        "Implemented hardware-in-the-loop experimentation with Arduino-based controllers"
      ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Backend/API Design",
      progressPercentage: "92%"
    },
    {
      Stack: "Machine Learning and Applied AI",
      progressPercentage: "82%"
    },
    {
      Stack: "DevOps and Containerized Services",
      progressPercentage: "78%"
    },
    {
      Stack: "Robotics and Real-Time Systems",
      progressPercentage: "74%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Backend and AI Developer",
      company: "Sanam.pro (RobTK)",
      companylogo: require("./assets/images/programmer.svg"),
      date: "2025 - 2026",
      desc: "Designed and implemented backend services for real-time drone command and telemetry management using FastAPI and Django.",
      descBullets: [
        "Built secure role-based authentication and administrative control systems",
        "Implemented modular architecture across API, business logic, and data layers",
        "Integrated MAVSDK and PyMAVLink for reliable real-time communication"
      ]
    },
    {
      role: "Freelance ML and Backend Engineer",
      company: "Self-employed",
      companylogo: require("./assets/images/programmer.svg"),
      date: "2021 - Present",
      desc: "Delivered end-to-end backend and ML solutions across NLP, analytics automation, and time-series systems.",
      descBullets: [
        "Designed RESTful APIs with Django and FastAPI for scalable business workflows",
        "Deployed production-ready containerized backend services using Docker"
      ]
    },
    {
      role: "Algorithmic Trader and Systems Developer",
      company: "Self-employed",
      companylogo: require("./assets/images/programmer.svg"),
      date: "2022 - Present",
      desc: "Designed and deployed algorithmic trading systems and backend data pipelines for cryptocurrency markets.",
      descBullets: [
        "Built reliable unattended execution services with containerized deployments",
        "Applied forecasting models (Transformers, RNNs, ARIMA) for strategy evaluation"
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Key Projects",
  subtitle: "Selected backend and AI systems from recent work",
  projects: [
    {
      image: null,
      projectName: "Urban Drone Backend and AI Control System",
      projectDesc:
        "Backend services for autonomous drone behavior, restricted-zone compliance, and real-time monitoring with asynchronous architecture.",
      footerLink: [
        {
          name: "GitHub",
          url: "https://github.com/hadif1999/pymavrest"
        }
      ]
    },
    {
      image: null,
      projectName: "IFUND Prop-Trading Platform Backend",
      projectDesc:
        "Backend and infrastructure to manage trading challenge provisioning, user account isolation, and operations dashboards.",
      footerLink: []
    },
    {
      image: null,
      projectName: "TONPAY Telegram Crypto Wallet",
      projectDesc:
        "Asynchronous wallet backend integrated with Telegram, supporting scalable data models and multi-wallet user architecture.",
      footerLink: [
        {
          name: "GitHub",
          url: "https://github.com/hadif1999/tonpay"
        }
      ]
    },
    {
      image: null,
      projectName: "Pycoin Algorithmic Trading Framework",
      projectDesc:
        "Open-source framework for market data ingestion, technical analysis, and probabilistic trend modeling in crypto markets.",
      footerLink: [
        {
          name: "GitHub",
          url: "https://github.com/hadif1999/pycoin"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "Bachelor's degree final project",
      subtitle:
        "Best Bachelor project awarded by Iranian society of aerospace engineering ",
      image: require("./assets/images/honor1.jpeg"),
      imageAlt: "certificate",
      footerLink: [
        {
          name: "project video",
          url: "https://drive.google.com/file/d/1gYnpOu11SiVv9xxXaDVf-gnaahEiiDV6/view"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+98 921 8284 877",
  email_address: "hadifathi13781378@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
