

//import { RegistrosList } from "../components/RegistrosList";
import {useState, useEffect} from "react";
import {getAllUsuarios} from "../api/registros.api";
import {rankItem} from '@tanstack/match-sorter-utils';
import FiltroFechas from '../components/FiltroFechas';
import { Link } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { FaFile } from "react-icons/fa";

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


const TablaUsuario = () => {

    
    
    async function loadUsuario(){
      const res = await getAllUsuarios();
      setData(res.data);
      console.log(res.data)
      
    }

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
        header : 'Nombre de Usuario',
        accessorKey: 'username'
      },
      {
        header : 'Email',
        accessorKey: 'email'
      },      
      {
        accessorKey: 'Acciones',
      
        cell: ({ row }) => (
          <div className="flex">
            {/*botón para redirigir a los detalles de la solicitud */}
            <Link to={`/detalles-usuario/${row.original.id}`}>
              <button className="bg-granate-900 hover:bg-granate-claro text-white  py-1 px-4 rounded">
                Detalles
              </button>
            </Link>
          </div>
        ),
      }

    ]

  useEffect(() => {
    loadUsuario();
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
          <h2 className="text-granate-900  mt-2 mb-4 text-2xl md:text-4xl font-bold text-center   ">PANEL DE USUARIOS</h2>
          
        <div className="container mx-auto md:mt-10 p-4">
          <h1 className="text-2xl font-bold mb-4">Listado de Usuarios</h1>                                                     
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


export default TablaUsuario;
