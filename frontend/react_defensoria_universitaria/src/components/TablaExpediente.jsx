//import { RegistrosList } from "../components/RegistrosList";
import {useState, useEffect} from "react";
import {getAllSolicitudes} from "../api/registros.api";
import {rankItem} from '@tanstack/match-sorter-utils';
import FiltroFechas from '../components/FiltroFechas';
// eslint-disable-next-line react/prop-types
/*
const TablaExpediente = () => {
  return (
    <table className="w-full my-4 border-collapse border border-gray-400">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-2 px-4 border">Nro</th>
          <th className="py-2 px-4 border">Nro de Expediente</th>
          <th className="py-2 px-4 border">Solicitante</th>
          <th className="py-2 px-4 border">Tipo de Solicitud</th>
          <th className="py-2 px-4 border">Estado</th>
          <th className="py-2 px-4 border">Encargado</th>
          <th className="py-2 px-4 border">Fecha de Recepción</th>
          <th className="py-2 px-4 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <RegistrosList/>
      </tbody>
    </table>
  );
};

export default TablaExpediente;*/
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


  // eslint-disable-next-line no-unused-vars
  const handleDateFilterChange = ({ startDate, endDate }) => {
    // Lógica para filtrar los datos por fechas
    // Actualiza el estado con los datos filtrados
  };

  

  const [data, setData]=useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = [
    {
      accessorKey: 'Nro' 
    },
    {
      header : 'Nro de Expediente',
      accessorKey: 'id'
    },
    {
      header : 'Solicitante',
      accessorKey: 'nombre'
    },
    {
      header : 'Tipo de Solicitud',
      accessorKey: 'tipo_solicitud'
    },
    {
      header : 'Estado',
      accessorKey: 'Estado'
    },
    {
      header : 'Encargado',
      accessorKey: 'Encargado'
    },
    {
      header : 'Fecha de Recepcion',
      accessorKey: 'fecha_creacion'
    },
    {
      accessorKey: 'Acciones'
    }

  ]


  useEffect(() => {
      async function loadRegistros(){
          const res = await getAllSolicitudes();
          setData(res.data);
      }
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

    

    <div className="px-6 py-4 ">
      <div className=" flex flex-wrap"> 
        <div className="md:w-4/6 my-2 text-left">
          <span className=" ">Busqueda : </span>
          <input type="text" 
            onChange={e => setGlobalFilter(e.target.value)}
            className="p-2 text-gray-600 border-gray-300  rounded outline-granate"
            placeholder="Buscar..."
          />
        </div>                  
        <div className=" md:w-2/6 ">
            <FiltroFechas onFilterChange={handleDateFilterChange} />
        </div>             
      </div>
      
      <table className="table-auto w-full ">
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
  )};


export default TablaExpediente;
