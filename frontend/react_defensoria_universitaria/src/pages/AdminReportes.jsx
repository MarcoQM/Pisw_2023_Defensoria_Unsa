import {useState, useEffect} from "react";
import {getAllSolicitudes} from "../api/registros.api";
import {rankItem} from '@tanstack/match-sorter-utils';
import FiltroFechas from '../components/FiltroFechas';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Link } from 'react-router-dom';
import { parseISO } from 'date-fns';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel
} from '@tanstack/react-table'

const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
  
    addMeta({itemRank})
    return itemRank.passed
}



export function AdminReportes() {


    const handleDownloadPdf = async () => {
      // Crear un nuevo documento PDF
      const pdfDoc = await PDFDocument.create();
      const width = 800; // Ancho de la página
      const height = 600; // Alto de la página
      const page = pdfDoc.addPage([width, height]);

      // Configurar fuente y tamaño de texto
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const textSize = 96;

      // Generar contenido del PDF
      const contenido = generarContenidoPDF();

      // Dividir el contenido en líneas de texto
      const lineas = contenido.split('\n');

      // Agregar contenido al PDF
      let y = page.getHeight() - 50; // Ajustar según la altura de la página
      const x = 50; // Margen izquierdo

      // Agregar texto al PDF
      lineas.forEach((linea) => {
          page.drawText(linea, { x, y, size: textSize, font });
          y -= textSize + 5; // Espacio entre líneas
      });

      // Guardar el PDF
      const pdfBytes = await pdfDoc.save();

      // Crear un Blob y descargar el archivo
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'solicitudes.pdf');
     };

    // Función para generar el contenido del PDF
    const generarContenidoPDF = () => {
      let contenido = '';
  
      // Agregar encabezados
      contenido += 'BASE DE DATOS DE LAS SOLICITUDES RECIBIDAS POR LA DEFENSORÍA UNIVERSITARIA - AÑO 2024\n';
  
      // Agregar datos de las solicitudes
      contenido += 'No.   NÚMERO DE EXPEDIENTE INTERNO   ENCARGADO DEL EXPEDIENTE   FECHA DE RECEPCIÓN   NOMBRES Y APELLIDOS DEL SOLICITANTE   CORREO ELECTRÓNICO   NÚMERO DE CELULAR   TIPO DE SOLICITUD   RESUMEN DEL CONTENIDO DE LA SOLICITUD   ÓRGANO UNIVERSITARIO RELACIONADO CON LOS HECHOS MENCIONADOS   CONDICIÓN DEL SOLICITANTE EN LA UNIVERSIDAD   ESTADO DEL TRÁMITE   FECHA DE FINALIZACIÓN DEL TRÁMITE\n';
  
      // Agregar datos de cada solicitud
      data.forEach((item, index) => {
          contenido += `${index + 1}   ${item.codigo_expediente}   ${item.encargado_nombre}   ${item.fecha_creacion}   ${item.nombre}   ${item.correo}   ${item.telefono}   ${item.tipo_solicitud_nombre}   ${item.expone}   ${item.organo_universitario}   ${item.rol}   ${item.estado_solicitud_nombre}   ${item.fecha_modificacion}\n`;
      });
  
      return contenido;
    };




    const handleDownloadExcel = () => {
        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Solicitudes');

        

        worksheet.columns = [
          { header: 'No.', key: 'numero', width: 5 }, 
          { header: 'NÚMERO DE EXPEDIENTE INTERNO', key: 'codigo_expediente', width: 50 },
          { header: 'ENCARGADO DEL EXPEDIENTE', key: 'encargado_nombre', width: 30 },
          { header: 'FECHA DE RECEPCIÓN', key: 'fecha_creacion', width: 50 },
          { header: 'NOMBRES Y APELLIDOS DEL SOLICITANTE', key: 'nombre', width: 40 },
          { header: 'CORREO ELECTRÓNICO', key: 'correo', width: 30 },
          { header: 'NÚMERO DE CELULAR', key: 'telefono', width: 20 },
          { header: 'TIPO DE SOLICITUD', key: 'tipo_solicitud_nombre', width: 30 },
          { header: 'RESUMEN DEL CONTENIDO DE LA SOLICITUD', key: 'expone', width: 40 },
          { header: 'ÓRGANO UNIVERSITARIO RELACIONADO CON LOS HECHOS MENCIONADOS', key: 'organo_universitario', width: 70 },
          { header: 'CONDICIÓN DEL SOLICITANTE EN LA UNIVERSIDAD', key: 'rol', width: 70 },
          { header: 'ESTADO DEL TRÁMITE', key: 'estado_solicitud_nombre', width: 30 },
          { header: 'FECHA DE FINALIZACIÓN DEL TRÁMITE', key: 'fecha_modificacion', width: 50 },
        ];
        
        worksheet.mergeCells('A2:A3');
        worksheet.mergeCells('B2:B3');
        worksheet.mergeCells('C2:C3');
        worksheet.mergeCells('D2:D3');
        worksheet.mergeCells('E2:E3');
        worksheet.mergeCells('F2:F3');
        worksheet.mergeCells('G2:G3');
        worksheet.mergeCells('H2:H3');
        worksheet.mergeCells('I2:I3');
        worksheet.mergeCells('J2:J3');
        worksheet.mergeCells('K2:K3');
        worksheet.mergeCells('L2:L3');
        worksheet.mergeCells('M2:M3');
        worksheet.getRow(2).getCell(1).value = 'No.';
        worksheet.getRow(2).getCell(2).value = 'NÚMERO DE EXPEDIENTE INTERNO';
        worksheet.getRow(2).getCell(3).value = 'ENCARGADO DEL EXPEDIENTE';
        worksheet.getRow(2).getCell(4).value = 'FECHA DE RECEPCIÓN';
        worksheet.getRow(2).getCell(5).value = 'NOMBRES Y APELLIDOS DEL SOLICITANTE';
        worksheet.getRow(2).getCell(6).value = 'CORREO ELECTRÓNICO';
        worksheet.getRow(2).getCell(7).value = 'NÚMERO DE CELULAR';
        worksheet.getRow(2).getCell(8).value = 'TIPO DE SOLICITUD';
        worksheet.getRow(2).getCell(9).value = 'RESUMEN DEL CONTENIDO DE LA SOLICITUD';
        worksheet.getRow(2).getCell(10).value = 'ÓRGANO UNIVERSITARIO RELACIONADO CON LOS HECHOS MENCIONADOS';
        worksheet.getRow(2).getCell(11).value = 'CONDICIÓN DEL SOLICITANTE EN LA UNIVERSIDAD';
        worksheet.getRow(2).getCell(12).value = 'ESTADO DEL TRÁMITE';
        worksheet.getRow(2).getCell(13).value = 'FECHA DE FINALIZACIÓN DEL TRÁMITE';
        // Agregar los datos
        data.forEach( (item, index) => {
          worksheet.addRow({ numero: index + 1, ...item });
        }); 

        

        const generalHeader = 'BASE DE DATOS DE LAS SOLICITUDES RECIBIDAS POR LA DEFENSORÍA UNIVERSITARIA - AÑO 2024';

        // Establecer el encabezado general en la primera celda
        worksheet.mergeCells('A1:M1');
        worksheet.getCell('A1').value = generalHeader;
        worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('A1').font = { bold: true };
        worksheet.getCell('A1').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF3DB3C3' } 
        };
        worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('A2').font = { bold: true };
        worksheet.getCell('A2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('B2').font = { bold: true };
        worksheet.getCell('B2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('C2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('C2').font = { bold: true };
        worksheet.getCell('C2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('D2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('D2').font = { bold: true };
        worksheet.getCell('D2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('E2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('E2').font = { bold: true };
        worksheet.getCell('E2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('F2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('F2').font = { bold: true };
        worksheet.getCell('F2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('G2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('G2').font = { bold: true };
        worksheet.getCell('G2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('H2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('H2').font = { bold: true };
        worksheet.getCell('H2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('I2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('I2').font = { bold: true };
        worksheet.getCell('I2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('J2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('J2').font = { bold: true };
        worksheet.getCell('J2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('K2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('K2').font = { bold: true };
        worksheet.getCell('K2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('L2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('L2').font = { bold: true };
        worksheet.getCell('L2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };
        worksheet.getCell('M2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('M2').font = { bold: true };
        worksheet.getCell('M2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB8E9EE' } 
        };

        

        const today = new Date().toLocaleDateString().replace(/\//g, '-');
        const fileName = `solicitudes_${today}.xlsx`;

        // Escribir el archivo Excel
        workbook.xlsx.writeBuffer().then(buffer => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, fileName);
        });
    };
    

    const handleDateFilterChange = ({ startDate, endDate }) => {

    
        const parsedStartDate = startDate ? parseISO(startDate) : null;
        const parsedEndDate = endDate ? parseISO(endDate) : null;
    
        // Filtra los datos según el rango de fechas
        const filteredData = data.filter((item) => {
            const itemDate = parseISO(item.fecha_creacion); // Ajusta la propiedad según la estructura de tus datos
            return (
                (!parsedStartDate || itemDate >= parsedStartDate) &&
                (!parsedEndDate || itemDate <= parsedEndDate)
            );
        });
    
        // Actualiza el estado con los datos filtrados
        setData(filteredData);
    };
  
    async function loadRegistros(){
        const res = await getAllSolicitudes();
        setData(res.data);
        
    }

    const handleClearFilters = () => {
      // Lógica para limpiar los filtros y restaurar la data original
      setGlobalFilter('');
      // Vuelve a cargar la data original
      
      loadRegistros();
      
    };

    const [data, setData]=useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
  
    const columns = [
      {
        accessorKey: 'Nro',
        cell: ({ row }) => (
          <div>{row.index + 1}</div>
        ),
      },
      {
        header : 'Nro de Expediente',
        accessorKey: 'codigo_expediente'
      },
      {
        header : 'Solicitante',
        accessorKey: 'nombre'
      },
      {
        header : 'Tipo de Solicitud',
        accessorKey: 'tipo_solicitud_nombre'
      },
      {
        header : 'Estado',
        accessorKey: 'estado_solicitud_nombre'
      },
      {
        header : 'Encargado',
        accessorKey: 'encargado_nombre'
      },
      {
        header : 'Fecha de Recepción',
        accessorKey: 'fecha_creacion',
        cell: ({ row }) => (
          <div>
            {new Date(row.original.fecha_creacion).toLocaleDateString()}
          </div>
        ),
      },
      
      // {
      //   accessorKey: 'Acciones',
      
      //   cell: ({ row }) => (
      //     <div className="flex">
      //       {/*botón para redirigir a los detalles de la solicitud */}
      //       <Link to={`/detalles-solicitud/${row.original.id}`}>
      //         <button className="bg-granate-900 hover:bg-granate-claro text-white  py-1 px-4 rounded">
      //           Detalles
      //         </button>
      //       </Link>
      //     </div>
      //   ),
      // }

    ] 

    useEffect(() => {
        loadRegistros();

    },[]);

    const table = useReactTable({
        data,
        columns,
        state: {
        globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn : fuzzyFilter

    })


    return (
        <div className="w-full">
      <div className="max-w-full bg-grisclaro rounded-lg shadow-lg md:m-10 md:p-10 "> {/* cuadro gris*/}
          <h2 className="text-granate-900  mt-2 mb-4 text-2xl md:text-4xl font-bold text-center   ">REPORTES DE SOLICITUDES</h2>

        

        <div className="container mx-auto md:mt-10 p-4">
          <h1 className="text-2xl font-bold mb-4">Listado de Solicitudes</h1>                                                     
          <div className="md:px-6 md:py-4 ">
            <div className=" text-center">
                      <button className=" bg-granate-900 hover:bg-granate-claro text-white  py-1 px-4 mx-4 rounded"
                              onClick={handleDownloadExcel}>Descargar documento excel
                      </button>
                      {/* <button className="bg-granate-900 hover:bg-granate-claro text-white py-1 px-4 mx-4 rounded" 
                              onClick={handleDownloadPdf}>Descargar PDF
                      </button>                        */}
            </div> 
            <div className=" flex flex-wrap">                                     
              <div className="flex md:w-5/6  ">
                  <FiltroFechas onFilterChange={handleDateFilterChange} onClearFilters={handleClearFilters}/>
                  
              </div>             
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border divide-y divide-gray-200 ">
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="border-b border-gray-300 text-granate bg-gray-100">
                      {headerGroup.headers.map(header =>(
                        <th key={header.id} className="py-2 px-4 text-left uppercase">
                          {header.isPlaceholder
                          ? null 
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="text-gray-900 hover:bg-gray-400">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="py-2 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                  ))}

                </tbody>

              </table>
              <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className=" text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300  
                      disabled:hover:bg-white disabled:hover:text-gray-300"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}>
                        {'<<'}
                    </button>
                    <button className=" text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
                        disabled:hover:bg-white disabled:hover:text-gray-300"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        {'<'}
                    </button>
                      {table.getPageOptions().map((value,key) => (
                        <button key={key} className=" text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
                        disabled:hover:bg-white disabled:hover:text-gray-300"
                        onClick={() => table.setPageIndex(value)}>
                          {value + 1}

                        </button>
                      ))}
                    <button className=" text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
                        disabled:hover:bg-white disabled:hover:text-gray-300"
                          onClick={() => table.nextPage()}
                          disabled={!table.getCanNextPage()}>
                        {'>'}
                    </button>
                    <button className=" text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
                      disabled:hover:bg-white disabled:hover:text-gray-300"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanPreviousPage()}>
                        {'>>'}
                    </button>

              
                </div>
                
            </div>
                         
          </div>
          
        </div>
                 
      </div>     
    </div>   
  </div>
    );
}
