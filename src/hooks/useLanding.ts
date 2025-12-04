import { useState } from 'react';
import luisjpg from '../assets/integrantes/luis.jpg';
import oscarjpg from '../assets/integrantes/oscar.jpg';
import ricardojpg from '../assets/integrantes/ricardo.jpg';
import nathanjpg from '../assets/integrantes/nathan.jpg';

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
      name: 'Nathan Hernandez Moreno',
      role: 'Desarrollo Fullstack',
      description: '',
      image: nathanjpg,
      expertise: ['Pedagogía', 'Matemáticas', 'Liderazgo']
    },
    {
      name: 'Oscar Bello Chino',
      role: 'QA tester',
      description: '',
      image: oscarjpg,
      expertise: ['Desarrollo', 'EdTech', 'Innovación']
    },
    {
      name: 'Luis Ángel Bernal Gutiérrez',
      role: 'Desarrollador Frontend',
      description: '',
      image: luisjpg,
      expertise: ['Currículo', 'Metodología', 'Evaluación']
    },
    {
      name: 'Ricardo Alexis Sánchez Maya',
      role: 'CEO',
      description: 'Psicólogo educativo enfocado en el desarrollo cognitivo y emocional de estudiantes.',
      image: ricardojpg,
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