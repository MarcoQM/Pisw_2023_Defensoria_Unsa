import { getAllSolicitudes, getDataGraficoLineas, getDataGraficoCircular, getAllTipo,  getAllSedes, getDataGraficoBarras, getDataResumenReporte} from "../api/registros.api";
import { FaFile } from "react-icons/fa";
import { RegistroCard } from "../components/RegistroCard";
import { RegistrosList } from "../components/RegistrosList";
import { useEffect,useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Pie, Cell, PieChart, Tooltip } from 'recharts';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { LineChart, Line, Legend, ReferenceLine } from 'recharts';
import { LuFileStack, LuFileClock, LuFileCheck2 } from "react-icons/lu";
import { RiContactsBookLine, RiFileCloseLine } from "react-icons/ri";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { RadialBarChart, RadialBar } from 'recharts';

function BoxWrapper({children}){
    return <div className="bg-white rounded-sm p-4 flex-1 border border-granate flex items-center">{children}</div>
}

export function AdminReportesG() {   
    return (
        <div className="flex flex-col gap-4 p-4"> 
                <DashboardGrid/>
                <div className='flex flex-row gap-4 w-full'>
                  <DashboardLine/>   
                </div>                    
                <div className='flex flex-row gap-4 w-full'>                
                  <DashboardCircle/>
                  <DashboardBar/>               
                </div>  
        </div>
    );
}

function DashboardGrid(){
  const [data, setDataResumen] = useState([]);
  async function loadDataResumen(){
    const res = await getDataResumenReporte();
    setDataResumen(res.data.gResumenReporte)
    }

  useEffect(() => {
    loadDataResumen();
  },[]);

    return <div className="flex gap-4">
    {Object.entries(data).map(([estado, cantidad]) => (
        <BoxWrapper key={estado}>
          <div>
            <LuFileCheck2 fontSize={30} />
          </div>
          <div className="pl-4">
            <span className="text-sn text-gray-500 font-light">
              {estado}
            </span>
            <div>
              <strong>
                {cantidad}
              </strong>
            </div>
          </div>
        </BoxWrapper>
      ))}
                  
</div> 
}
  
// const data = {
//   1: [
//     { tipoSolicitud: 'Queja', cantidad: 1 },
//     { tipoSolicitud: 'Reclamaciones', cantidad: 1 },
//     { tipoSolicitud: 'Sugerencias', cantidad: 0 },
//     { tipoSolicitud: 'Consulta', cantidad: 0 },
//   ],
//   2: [
//     { tipoSolicitud: 'Queja', cantidad: 3 },
//     { tipoSolicitud: 'Reclamaciones', cantidad: 5 },
//     { tipoSolicitud: 'Sugerencias', cantidad: 0 },
//     { tipoSolicitud: 'Consulta', cantidad: 0 },
//   ],
// };
       
  function DashboardBar(){
    // Obtener los datos del reporte
    const [data, setDataBarras] = useState([]);
    async function loadDataReporteBarras(){
      const res = await getDataGraficoBarras();
      const data = {};
      for (let i = 0; i < res.data.gbarras.length; i++) {
        const idSede = Object.keys(res.data.gbarras[i])[0];
        const valores = res.data.gbarras[i][idSede];

        const datosTransformados = Object.entries(valores).map(([tipoSolicitud, cantidad]) => ({
          tipoSolicitud,
          cantidad,
        }));

        data[idSede] = datosTransformados
      }

      setDataBarras(data)
      }

    useEffect(() => {
      loadSedes();
      loadDataReporteBarras();
    },[]);


    // const data = {
    //   1: [
    //     { tipoSolicitud: 'Queja', cantidad: 1 },
    //     { tipoSolicitud: 'Reclamaciones', cantidad: 1 },
    //     { tipoSolicitud: 'Sugerencias', cantidad: 0 },
    //     { tipoSolicitud: 'Consulta', cantidad: 0 },
    //   ],
    //   2: [
    //     { tipoSolicitud: 'Queja', cantidad: 3 },
    //     { tipoSolicitud: 'Reclamaciones', cantidad: 5 },
    //     { tipoSolicitud: 'Sugerencias', cantidad: 0 },
    //     { tipoSolicitud: 'Consulta', cantidad: 0 },
    //   ],
    // };
    const [sedes, setSedes] = useState([]);
    // Obtener lista de sedes
    async function loadSedes(){
      try{
        const res = await getAllSedes();
        setSedes(res.data);
        //console.log(res.data);
      }catch(error){
        console.error('Error al obtener datos de la API', error);
      }
    } 

    //console.log(Object.keys(data)[0]);
    const [areaSeleccionada, setAreaSeleccionada] = useState(1);
    
    const handleChangeArea = (nuevaArea) => {
      setAreaSeleccionada(nuevaArea);
    };
    const areaData = data[areaSeleccionada];

    // const [data3, setData] = useState([]);
    // const [tipo_solicitud, setDataTipoSolicitud] = useState([]);

    // async function loadDataReporteLineas(){
    //   const res = await getDataGraficoLineas();
    //   const data3 = [];
    //   for (let i = 0; i < res.data.glineas.length; i++) {
    //     const mes = Object.keys(res.data.glineas[i])[0];
    //     const valores = res.data.glineas[i][mes];

    //     const data = { month: mes, ...valores };
    //     data3.push(data);
    //   }
    //   setData(data3);
    // }
    return (
      <div className=' h-22 gap-4 bg-white p-4 rounded-sn border border-gray flex flex-col flex-1'>    
        <strong className="text-gray font-medium">Denuncias por Escuela Profesional</strong>
        <div>
          <label>Seleccionar Área: </label>
          <select onChange={(e) => handleChangeArea(e.target.value)} value={areaSeleccionada}>
            {sedes.map((sede) => (
              <option key={sede.id} value={parseInt(sede.id,10)}>
                {sede.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className='w-full mt-3 flex-1 text-xs'>   
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={400} height={300} data={areaData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tipoSolicitud" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#942129"/>
            </BarChart>
          </ResponsiveContainer>
          </div>
      </div>
    );
  };

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
}

function DashboardCircle(){

  //const [entries, setEntries] = useState([]);
  const [entries, setData] = useState([]);

  
  async function loadDataReporteCircular(){
    const res = await getDataGraficoCircular();
    // Extraer las claves y valores del objeto "gCircular"
    const entries = Object.entries(res.data.gCircular);
    setData(entries);
    }
    useEffect(() => {
      loadDataReporteCircular();
    },[]);

    // Transformar las claves y valores en el formato deseado
    const data2 = entries.map(([name, value]) => ({ name, value }));
    //const data2 = [];

    return  <div className='w-1/4 h-[24rem] bg-white p-4 rounded-sn border border-gray flex flex-col'>
                <strong className="text-gray font-medium">Estado de Solicitudes</strong>
                <div className='w-full flex-1 text-xs'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={300}>
                            <Pie
                                data={data2}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={105}
                                fill="88884d8"
                                dataKey="value"
                                >
                                    {data2.map((e, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
}

// const data3 = [
//   { month: 'ENERO', queja: 14, reclamo: 29, sugerencias: 23, consultas: 12 },
//   { month: 'FEBRERO', queja: 25, reclamo: 18, sugerencias: 33, consultas: 17 },
//   { month: 'MARZO', queja: 37, reclamo: 22, sugerencias: 17, consultas: 28 },
//   { month: 'ABRIL', queja: 31, reclamo: 36, sugerencias: 22, consultas: 14 },
//   { month: 'MAYO', queja: 18, reclamo: 20, sugerencias: 15, consultas: 39 },
//   { month: 'JUNIO', queja: 34, reclamo: 28, sugerencias: 16, consultas: 13 },
//   { month: 'JULIO', queja: 40, reclamo: 37, sugerencias: 24, consultas: 17 },
//   { month: 'AGOSTO', queja: 22, reclamo: 33, sugerencias: 37, consultas: 23 },
//   { month: 'SEPTIEMBRE', queja: 38, reclamo: 34, sugerencias: 23, consultas: 30 },
//   { month: 'OCTUBRE', queja: 27, reclamo: 30, sugerencias: 20, consultas: 13 },
//   { month: 'NOVIEMBRE', queja: 18, reclamo: 12, sugerencias: 34, consultas: 21 },
//   { month: 'DICIEMBRE', queja: 24, reclamo: 18, sugerencias: 11, consultas: 16 },
// ];
// Función para generar colores aleatorios en formato hexadecimal
const generarColorAleatorio = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function DashboardLine(){

    const [data3, setData] = useState([]);
    const [tipo_solicitud, setDataTipoSolicitud] = useState([]);

    async function loadDataReporteLineas(){
      const res = await getDataGraficoLineas();
      const data3 = [];
      for (let i = 0; i < res.data.glineas.length; i++) {
        const mes = Object.keys(res.data.glineas[i])[0];
        const valores = res.data.glineas[i][mes];

        const data = { month: mes, ...valores };
        data3.push(data);
      }
      setData(data3);
    }

    async function loadDataTipoSolicitud(){
      const res = await getAllTipo();
      // Utiliza el método map para obtener solo los nombres
      const nombres = res.data.map(item => item.nombre);
      setDataTipoSolicitud(nombres);
    }

    useEffect(() => {
      loadDataReporteLineas();
      loadDataTipoSolicitud();
    },[]);
   
    return  <div className='h-[22rem] bg-white p-4 rounded-sn border border-gray flex flex-1 flex-col'>
                <strong className="text-gray font-medium">Solicitudes</strong>
                <div className='w-full mt-3 flex-1 text-xs'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={500} height={500} data={data3}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {tipo_solicitud.map((item) => (
                      <Line
                        key={item}
                        type="monotone"
                        dataKey={item}
                        stroke={generarColorAleatorio()}
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </div>
}

// const data4 = [
//   {
//     name: '16-17',
//     uv: 31.47,
//     pv: 43,
//     fill: '#8884d8',
//   },
//   {
//     name: '18-19',
//     uv: 26.69,
//     pv: 137,
//     fill: '#83a6ed',
//   },
//   {
//     name: '20-21',
//     uv: 15.69,
//     pv: 78,
//     fill: '#8dd1e1',
//   },
//   {
//     name: '22-23',
//     uv: 8.22,
//     pv: 125,
//     fill: '#82ca9d',
//   },
  
//   {
//     name: '24+',
//     uv: 2.63,
//     pv: 65,
//     fill: '#d0ed57',
//   },  
// ];

// function DashboardRadar(){
//   const style = {
//     top: '50%',
//     right: 0,
//     transform: 'translate(0, -50%)',
//     lineHeight: '24px',
//   };
//     return  <div className='w-1/4 h-[24rem] bg-white p-4 rounded-sn border border-gray flex flex-col'>
//                 <strong className="text-gray font-medium">Solicitudes</strong>
//                 <div className='w-full flex-1 text-xs'>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <RadialBarChart cx="40%" cy="50%" innerRadius="10%" outerRadius="100%" barSize={10} data={data4}>
//                     <RadialBar
//                       minAngle={15}
//                       label={{ position: 'insideStart', fill: '#fff' }}
//                       background
//                       clockWise
//                       dataKey="pv"
//                     />
//                     <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
//                   </RadialBarChart>
//                 </ResponsiveContainer>
//                 </div>
//             </div>
// }

