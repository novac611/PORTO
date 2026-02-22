// Site Configuration - Editable via Admin Dashboard
export interface SiteConfig {
  // Branding
  brandName: string;
  tagline: string;

  // Personal Info
  personal: {
    name: string;
    title: string;
    subtitle: string;
    description: string;
    email: string;
    phone: string;
    phone2: string;
    location: string;
    avatar: string;
    resumeUrl: string;
  };

  // Social Links
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    telegram: string;
  };

  // Social Visibility
  socialVisibility: {
    github: boolean;
    linkedin: boolean;
    twitter: boolean;
    telegram: boolean;
  };

  // Hero Specialization Cards
  specializations: {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
  }[];

  // Services
  services: {
    id: string;
    icon: string;
    title: string;
    description: string;
  }[];

  // Projects
  projects: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl: string;
    repoUrl: string;
    featured: boolean;
  }[];

  // Stats
  stats: {
    value: string;
    label: string;
    icon: string;
  }[];

  // Skills
  skills: {
    category: string;
    items: {
      name: string;
      level: number;
    }[];
  }[];

  // Availability
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    message: string;
  };
}


// Default configuration
export const defaultSiteConfig: SiteConfig = {
  brandName: 'ABDULRAHMAN',
  tagline: 'Computer Technical Engineering · Networking · Linux',

  personal: {
    name: 'Abdulrahman M.A',
    title: 'Computer Technical Engineering Student',
    subtitle: 'Networking · Linux · CCNA Certified',
    description:
      'Final-year Computer Technical Engineering student with academic background in networking, operating systems, and Linux fundamentals. Completed CCNA 1 certification with strong understanding of network concepts and infrastructure basics. Seeking a part-time opportunity to apply technical knowledge in a practical IT environment and continue professional growth.',
    email: 'jj611a@gmail.com',
    phone: '+964 773 636 9146',
    phone2: '+964 778 082 5460',
    location: 'Iraq, Kirkuk',
    avatar: '/about-portrait.jpg',
    resumeUrl: '/resume.pdf',
  },

  social: {
    github: '',
    linkedin: '',
    twitter: '',
    telegram: '',
  },

  socialVisibility: {
    github: true,
    linkedin: true,
    twitter: true,
    telegram: true,
  },

  specializations: [
    { id: '1', title: 'Networking', subtitle: 'TCP/IP · Routing · Switching', icon: 'Cpu' },
    { id: '2', title: 'Linux Systems', subtitle: 'Debian · CLI · Shell Scripting', icon: 'Shield' },
    { id: '3', title: 'CCNA Certified', subtitle: 'Cisco Networking Academy', icon: 'Zap' },
  ],

  services: [
    {
      id: '1',
      icon: 'Cpu',
      title: 'Network Configuration',
      description: 'TCP/IP fundamentals, IP addressing & subnetting, basic routing & switching concepts. Hands-on experience with Cisco equipment.',
    },
    {
      id: '2',
      icon: 'Shield',
      title: 'Linux Administration',
      description: 'Linux command line, file permission management, package management with apt, basic shell scripting, and virtual machine setup with VirtualBox.',
    },
    {
      id: '3',
      icon: 'Settings',
      title: 'Operating Systems',
      description: 'Experience with Linux (Debian-based) and Windows basic configuration. Comfortable administering and troubleshooting both environments.',
    },
    {
      id: '4',
      icon: 'TrendingUp',
      title: 'Network Troubleshooting',
      description: 'OSI & TCP/IP model analysis, router and switch configuration, and network troubleshooting concepts learned through CCNA 1 certification.',
    },
    {
      id: '5',
      icon: 'Brain',
      title: 'Analytical Thinking',
      description: 'Strong problem-solving mindset and analytical thinking developed through engineering studies. Fast learner with a team-oriented approach.',
    },
    {
      id: '6',
      icon: 'Code2',
      title: 'Technical Documentation',
      description: 'Ability to document network topologies, write clear technical reports, and communicate complex infrastructure concepts effectively.',
    },
  ],

  projects: [],

  stats: [
    { value: '2026', label: 'Expected Graduation', icon: 'Briefcase' },
    { value: 'CCNA 1', label: 'Cisco Certified', icon: 'Zap' },
    { value: 'Kirkuk', label: 'Location', icon: 'Users' },
    { value: '100%', label: 'Dedication', icon: 'Heart' },
  ],

  skills: [
    {
      category: 'Networking',
      items: [
        { name: 'TCP/IP Fundamentals', level: 80 },
        { name: 'IP Addressing & Subnetting', level: 75 },
        { name: 'Routing & Switching Concepts', level: 70 },
        { name: 'Network Troubleshooting', level: 70 },
      ],
    },
    {
      category: 'Linux & OS',
      items: [
        { name: 'Linux CLI (Debian)', level: 75 },
        { name: 'Shell Scripting', level: 65 },
        { name: 'Package Management', level: 75 },
        { name: 'Virtual Machines', level: 70 },
      ],
    },
  ],

  availability: {
    status: 'available',
    message: 'Open to part-time opportunities',
  },
};

// Load config from localStorage or use default
export const loadSiteConfig = (): SiteConfig => {
  const saved = localStorage.getItem('novacore_site_config');
  if (saved) {
    try {
      return { ...defaultSiteConfig, ...JSON.parse(saved) };
    } catch {
      return defaultSiteConfig;
    }
  }
  return defaultSiteConfig;
};

// Save config to localStorage
export const saveSiteConfig = (config: SiteConfig): void => {
  localStorage.setItem('novacore_site_config', JSON.stringify(config));
};

// Telegram Bot Configuration
export interface TelegramConfig {
  botToken: string;
  userId: string;
  enabled: boolean;
}

export const loadTelegramConfig = (): TelegramConfig => {
  const saved = localStorage.getItem('novacore_telegram_config');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { botToken: '', userId: '', enabled: false };
    }
  }
  return { botToken: '', userId: '', enabled: false };
};

export const saveTelegramConfig = (config: TelegramConfig): void => {
  localStorage.setItem('novacore_telegram_config', JSON.stringify(config));
};


