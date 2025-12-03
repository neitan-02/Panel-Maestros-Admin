// StudentReportModal.tsx - Actualizado
import React, { useRef } from 'react';
import { User } from '../types/auth';
import { 
  X, Download, Printer, FileText, BarChart3, Trophy, 
  Clock, Award, CheckCircle, AlertCircle, Star, Zap 
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface StudentReportModalProps {
  student: User;
  mathBlocks: any[];
  studentProgress?: any;
  onClose: () => void;
}

const StudentReportModal: React.FC<StudentReportModalProps> = ({
  student,
  mathBlocks,
  studentProgress,
  onClose
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const generateDetailedPDF = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`reporte_detallado_${student.username}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Reporte Detallado</h2>
                <p className="text-blue-100">{student.username} - {student.grado}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={generateDetailedPDF}
                className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                PDF
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Contenido del reporte */}
        <div ref={reportRef} className="flex-1 overflow-y-auto p-6">
          {/* Información del estudiante */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-bold text-gray-800">Información Personal</h3>
                <p className="text-gray-600">Nombre: {student.username}</p>
                <p className="text-gray-600">Grado: {student.grado}</p>
                <p className="text-gray-600">Email: {student.email}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Progreso General</h3>
                <p className="text-gray-600">
                  Avance: {studentProgress?.progresoGeneral || 0}%
                </p>
                <p className="text-gray-600">
                  Tareas: {studentProgress?.totalTareasCompletadas || 0} completadas
                </p>
                <p className="text-gray-600">
                  Puntaje: {studentProgress?.totalPuntaje || 0} puntos
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Desempeño</h3>
                <div className="flex items-center">
                  {studentProgress?.necesitaAyuda ? (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Necesita apoyo
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Buen desempeño
                    </div>
                  )}
                </div>
                <p className="text-gray-600">
                  Logros: {studentProgress?.logros || 0} obtenidos
                </p>
                <p className="text-gray-600">
                  Tiempo: {Math.floor((studentProgress?.tiempoTotal || 0) / 60)} horas
                </p>
              </div>
            </div>
          </div>

          {/* Progreso por bloques */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
              Progreso por Bloques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentProgress?.bloques?.map((bloque: any) => {
                const blockInfo = mathBlocks.find(b => b.id === bloque.bloque);
                return (
                  <div key={bloque.bloque} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {blockInfo?.icon && (
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${blockInfo.color} mr-3`}>
                            <blockInfo.icon className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-gray-800">Bloque {bloque.bloque}</h4>
                          <p className="text-sm text-gray-600">{blockInfo?.name}</p>
                        </div>
                      </div>
                      <span className={`text-lg font-bold ${
                        bloque.porcentaje >= 80 ? 'text-green-600' :
                        bloque.porcentaje >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {bloque.porcentaje}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${
                            bloque.porcentaje >= 80 ? 'bg-green-500' :
                            bloque.porcentaje >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${bloque.porcentaje}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Tareas: {bloque.completado}/{bloque.total}</span>
                        <span>Puntos: {bloque.puntajeTotal}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-600" />
              Recomendaciones
            </h3>
            {studentProgress?.progresoGeneral >= 80 ? (
              <div className="space-y-3">
                <p className="text-gray-700">🌟 <strong>Excelente trabajo!</strong> El estudiante está avanzando muy bien.</p>
                <p className="text-gray-700">✅ Continuar con el ritmo actual de aprendizaje.</p>
                <p className="text-gray-700">🎯 Considerar desafíos más avanzados en los bloques dominados.</p>
              </div>
            ) : studentProgress?.progresoGeneral >= 50 ? (
              <div className="space-y-3">
                <p className="text-gray-700">📈 <strong>Buen progreso.</strong> El estudiante mantiene un avance constante.</p>
                <p className="text-gray-700">✅ Continuar con la práctica regular.</p>
                <p className="text-gray-700">🎯 Enfocarse en los bloques con menor porcentaje de avance.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-700">🎯 <strong>Se requiere atención adicional.</strong> El estudiante necesita más apoyo.</p>
                <p className="text-gray-700">✅ Recomendar 30 minutos de práctica diaria.</p>
                <p className="text-gray-700">🎯 Revisar los conceptos básicos de los bloques con menor avance.</p>
                <p className="text-gray-700">✅ Programar sesiones de apoyo individualizado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReportModal;