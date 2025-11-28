import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  expertise: string[];
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers }) => {
  return (
    <section id="equipo" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Nuestro
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Equipo</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Profesionales apasionados por la educación y la tecnología,
            trabajando juntos para crear soluciones excepcionales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-2 group">
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-cyan-500/50 group-hover:ring-cyan-400 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full"></div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-black text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 font-bold text-sm mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{member.description}</p>

                <div className="flex flex-wrap gap-1 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full font-bold border border-cyan-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;