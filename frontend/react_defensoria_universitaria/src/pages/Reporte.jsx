import React from 'react';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


export function Reporte({ tableData }) {

  const data = [
    {
      'N°': 1,
      'NÚMERO DE EXPEDIENTE INTERNO': 'ABC123',
      'ENCARGADO DEL EXPEDIENTE': 'Juan Pérez',
      'FECHA DE RECEPCIÓN': '2023-01-15',
      'NOMBRES Y APELLIDOS DEL SOLICITANTE': 'María García',
      'CORREO ELECTRÓNICO': 'maria@example.com',
      'NÚMERO DE CELULAR': '1234567890',
      'TIPO DE SOLICITUD': 'Solicitud de información',
      'RESUMEN DEL CONTENIDO DE LA SOLICITUD': 'Consulta sobre programa académico',
      'ÓRGANO UNIVERSITARIO RELACIONADO CON LOS HECHOS MENCIONADOS': 'Facultad de Ciencias',
      'CONDICIÓN DEL SOLICITANTE EN LA UNIVERSIDAD': 'Estudiante',
      'ESTADO DEL TRÁMITE': 'En proceso',
      'FECHA DE FINALIZACIÓN DEL TRÁMITE': '2023-02-10',
      'ÚLTIMA ACTUACIÓN': 'Revisión de documentos',
      'REMITIDO': 'No',
      'RECOMENDACIÓN': 'Seguir con el proceso'
    },
    {
      'N°': 2,
      'NÚMERO DE EXPEDIENTE INTERNO': 'XYZ789',
      'ENCARGADO DEL EXPEDIENTE': 'Luisa Martínez',
      'FECHA DE RECEPCIÓN': '2023-02-20',
      'NOMBRES Y APELLIDOS DEL SOLICITANTE': 'Carlos Rodríguez',
      'CORREO ELECTRÓNICO': 'carlos@example.com',
      'NÚMERO DE CELULAR': '9876543210',
      'TIPO DE SOLICITUD': 'Solicitud de documentación',
      'RESUMEN DEL CONTENIDO DE LA SOLICITUD': 'Obtención de certificados',
      'ÓRGANO UNIVERSITARIO RELACIONADO CON LOS HECHOS MENCIONADOS': 'Departamento de Administración',
      'CONDICIÓN DEL SOLICITANTE EN LA UNIVERSIDAD': 'Graduado',
      'ESTADO DEL TRÁMITE': 'Completado',
      'FECHA DE FINALIZACIÓN DEL TRÁMITE': '2023-03-05',
      'ÚLTIMA ACTUACIÓN': 'Entrega de documentos',
      'REMITIDO': 'Sí',
      'RECOMENDACIÓN': 'Trámite concluido'
    },
    // Puedes agregar más objetos de datos aquí
  ];

  const headers = [
    'N°',
    'NÚMERO DE EXPEDIENTE INTERNO',
    'ENCARGADO DEL EXPEDIENTE',
    'FECHA DE RECEPCIÓN',
    'NOMBRES Y APELLIDOS DEL SOLICITANTE',
    'CORREO ELECTRÓNICO',
    'NÚMERO DE CELULAR',
    'TIPO DE SOLICITUD',
    'RESUMEN DEL CONTENIDO DE LA SOLICITUD',
    'ÓRGANO UNIVERSITARIO RELACIONADO CON LOS HECHOS MENCIONADOS',
    'CONDICIÓN DEL SOLICITANTE EN LA UNIVERSIDAD',
    'ESTADO DEL TRÁMITE',
    'FECHA DE FINALIZACIÓN DEL TRÁMITE',
    'ÚLTIMA ACTUACIÓN',
    'REMITIDO',
    'RECOMENDACIÓN',
  ];

  const cellWidths = [ 5, 10, 10, 10, 20, 20, 15, 15, 40, 25, 15, 15, 15, 40, 15, 15];    

  /*const exportToExcel = () => {
    const wsData = [headers, ...data.map(Object.values)];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'tableData.xlsx');
  };*/

  
  const exportToExcelJS = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D3D3D3' },
      };
      const column = worksheet.getColumn(colNumber);
      column.width = Math.max(15, headers[colNumber - 1].length * 1.5); // Ajusta el ancho mínimo a 15 y multiplica la longitud del texto por 1.5 para obtener el ancho adecuado
    });

    // Agregar los datos a las celdas
    data.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });

    // Generar el archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tableData.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const exportToPDF = async () => {
    console.log("hola")

    const table = document.getElementById('tableData');
    const tableWidth = table.offsetWidth; // Ancho de la tabla en píxeles

    console.log('Ancho de la tabla:', tableWidth, 'px');
  
    const doc = new jsPDF({
      orientation: 'landscape', // Cambia la orientación de la página a apaisada (landscape)
      format: [600, 800],
    });

    doc.autoTable({
      html: table,
      theme: 'grid',
      styles: {
        fontSize: 13,
      },
      headerStyles: {
        fontSize: 15, // Tamaño de la fuente para los encabezados
        // Otros estilos de los encabezados si es necesario
      },
      margin: { top: 20 },
    });

  doc.save('tableData.pdf');
    
  };

  return (
    <div className= "w-11/12 mx-auto bg-white">     
      <button onClick={exportToExcelJS}
        className="bg-blue hover:bg-white text-black font-bold py-2 px-4 rounded"
      >
        Descargar Excel
      </button>

      <button
        onClick={exportToPDF}
        className="bg-blue hover:bg-white text-black font-bold py-2 px-4 rounded"
      >
        Descargar PDF
      </button>

      <h2 className="text-xl font-bold ">Tabla de Reporte</h2>
      <table id="tableData" className="w-full  border border-gray-300">
        <thead>
          <tr className="bg-gray-500 ">
            {headers.map((header, index) => (
              <th key={index} className="  border border-gray-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-center">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={item.id} className="text-center">
              {Object.values(item).map((value, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`} className="border border-gray-300 px-4 py-2">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}