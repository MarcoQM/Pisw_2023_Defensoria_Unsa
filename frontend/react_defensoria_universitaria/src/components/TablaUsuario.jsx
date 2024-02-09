import React, { useState, useEffect } from 'react';
import { getAllUsuarios } from '../api/registros.api';
import { rankItem } from '@tanstack/match-sorter-utils';
import FiltroFechas from '../components/FiltroFechas';
import { Link } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { FaFile } from 'react-icons/fa';
import { aniadirUsuario, eliminarUsuario } from '../api/registros.api';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const TablaUsuario = () => {
  async function loadUsuario() {
    const res = await getAllUsuarios();
    setData(res.data);
  }

  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [mostrarVentana, setMostrarVentana] = useState(false);
  const [eliminarVentana, setEliminarVentana] = useState(false);
  const [useridtemp, setUserId] = useState(-1);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [confirmationMessageError, setConfirmationMessageError] = useState(null);
  const [guardarUsuarioLoading, setGuardarUsuarioLoading] = useState(false); // Nuevo estado

  const columns = [
    {
      accessorKey: 'Nro',
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      header: 'Nombre de Usuario',
      accessorKey: 'username',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      accessorKey: 'Acciones',
      cell: ({ row }) => (
        <div className='flex justify-center md:justify-start'>
          
          <button
            onClick={() => handleEliminar(row.original.id)}
            className='bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded mr-2'
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    loadUsuario();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const message = await eliminarUsuario(userId);
      setConfirmationMessageError('');
      setConfirmationMessage(message);
      await loadUsuario();
    } catch (error) {
      console.log(error);
      const data = error;
      const regex = /<([^:]+): (.*?)>/g;
      const matches = [...data.matchAll(regex)];
      const resultados = {};
      matches.forEach((match) => {
        const key = match[1];
        const value = match[2].trim();
        if (!resultados[value]) {
          resultados[value] = key;
        }
      });
      let errocadena = 'No es posible eliminar este usuario, debido a que registra expedientes asociados:<br><br>';
      for (const [clave, valor] of Object.entries(resultados)) {
        errocadena = errocadena + `  • ${clave}<br>\n`;
      }
      if (Object.keys(resultados).length > 0) {
        setConfirmationMessageError(errocadena);
      } else {
        setConfirmationMessageError(error);
      }
      setConfirmationMessage('');
    }
  };

  const handleAddUser = () => {
    setMostrarVentana(true);
    setConfirmationMessageError('');
    setConfirmationMessage('');
    setNombreUsuario('');
    setCorreoElectronico('');
  };

  const handleEliminar = (userId) => {
    setEliminarVentana(true);
    setUserId(userId);
    setConfirmationMessage('');
    setConfirmationMessageError('');
  };

  const handleGuardarUsuario = async () => {
    if (!nombreUsuario.trim() || !correoElectronico.trim()) {
      setConfirmationMessageError('Por favor, completa todos los campos.');
      return;
    }

    try {
      setGuardarUsuarioLoading(true); // Marcamos que se está realizando una operación
      const message = await aniadirUsuario(nombreUsuario, correoElectronico);
      setConfirmationMessageError('');
      setConfirmationMessage(message);
      setMostrarVentana(true);
      await loadUsuario();
    } catch (error) {
      setConfirmationMessageError(error);
      setConfirmationMessage('');
    } finally {
      setGuardarUsuarioLoading(false); // Sea exitosa o no, marcamos que la operación ha finalizado
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
  });

  return (
    <div className='w-full'>
      <div className='max-w-full bg-grisclaro rounded-lg shadow-lg md:m-10 md:p-10 '>
        <h2 className='text-granate-900 mt-2 mb-4 text-2xl md:text-4xl font-bold text-center'>
          PANEL DE USUARIOS
        </h2>
        <div className='container mx-auto md:mt-10 p-4'>
          <h1 className='text-2xl font-bold mb-4'>Listado de Usuarios</h1>
          <div className='md:px-6 md:py-4'>
            <div className='flex flex-wrap items-center justify-center md:justify-between'>
              <div className='w-full md:w-1/3 my-2 text-left'>
                <span className='block mb-1'>Búsqueda:</span>
                <input
                  type='text'
                  onChange={e => setGlobalFilter(e.target.value)}
                  className='p-2 text-gray-600 border-gray-300 rounded outline-granate w-full'
                  placeholder='Buscar...'
                />
              </div>
              <div className='w-full md:w-1/3 my-2 text-right'>
                <button
                  onClick={handleAddUser}
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  Añadir Usuario
                </button>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='min-w-full bg-white border divide-y divide-gray-200'>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr
                      key={headerGroup.id}
                      className='border-b border-gray-300 text-granate bg-gray-100'
                    >
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className='py-2 px-4 text-left uppercase'
                        >
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
                    <tr
                      key={row.id}
                      className='text-gray-900 hover:bg-gray-400'
                    >
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className='py-2 px-4'>
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
              <div className='mt-4 flex items-center justify-center md:justify-end'>
                <div className='flex items-center gap-2'>
                  <button
                    className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300'
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {'<<'}
                  </button>
                  <button
                    className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {'<'}
                  </button>
                  {table.getPageOptions().map((value, key) => (
                    <button
                      key={key}
                      className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300'
                      onClick={() => table.setPageIndex(value)}
                    >
                      {value + 1}
                    </button>
                  ))}
                  <button
                    className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {'>'}
                  </button>
                  <button
                    className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300'
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {'>>'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mostrarVentana && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>

            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>

            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <h3 className='text-lg leading-6 font-medium text-gray-900'>
                      Añadir Usuario
                    </h3>
                    {confirmationMessage && (
                      <div
                        className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4'
                        role='alert'
                      >
                        <span className='block sm:inline'>
                          {confirmationMessage}
                        </span>
                      </div>
                    )}
                    {confirmationMessageError && (
                      <div
                        className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'
                        role='alert'
                      >
                        <span className='block sm:inline'>
                          {confirmationMessageError}
                        </span>
                      </div>
                    )}
                    <div className='mt-2'>
                      <div className='mb-4'>
                        <label
                          htmlFor='nombreUsuario'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Nombre de Usuario
                        </label>
                        <input
                          type='text'
                          name='nombreUsuario'
                          id='nombreUsuario'
                          autoComplete='username'
                          value={nombreUsuario}
                          onChange={e => setNombreUsuario(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='correoElectronico'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Correo Electrónico
                        </label>
                        <input
                          type='email'
                          name='correoElectronico'
                          id='correoElectronico'
                          autoComplete='email'
                          value={correoElectronico}
                          onChange={e => setCorreoElectronico(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  onClick={handleGuardarUsuario}
                  type='button'
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${guardarUsuarioLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // Deshabilitar si se está realizando una operación
                  disabled={guardarUsuarioLoading} // Deshabilitar si se está realizando una operación
                >
                  Guardar
                </button>
                <button
                  onClick={() => setMostrarVentana(false)}
                  type='button'
                  className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${guardarUsuarioLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // Deshabilitar si se está realizando una operación
                  disabled={guardarUsuarioLoading} // Deshabilitar si se está realizando una operación
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {eliminarVentana && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>

            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>

            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900'>
                      Eliminar Usuario
                    </h3>
                    <p className='text-sm text-gray-500'>
                      ¿Estás seguro que quieres eliminar este usuario?
                    </p>
                  </div>
                </div>
              </div>
              {confirmationMessage && (
                <div
                  className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4'
                  role='alert'
                >
                  <span className='block sm:inline'>{confirmationMessage}</span>
                </div>
              )}
              {confirmationMessageError && (
                <div
                  className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'
                  role='alert'
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: confirmationMessageError,
                    }}
                  />
                </div>
              )}
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  onClick={() => handleDeleteUser(useridtemp)}
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  Sí
                </button>
                <button
                  onClick={() => setEliminarVentana(false)}
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  No
                </button>
                <button
                  onClick={() => setEliminarVentana(false)}
                  type='button'
                  className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${guardarUsuarioLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // Deshabilitar si se está realizando una operación
                  disabled={guardarUsuarioLoading} // Deshabilitar si se está realizando una operación
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaUsuario;
