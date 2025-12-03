import React, { useState } from "react";
import { FileText, X as XIcon, Users, UserIcon } from "lucide-react";
import jsPDF from "jspdf";

interface User {
  id: string;
  username: string;
  grado: string;
}

interface ProgresoBloque {
  nombre: string;
  porcentaje: number;
  completado: number;
  total: number;
  puntajeTotal: number;
}

interface ProgresoUsuario {
  usuarioId: string;
  nombre: string;
  grado: string;
  progresoGeneral: number;
  bloques: ProgresoBloque[];
  totalTareasCompletadas: number;
  totalPuntaje: number;
  logros: number;
  necesitaAyuda: boolean;
}

interface Props {
  students: User[];
  mathBlocks: any[];
  teacher: any;
  studentProgress: ProgresoUsuario[];
  onClose: () => void;
}

// ---------------------- UTILIDADES ----------------------

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

const primaryColor = "#2C6BED";

// ---------------------- COMPONENTE ----------------------

const BulkReportModal: React.FC<Props> = ({
  students,
  mathBlocks,
  teacher,
  studentProgress,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] =
    useState<"general" | "individual">("general");
  const [selectedStudent, setSelectedStudent] = useState("all");

  // Estadísticas generales de la clase
  const classStats = (() => {
    if (!studentProgress.length) return null;

    const avg = (field: keyof ProgresoUsuario) =>
      Math.round(
        studentProgress.reduce((a, b) => a + (b[field] as number), 0) /
          studentProgress.length
      );

    const completedTasks = studentProgress.reduce(
      (a, b) => a + b.totalTareasCompletadas,
      0
    );
    const totalTasks =
      mathBlocks.reduce((a, b) => a + b.totalTareas, 0) *
      studentProgress.length;

    return {
      averageProgress: avg("progresoGeneral"),
      averageScore: avg("totalPuntaje"),
      completionRate: Math.round((completedTasks / totalTasks) * 100),
    };
  })();

  // ---------------------- PDF INDIVIDUAL ----------------------

  const generateIndividualPDF = async (
    student: User,
    progress?: ProgresoUsuario
  ) => {
    setLoading(true);

    try {
      const doc = new jsPDF("portrait", "pt", "letter");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Fondo
      try {
        const bg = await loadImage("/logo.png");
        doc.addImage(bg, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
      } catch {}

      // Título
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(primaryColor);
      doc.text("📘 Reporte Individual de Progreso", pageWidth / 2, 60, {
        align: "center",
      });

      doc.setDrawColor(primaryColor);
      doc.setLineWidth(2);
      doc.line(40, 80, pageWidth - 40, 80);

      // Info general
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.setTextColor("#000");

      let y = 110;
      const m = 40;

      doc.text(`👤 Estudiante: ${student.username}`, m, y);
      y += 18;
      doc.text(`🎓 Grado: ${student.grado}`, m, y);
      y += 18;
      doc.text(`👨‍🏫 Maestro: ${teacher?.username}`, m, y);

      y += 30;

      // Resumen
      if (progress) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("📊 Resumen del Progreso", m, y);
        y += 20;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(13);

        doc.text(`Progreso General: ${progress.progresoGeneral}%`, m, y);
        y += 16;
        doc.text(
          `Tareas Completadas: ${progress.totalTareasCompletadas}`,
          m,
          y
        );
        y += 16;
        doc.text(`Puntaje Total: ${progress.totalPuntaje}`, m, y);
        y += 30;

        // Bloques
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("📚 Detalle por Bloques", m, y);
        y += 20;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        progress.bloques.forEach((b) => {
          doc.text(
            `• ${b.nombre}: ${b.porcentaje}% (${b.completado}/${b.total})`,
            m,
            y
          );
          y += 16;
        });
      }

      doc.save(`reporte_${student.username}.pdf`);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- PDF GENERAL ----------------------

  const generateClassPDF = async () => {
    setLoading(true);

    try {
      const doc = new jsPDF("landscape", "pt", "letter");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Fondo
      try {
        const bg = await loadImage("/logo.png");
        doc.addImage(bg, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
      } catch {}

      // Título
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(primaryColor);
      doc.text("📘 Reporte General de la Clase", pageWidth / 2, 60, {
        align: "center",
      });

      doc.setDrawColor(primaryColor);
      doc.setLineWidth(2);
      doc.line(50, 80, pageWidth - 50, 80);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor("#000");

      let y = 115;
      const m = 50;

      doc.text(`👨‍🏫 Maestro: ${teacher?.username}`, m, y);
      y += 18;
      doc.text(`👥 Estudiantes: ${students.length}`, m, y);
      y += 18;
      doc.text(`📅 Fecha: ${new Date().toLocaleDateString()}`, m, y);
      y += 28;

      if (classStats) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("📊 Estadísticas Generales", m, y);
        y += 22;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(13);

        doc.text(
          `• Progreso Promedio: ${classStats.averageProgress}%`,
          m,
          y
        );
        y += 16;
        doc.text(`• Puntaje Promedio: ${classStats.averageScore}`, m, y);
        y += 16;
        doc.text(
          `• Tasa de Finalización: ${classStats.completionRate}%`,
          m,
          y
        );
      }

      doc.save(`reporte_general.pdf`);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- GENERAR ----------------------

  const handleGenerate = async () => {
    if (reportType === "general") return generateClassPDF();

    if (selectedStudent === "all") {
      for (const s of students) {
        await generateIndividualPDF(
          s,
          studentProgress.find((p) => p.usuarioId === s.id)
        );
      }
    } else {
      const student = students.find((s) => s.id === selectedStudent);
      const progress = studentProgress.find(
        (p) => p.usuarioId === selectedStudent
      );

      if (student) await generateIndividualPDF(student, progress);
    }
  };

  // ---------------------- UI ----------------------

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <FileText className="mr-2" /> Generar Reportes
          </h2>
          <button onClick={onClose}>
            <XIcon />
          </button>
        </div>

        {/* Tipo de reporte */}
        <div className="space-y-2 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={reportType === "general"}
              onChange={() => setReportType("general")}
            />
            <span className="flex items-center gap-2">
              <Users className="w-4" /> Reporte General
            </span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={reportType === "individual"}
              onChange={() => setReportType("individual")}
            />
            <span className="flex items-center gap-2">
              <UserIcon className="w-4" /> Reporte Individual
            </span>
          </label>
        </div>

        {/* Selección de alumno */}
        {reportType === "individual" && (
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full p-2 border rounded-xl mb-4"
          >
            <option value="all">Todos los estudiantes</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.username}
              </option>
            ))}
          </select>
        )}

        <button
          disabled={loading}
          onClick={handleGenerate}
          className="w-full p-3 bg-blue-600 text-white rounded-xl"
        >
          {loading ? "Generando..." : "Generar Reporte"}
        </button>
      </div>
    </div>
  );
};

export default BulkReportModal;
