import React from 'react';
import * as XLSX from 'xlsx';

export function ExcelGenerator() {
  const exportToExcel = () => {
    const data = [      
      ['N°', 'NÚMERO DE EXPEDIENTE INTERNO', 'ENCARGADO DEL EXPEDIENTE','FECHA DE RECEPCIÓN','NOMBRES Y APELLIDOS DEL SOLICITANTE','CORREO ELECTRÓNICO','NÚMERO DE CELULAR','TIPO DE SOLICITUD','RESUMEN DEL CONTENIDO DE LA SOLICITUD', 'ÓRGANO UNIVERSITARIO RELACIONADO CON LOS HECHOS MENCIONADOS', 'CONDICIÓN DEL SOLICITANTE EN LA UNIVERSIDAD', 'ESTADO DEL TRÁMITE', 'FECHA DE FINALIZACIÓN DEL TRÁMITE', 'ÚLTIMA ACTUACIÓN', 'REMITIDO', 'RECOMENDACIÓN'],      
    ];
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const columnWidths = [5, 10, 10, 10, 20, 20, 15, 15, 40, 25, 15, 15, 15, 40, 15, 15];    

    worksheet['!cols'] = columnWidths.map(width => ({ width }));

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

    XLSX.writeFile(workbook, 'usuarios_con_texto_multilinea.xlsx');
  };

  return (
    <div>      
      <button onClick={exportToExcel}>Exportar a Excel</button>
    </div>
  );
} 