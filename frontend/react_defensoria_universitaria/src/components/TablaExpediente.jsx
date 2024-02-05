

//import { RegistrosList } from "../components/RegistrosList";
import {useState, useEffect} from "react";
import {getAllSolicitudes, getDataResumenTarjetas} from "../api/registros.api";
import {rankItem} from '@tanstack/match-sorter-utils';
import FiltroFechas from '../components/FiltroFechas';
import { Link } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { FaFile } from "react-icons/fa";
import BotonFiltroTipoSolicitud from "../components/BotonFiltroTipoSolicitud";

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


const TablaExpediente = () => {

    let totalPendientes = 0;
    let totalEnProceso = 0;    

    // eslint-disable-next-line no-unused-vars
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

  const [dataTarjetas, setDataTarjetas] = useState([]);
  async function loadDataReporteTarjetas(){
    const res = await getDataResumenTarjetas();
    const dataTarjetas = Object.entries(res.data.resumen);
    setDataTarjetas(dataTarjetas);
    }

  useEffect(() => {
      loadRegistros();
      loadDataReporteTarjetas();
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


  const renderizarEstados = () => {
    const elementos = [];
    for (let i = 0; i < dataTarjetas.length; i++) {
        const tipoSolicitud = dataTarjetas[i][0];
        const cantidadEstados = dataTarjetas[i][1];

        const pendiente = cantidadEstados['Solicitado']
        const proceso = cantidadEstados['Proceso']

        totalPendientes += pendiente
        totalEnProceso += proceso

        elementos.push(
        <BotonFiltroTipoSolicitud
          key={tipoSolicitud}
          icon={FaFile}
          label={tipoSolicitud}
          type={tipoSolicitud}
          pending={pendiente}
          inProcess={proceso}
          onClick={setGlobalFilter}
        />);

    }
    return elementos;
  };

  return (

    <div className="w-full">
      <div className="max-w-full bg-grisclaro rounded-lg shadow-lg md:m-10 md:p-10 "> {/* cuadro gris*/}
          <h2 className="text-granate-900  mt-2 mb-4 text-2xl md:text-4xl font-bold text-center   ">SOLICITUDES RECIBIDAS</h2>
          
          <div className="space-x-4 mb-4 mt-10 hidden md:flex md:w-full md:h-40 lg:w-full lg:h-40">
              {renderizarEstados()}

              {/* Cuadro de Quejas */}
              {/* <BotonFiltroTipoSolicitud
                icon={FaFile}
                label="Quejas"
                type="Queja"
                pending={quejasPendientes}
                inProcess={quejasEnProceso}
                onClick={setGlobalFilter}
              /> */}

              {/* Cuadro de Reclamos */}
              {/* <BotonFiltroTipoSolicitud
                icon={FaFile}
                label="Reclamos"
                type="Reclamaciones"
                pending={reclamosPendientes}
                inProcess={reclamosEnProceso}
                onClick={setGlobalFilter}
              /> */}

              {/* Cuadro de Sugerencias */}
              {/* <BotonFiltroTipoSolicitud
                icon={FaFile}
                label="Sugerencias"
                type="Sugerencia"
                pending={sugerenciasPendientes}
                inProcess={sugerenciasEnProceso}
                onClick={setGlobalFilter}
              /> */}

              {/* Cuadro de Consultas */}
              {/* <BotonFiltroTipoSolicitud
                icon={FaFile}
                label="Consultas"
                type="Consulta"
                pending={consultasPendientes}
                inProcess={consultasEnProceso}
                onClick={setGlobalFilter}
              /> */}

              {/* Cuadro de Total */}
              

              
          </div>

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
      </div>
    </div>
  </div>
  )};


export default TablaExpediente;
