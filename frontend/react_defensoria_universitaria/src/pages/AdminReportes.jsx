import {useState, useEffect} from "react";
import {getAllSolicitudes} from "../api/registros.api";
import {rankItem} from '@tanstack/match-sorter-utils';
import FiltroFechas from '../components/FiltroFechas';
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



    const handleDownloadExcel = () => {
        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Solicitudes');
   
        worksheet.columns = [
          { header: 'No.', key: 'numero', width: 5 }, 
          { header: 'NÚMERO DE EXPEDIENTE INTERNO', key: 'codigo_expediente', width: 30 },
          { header: 'ENCARGADO DEL EXPEDIENTE', key: 'encargado_nombre', width: 30 },
          { header: 'FECHA DE RECEPCIÓN', key: 'fecha_creacion', width: 20 },
          { header: 'NOMBRES Y APELLIDOS DEL SOLICITANTE', key: 'nombre', width: 40 },
          { header: 'CORREO ELECTRÓNICO', key: 'correo', width: 30 },
          { header: 'NÚMERO DE CELULAR', key: 'telefono', width: 20 },
          { header: 'TIPO DE SOLICITUD', key: 'tipo_solicitud_nombre', width: 30 },
          { header: 'RESUMEN DEL CONTENIDO DE LA SOLICITUD', key: 'expone', width: 40 },
          { header: 'ÓRGANO UNIVERSITARIO RELACIONADO CON LOS HECHOS MENCIONADOS', key: 'organo_universitario', width: 50 },
          { header: 'CONDICIÓN DEL SOLICITANTE EN LA UNIVERSIDAD', key: 'rol', width: 30 },
          { header: 'ESTADO DEL TRÁMITE', key: 'estado_solicitud_nombre', width: 30 },
          { header: 'FECHA DE FINALIZACIÓN DEL TRÁMITE', key: 'fecha_modificacion', width: 20 },

        ];

        
      
        // Agregar los datos
        data.forEach( (item, index) => {
          worksheet.addRow({ numero: index + 1, ...item });
        });

        
      
        // Escribir el archivo Excel
        workbook.xlsx.writeBuffer().then(buffer => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'solicitudes.xlsx');
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
        console.log(res.data)
        
    }

    const handleClearFilters = () => {
        // Lógica para limpiar los filtros y restaurar la data original
        setGlobalFilter('');
        // Vuelve a cargar la data original
        async function loadRegistros() {
          const res = await getAllSolicitudes();
          setData(res);
        }
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
        header : 'Fecha de Recepcion',
        accessorKey: 'fecha_creacion',
        cell: ({ row }) => (
          <div>
            {new Date(row.original.fecha_creacion).toLocaleDateString()}
          </div>
        ),
      },
      
      {
        accessorKey: 'Acciones',
      
        cell: ({ row }) => (
          <div className="flex">
            {/*botón para redirigir a los detalles de la solicitud */}
            <Link to={`/detalles-solicitud/${row.original.id}`}>
              <button className="bg-granate-900 hover:bg-granate-claro text-white  py-1 px-4 rounded">
                Detalles
              </button>
            </Link>
          </div>
        ),
      }

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
          <h2 className="text-granate-900  mt-2 mb-4 text-2xl md:text-4xl font-bold text-center   ">SOLICITUDES RECIBIDAS</h2>


        
  
          
        <div className="container mx-auto md:mt-10 p-4">
          <h1 className="text-2xl font-bold mb-4">Listado de Solicitudes</h1>                                                     
          <div className="md:px-6 md:py-4 ">
            <div className=" flex flex-wrap"> 
              <div className=" w-full md:w-3/6 my-2 text-left">
                <span className=" ">Busqueda : </span>
                <input type="text" 
                  onChange={e => setGlobalFilter(e.target.value)}
                  className="p-2 text-gray-600 border-gray-300  rounded outline-granate"
                  placeholder="Buscar..."
                />
              </div>                  
              <div className="w-3/6 md:w-3/6  ">
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
        <div>
                    <button className=" bg-granate-900 hover:bg-granate-claro text-white  py-1 px-4 rounded  items-center"
                        onClick={handleDownloadExcel}>Descargar Excel</button>
                </div>  
        
      </div>
      
    </div>
    
  </div>
    );
}
