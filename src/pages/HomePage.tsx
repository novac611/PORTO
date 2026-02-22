import { useEffect, useRef, useState } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { telegramService } from '@/services/telegramService';
import { useProjects, projectsVisible } from '@/hooks/useProjects';
import socialLinks from '@/config/social.json';
import {
  Code2,
  TrendingUp,
  ShoppingCart,
  Settings,
  Brain,
  Shield,
  ChevronLeft,
  ChevronRight,
  Send,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Zap,
  Users,
  Briefcase,
  Heart,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Instagram,
  Youtube,
  Facebook,
  Globe,
  Twitch,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Icon map for services / specializations / stats
const iconMap: Record<string, React.ElementType> = {
  Code2, TrendingUp, ShoppingCart, Settings, Brain, Shield, Cpu,
  Briefcase, Users, Zap, Heart,
  Layout: Code2, Server: Code2, Smartphone: Code2, Database: Code2, Cloud: Code2,
};

// Icon map for social links (from social.json)
const socialIconMap: Record<string, LucideIcon> = {
  Github, Linkedin, Twitter, MessageCircle, Send,
  Instagram, Youtube, Facebook, Globe, Twitch,
};

const getIcon = (name: string): React.ElementType => iconMap[name] ?? Code2;



export default function HomePage() {
  const { config } = useSiteConfig();
  const projects = useProjects();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = ['hero', 'services', 'projects', 'about', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    const result = await telegramService.sendContactMessage({
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
      timestamp: new Date().toLocaleString(),
    });

    if (result.success) {
      setFormStatus('sent');
      setContactForm({ name: '', email: '', message: '' });
      toast.success('Message sent successfully!');
      setTimeout(() => setFormStatus('idle'), 3000);
    } else {
      setFormStatus('idle');
      toast.error(result.error || 'Failed to send message');
    }
  };


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 100 ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="/" className="flex items-center gap-3">
              <img src="/plogo.png" alt={config.brandName} className="w-10 h-10" />
              <span className="font-display text-xl tracking-wider hidden sm:block">{config.brandName}</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Home', ref: heroRef },
                { label: 'Services', ref: servicesRef },
                ...(projectsVisible ? [{ label: 'Projects', ref: projectsRef }] : []),
                { label: 'About', ref: aboutRef },
                { label: 'Contact', ref: contactRef },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.ref)}
                  className="text-sm text-white/70 hover:text-cyan transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10">
            <div className="px-4 py-4 space-y-3">
              {[
                { label: 'Home', ref: heroRef },
                { label: 'Services', ref: servicesRef },
                ...(projectsVisible ? [{ label: 'Projects', ref: projectsRef }] : []),
                { label: 'About', ref: aboutRef },
                { label: 'Contact', ref: contactRef },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.ref)}
                  className="block w-full text-left py-2 text-white/70 hover:text-cyan transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <img
              src="/hero-bg.jpg"
              alt="Professional workspace"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 transition-all duration-1000 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="/plogo.png"
                  alt={config.brandName}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                />
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none">
                  <span className="block">{config.personal.name.split(' ')[0].toUpperCase()}</span>
                  <span className="block text-cyan">{config.personal.name.split(' ')[1]?.toUpperCase() || 'CORE'}</span>
                </h1>
              </div>

              <p className="text-xl sm:text-2xl text-white/70">
                {config.personal.title}
              </p>

              <p className="text-lg text-white/60 max-w-lg">
                {config.personal.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {projectsVisible && (
                  <Button
                    onClick={() => scrollToSection(projectsRef)}
                    className="bg-cyan text-black hover:bg-cyan-dark px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-glow-cyan"
                  >
                    View My Work
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => scrollToSection(contactRef)}
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base"
                >
                  Get in Touch
                </Button>
              </div>

              {/* Social Links — from src/config/social.json */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map((link) => {
                  const SocialIcon = socialIconMap[link.icon] ?? Globe;
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.label}
                      className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-cyan/20 hover:text-cyan transition-colors"
                    >
                      <SocialIcon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Glass Card — Hero Specializations */}
            <div className={`hidden lg:block transition-all duration-1000 delay-300 ${isVisible['hero'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
              <div className="glass-card rounded-2xl p-8 space-y-6 animate-float border-cyan/20">
                {(config.specializations ?? []).map((spec, i) => {
                  const SpecIcon = getIcon(spec.icon);
                  return (
                    <>
                      {i > 0 && <div key={`div-${spec.id}`} className="h-px bg-white/10" />}
                      <div key={spec.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-cyan/20 rounded-xl flex items-center justify-center">
                          <SpecIcon className="w-8 h-8 text-cyan" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl">{spec.title}</h3>
                          <p className="text-white/60">{spec.subtitle}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-cyan rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className="relative py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible['services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <span className="text-cyan text-sm font-medium tracking-wider uppercase">What I Can Do</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2">SKILLS</h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              return (
                <div
                  key={service.id}
                  className={`group relative glass-card rounded-xl p-6 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-glow-cyan border-transparent hover:border-cyan/30 ${isVisible['services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-cyan/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-cyan" />
                  </div>
                  <h3 className="font-display text-xl mb-2">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>

                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan/10 to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section — driven by src/prs/ folders */}
      {projectsVisible && (
        <section
          id="projects"
          ref={projectsRef}
          className="relative py-24 md:py-32 bg-dark-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-700 ${isVisible['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <div>
                <span className="text-cyan text-sm font-medium tracking-wider uppercase">Portfolio</span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2">FEATURED PROJECTS</h2>
              </div>
              {projects.length > 1 && (
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
                    className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-cyan hover:border-cyan hover:text-black transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
                    className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-cyan hover:border-cyan hover:text-black transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-20 text-white/40">
                <p className="text-xl">No projects found.</p>
                <p className="text-sm mt-2">Add project folders to <code className="text-cyan">src/prs/</code></p>
              </div>
            ) : (
              <div className={`grid lg:grid-cols-2 gap-8 items-center transition-all duration-700 delay-200 ${isVisible['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                {/* Project Image */}
                <div className="relative group overflow-hidden rounded-2xl border border-white/10">
                  {projects[activeProject]?.image ? (
                    <img
                      src={projects[activeProject].image}
                      alt={projects[activeProject].title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-white/5 flex items-center justify-center">
                      <Code2 className="w-16 h-16 text-white/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Tags */}
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    {projects[activeProject]?.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-cyan/20 backdrop-blur-sm rounded-full text-xs text-cyan border border-cyan/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-6">
                  <h3 className="font-display text-3xl sm:text-4xl">{projects[activeProject]?.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {projects[activeProject]?.description}
                  </p>

                  <div className="flex gap-4">
                    {projects[activeProject]?.liveUrl && (
                      <a href={projects[activeProject].liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-cyan text-black hover:bg-cyan-dark px-6">
                          View Project
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    )}
                    {projects[activeProject]?.repoUrl && (
                      <a href={projects[activeProject].repoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Github className="w-4 h-4 mr-2" />
                          Source Code
                        </Button>
                      </a>
                    )}
                  </div>

                  {/* Project Indicators */}
                  {projects.length > 1 && (
                    <div className="flex gap-2 pt-4">
                      {projects.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveProject(index)}
                          className={`h-1 rounded-full transition-all duration-300 ${index === activeProject ? 'w-8 bg-cyan' : 'w-4 bg-white/30 hover:bg-white/50'
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="relative py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className={`relative transition-all duration-700 ${isVisible['about'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
              <div className="relative">
                <img
                  src={config.personal.avatar}
                  alt={config.personal.name}
                  className="w-full max-w-md mx-auto rounded-2xl border border-white/10"
                />

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-cyan/30 rounded-tl-2xl" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-cyan/30 rounded-br-2xl" />
              </div>
            </div>

            {/* Content */}
            <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible['about'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
              <div>
                <span className="text-cyan text-sm font-medium tracking-wider uppercase">About Me</span>
                <h2 className="font-display text-4xl sm:text-5xl mt-2">WHO I AM</h2>
              </div>

              <p className="text-white/70 text-lg leading-relaxed">
                {config.personal.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-4 h-4 text-cyan" />
                  {config.personal.location}
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Mail className="w-4 h-4 text-cyan" />
                  {config.personal.email}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {config.stats.map((stat, index) => {
                  const IconComponent = getIcon(stat.icon);
                  return (
                    <div
                      key={stat.label}
                      className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <IconComponent className="w-6 h-6 text-cyan mx-auto mb-2" />
                      <div className="font-display text-2xl text-cyan">{stat.value}</div>
                      <div className="text-white/60 text-xs">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="relative py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left side - Info */}
            <div className={`space-y-8 transition-all duration-700 ${isVisible['contact'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
              <div>
                <span className="text-cyan text-sm font-medium tracking-wider uppercase">Contact</span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2">LET'S WORK TOGETHER</h2>
              </div>

              <p className="text-white/70 text-lg leading-relaxed">
                Have a project in mind? Let's discuss how I can help bring your ideas to life.
                I'm always excited to work on new challenges.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Email</div>
                    <a href={`mailto:${config.personal.email}`} className="text-white hover:text-cyan transition-colors">
                      {config.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Phone</div>
                    <a href={`tel:${config.personal.phone}`} className="text-white hover:text-cyan transition-colors block">
                      {config.personal.phone}
                    </a>
                    {config.personal.phone2 && (
                      <a href={`tel:${config.personal.phone2}`} className="text-white hover:text-cyan transition-colors block">
                        {config.personal.phone2}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Location</div>
                    <div className="text-white">{config.personal.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className={`transition-all duration-700 delay-200 ${isVisible['contact'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
              <form onSubmit={handleContactSubmit} className="glass-card rounded-2xl p-8 space-y-6 border-cyan/20">
                {formStatus === 'sent' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-cyan" />
                    </div>
                    <h3 className="font-display text-2xl mb-2">Message Sent!</h3>
                    <p className="text-white/60">I'll get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Name</label>
                      <Input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20"
                      />
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">Email</label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20"
                      />
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">Message</label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        required
                        rows={4}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full bg-cyan text-black hover:bg-cyan-dark py-6 text-base font-medium transition-all duration-300 hover:shadow-glow-cyan disabled:opacity-50"
                    >
                      {formStatus === 'sending' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/plogo.png" alt={config.brandName} className="w-8 h-8" />
              <span className="font-display text-xl tracking-wider">{config.brandName}</span>
            </div>

            <div className="text-white/40 text-sm">
              © {new Date().getFullYear()} {config.brandName}. All rights reserved.
            </div>

            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-cyan transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
