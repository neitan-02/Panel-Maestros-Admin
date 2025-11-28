import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ContactForm from './ContactForm';

interface ContactSectionProps {
  contactForm: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  isSubmitting: boolean;
  onContactFormChange: (field: string, value: string) => void;
  onContactSubmit: (e: React.FormEvent) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  contactForm,
  isSubmitting,
  onContactFormChange,
  onContactSubmit
}) => {
  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Contáctanos</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6">
            ¿Tienes preguntas, necesitas soporte técnico o enfrentas algún problema?
          </p>
          <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Estamos aquí para ayudarte en todo momento
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Email</h3>
                  <p className="text-slate-300">contacto@educontrolpro.com</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Teléfono</h3>
                  <p className="text-slate-300">+52 (55) 1234-5678</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Oficina</h3>
                  <p className="text-slate-300">Ciudad de México, México</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm
            contactForm={contactForm}
            isSubmitting={isSubmitting}
            onContactFormChange={onContactFormChange}
            onContactSubmit={onContactSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;