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

const primaryColor = "#2259D7";
const gray = "#444";

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

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

  const classStats = (() => {
    if (!studentProgress.length) return null;

    const avg = (field: keyof ProgresoUsuario) =>
      Math.round(
        studentProgress.reduce((a, b) => a + (b[field] as number), 0) /
          studentProgress.length
      );

    return {
      averageProgress: avg("progresoGeneral"),
      averageScore: avg("totalPuntaje"),
    };
  })();

  // ---------------- PDF INDIVIDUAL ----------------

  const generateIndividualPDF = async (
    student: User,
    progress?: ProgresoUsuario
  ) => {
    setLoading(true);

    try {
      const doc = new jsPDF("portrait", "pt", "letter");
      const width = doc.internal.pageSize.getWidth();

      // Logo
      try {
        const logo = await loadImage("/logo.png");
        doc.addImage(logo, "PNG", 40, 30, 80, 80);
      } catch {}

      // Encabezado
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(primaryColor);
      doc.text("REPORTE INDIVIDUAL DE PROGRESO", width / 2, 60, {
        align: "center",
      });

      doc.setDrawColor(primaryColor);
      doc.setLineWidth(2);
      doc.line(40, 90, width - 40, 90);

      let y = 130;

      // Datos del alumno
      doc.setFontSize(12);
      doc.setTextColor(gray);
      doc.setFont("helvetica", "bold");
      doc.text("Datos del Estudiante", 40, y);
      const boxY = y + 10;
      doc.setDrawColor("#DDD");
      doc.rect(40, boxY, width - 80, 80);

      doc.setFont("helvetica", "normal");
      doc.text(`Nombre: ${student.username}`, 60, boxY + 25);
      doc.text(`Grado: ${student.grado}`, 60, boxY + 45);
      doc.text(`Docente: ${teacher?.username}`, 60, boxY + 65);

      y = boxY + 110;

      if (progress) {
        // Resumen
        doc.setFont("helvetica", "bold");
        doc.text("Resumen Académico", 40, y);
        doc.rect(40, y + 10, width - 80, 70);

        doc.setFont("helvetica", "normal");
        doc.text(
          `Progreso General: ${progress.progresoGeneral}%`,
          60,
          y + 35
        );
        doc.text(
          `Tareas Completadas: ${progress.totalTareasCompletadas}`,
          60,
          y + 55
        );
        doc.text(`Puntaje Total: ${progress.totalPuntaje}`, 350, y + 35);

        y += 120;

        // Bloques
        doc.setFont("helvetica", "bold");
        doc.text("Detalle por Bloques", 40, y);
        doc.rect(40, y + 10, width - 80, 260);

        doc.setFont("helvetica", "normal");
        let blockY = y + 35;

        progress.bloques.forEach((b) => {
          doc.text(
            `${b.nombre}  -  ${b.porcentaje}%   (${b.completado}/${b.total})`,
            60,
            blockY
          );
          blockY += 20;
        });
      }

      doc.save(`reporte_${student.username}.pdf`);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- PDF GENERAL ----------------

  const generateClassPDF = async () => {
    setLoading(true);

    try {
      const doc = new jsPDF("landscape", "pt", "letter");
      const width = doc.internal.pageSize.getWidth();

      try {
        const logo = await loadImage("/logo.png");
        doc.addImage(logo, "PNG", 40, 30, 100, 100);
      } catch {}

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(primaryColor);
      doc.text("REPORTE GENERAL DE LA CLASE", width / 2, 60, {
        align: "center",
      });

      doc.setDrawColor(primaryColor);
      doc.setLineWidth(2);
      doc.line(40, 100, width - 40, 100);

      let y = 140;
      doc.setFontSize(13);
      doc.setTextColor(gray);
      doc.text(`Docente: ${teacher?.username}`, 40, y);
      doc.text(`Total Estudiantes: ${students.length}`, 40, y + 25);
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 40, y + 50);

      if (classStats) {
        doc.setFont("helvetica", "bold");
        doc.text("Estadísticas Generales", 400, y);

        doc.setFont("helvetica", "normal");
        doc.text(
          `Progreso Promedio: ${classStats.averageProgress}%`,
          400,
          y + 25
        );
        doc.text(
          `Puntaje Promedio: ${classStats.averageScore}`,
          400,
          y + 50
        );
      }

      doc.save("reporte_general.pdf");
    } finally {
      setLoading(false);
    }
  };

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

  // ---------------- UI ----------------

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

        <div className="space-y-2 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={reportType === "general"}
              onChange={() => setReportType("general")}
            />
            <Users className="w-4" /> Reporte General
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={reportType === "individual"}
              onChange={() => setReportType("individual")}
            />
            <UserIcon className="w-4" /> Reporte Individual
          </label>
        </div>

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
          className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold"
        >
          {loading ? "Generando..." : "Generar Reporte"}
        </button>
      </div>
    </div>
  );
};

export default BulkReportModal;
