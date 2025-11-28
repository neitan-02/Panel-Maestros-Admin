import { useState } from 'react';

export const useLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teamMembers = [
    {
      name: 'Dr. María Elena Rodríguez',
      role: 'Directora Académica',
      description: 'Especialista en pedagogía matemática con 15 años de experiencia en educación primaria.',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Pedagogía', 'Matemáticas', 'Liderazgo']
    },
    {
      name: 'Ing. Carlos Mendoza',
      role: 'Director de Tecnología',
      description: 'Experto en desarrollo de plataformas educativas y sistemas de gestión académica.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Desarrollo', 'EdTech', 'Innovación']
    },
    {
      name: 'Lic. Ana Sofía García',
      role: 'Coordinadora Pedagógica',
      description: 'Especialista en diseño curricular y metodologías de enseñanza para primaria.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Currículo', 'Metodología', 'Evaluación']
    },
    {
      name: 'Psic. Roberto Jiménez',
      role: 'Especialista en Desarrollo Infantil',
      description: 'Psicólogo educativo enfocado en el desarrollo cognitivo y emocional de estudiantes.',
      image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Psicología', 'Desarrollo', 'Apoyo']
    }
  ];

  const features = [
    {
      icon: 'BookOpen',
      title: 'Gestión Académica',
      description: 'Sistema completo para el seguimiento del progreso académico de cada estudiante'
    },
    {
      icon: 'TrendingUp',
      title: 'Análisis de Progreso',
      description: 'Herramientas avanzadas de análisis para identificar áreas de mejora'
    },
    {
      icon: 'Users',
      title: 'Colaboración',
      description: 'Plataforma que conecta maestros, administradores y estudiantes'
    },
    {
      icon: 'Award',
      title: 'Reportes Detallados',
      description: 'Generación automática de reportes PDF con métricas detalladas'
    }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const updateContactForm = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return {
    isMenuOpen,
    contactForm,
    isSubmitting,
    teamMembers,
    features,
    setIsMenuOpen,
    setContactForm,
    handleContactSubmit,
    scrollToSection,
    updateContactForm
  };
};