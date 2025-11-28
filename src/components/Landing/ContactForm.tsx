import React from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
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

const ContactForm: React.FC<ContactFormProps> = ({
  contactForm,
  isSubmitting,
  onContactFormChange,
  onContactSubmit
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700">
      <h3 className="text-2xl font-black text-white mb-6">Envíanos un mensaje</h3>
      
      <form onSubmit={onContactSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              value={contactForm.name}
              onChange={(e) => onContactFormChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) => onContactFormChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">
            Asunto
          </label>
          <input
            type="text"
            value={contactForm.subject}
            onChange={(e) => onContactFormChange('subject', e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            placeholder="¿En qué podemos ayudarte?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">
            Mensaje
          </label>
          <textarea
            value={contactForm.message}
            onChange={(e) => onContactFormChange('message', e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none"
            rows={4}
            placeholder="Cuéntanos más detalles sobre tu consulta..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-slate-900 py-4 px-6 rounded-xl hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-300 transition-all duration-300 shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/60 font-black disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Enviando...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Send className="w-5 h-5 mr-2" />
              Enviar Mensaje
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;