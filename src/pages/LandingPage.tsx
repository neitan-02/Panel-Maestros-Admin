import React from 'react';
import { useLandingPage } from '../hooks/useLanding';
import Navigation from '../components/Landing/Navigation';
import HeroSection from '../components/Landing/HeroSection';
import AboutSection from '../components/Landing/AboutSection';
import TeamSection from '../components/Landing/TeamSection';
import ContactSection from '../components/Landing/ContactSection';
import Footer from '../components/Landing/Footer';

interface LandingPageProps {
  onAccessPanel: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccessPanel }) => {
  const {
    isMenuOpen,
    contactForm,
    isSubmitting,
    teamMembers,
    features,
    setIsMenuOpen,
    handleContactSubmit,
    scrollToSection,
    updateContactForm
  } = useLandingPage();

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onScrollToSection={scrollToSection}
        onAccessPanel={onAccessPanel}
      />

      <HeroSection
        onAccessPanel={onAccessPanel}
        onScrollToSection={scrollToSection}
        features={features}
      />

      <AboutSection />

      <TeamSection teamMembers={teamMembers} />

      <ContactSection
        contactForm={contactForm}
        isSubmitting={isSubmitting}
        onContactFormChange={updateContactForm}
        onContactSubmit={handleContactSubmit}
      />

      <Footer />
    </div>
  );
};

export default LandingPage;