import { Pie, Cell, PieChart, Tooltip } from 'recharts';
import React from 'react';
import { Legend } from 'recharts';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { LuFileStack } from "react-icons/lu";
import { LuFileCheck2 } from "react-icons/lu";
import { RiFileCloseLine } from "react-icons/ri";
import { LuFileClock } from "react-icons/lu";

export function Dashboard() {    

    return (
        <div className="flex flex-col gap-4"> 
                       
                <DashboardGrid/>
                <div className='flex flex-row gap-4 w-10/12 ml-auto'>
                    <DashboardChart/>
                        <CircleChart/>         
                </div>
                  
            
        </div>
    );
}

function BoxWrapper({children}){
    return <div className="bg-white rounded-sm p-4 flex-1 border border-granate flex flex items-center">{children}</div>
}

function DashboardGrid(){
    return <div className="flex gap-4 w-10/12 ml-auto">
    <BoxWrapper>
        <div>
            <LuFileStack />
        </div>             
        <div className="pl-4">
            <span className="text-sn text-gray font-light">
                Solicitudes Recibidas
            </span>
            <div>
                <strong>
                    358
                </strong>
            </div>
        </div>  
    </BoxWrapper>
    <BoxWrapper>
        <div>
            <LuFileCheck2 />
        </div>
        <div className="pl-4">
            <span className="text-sn text-gray font-light">
                Solicitudes Aceptadas
            </span>
            <div>
                <strong>
                    314
                </strong>
            </div>
        </div>  
    </BoxWrapper>
    <BoxWrapper>
        <div>
            <RiFileCloseLine />
        </div>
        <div className="pl-4">
            <span className="text-sn text-gray font-light">
                Solicitudes Rechazadas
            </span>
            <div>
                <strong>
                    13
                </strong>
            </div>
        </div>  
    </BoxWrapper>  
    <BoxWrapper>
        <div>
            <LuFileClock />
        </div>
        <div className="pl-4">
            <span className="text-sn text-gray font-light">
                Solicitudes Pendientes
            </span>
            <div>
                <strong>
                    45
                </strong>
            </div>
        </div>  
    </BoxWrapper>
                          
</div> 
}

const data = [
    {
        name: 'Enero',
        uv: 4000,
        pv: 2400   
      },
      {
        name: 'Enero',
        uv: 4000,
        pv: 2400   
      },
      {
        name: 'Enero',
        uv: 4000,
        pv: 2400   
      },
      {
        name: 'Enero',
        uv: 4000,
        pv: 2400   
      },
    {
      name: 'Enero',
      uv: 4000,
      pv: 2400   
    },
    {
      name: 'Febrero',
      uv: 4000,
      pv: 2400  
    },
    {
        name: 'Febrero',
        uv: 4000,
        pv: 2400  
      },
      {
        name: 'Febrero',
        uv: 4000,
        pv: 2400  
      },
      {
        name: 'Febrero',
        uv: 4000,
        pv: 2400  
      },
      {
        name: 'Febrero',
        uv: 4000,
        pv: 2400  
      },
      
  ]
  const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
function DashboardChart(){        
    return <div className=' h-[22rem] gap-4 bg-white p-4 rounded-sn border border-gray flex flex-col flex-1'>
                <strong className="text-gray font-medium">Solicitudes</strong>
                <div className='w-full mt-3 flex-1 text-xs'>        
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                        width={500}
                            height={300}
                            data={data}
                            margin={{
                                top:20,
                                right:10,
                                left:-10,
                                bottom:5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false}/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey = "uv" fill ="#0ea5e9"/>
                            <Bar dataKey = "pv" fill ="#ea580c"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
   }

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

function CircleChart(){
    return  <div className=' w-[20rem] h-[22rem] gap-4 bg-white p-4 rounded-sn border border-gray flex flex-col'>
                <strong className="text-gray font-medium">Solicitudes</strong>
                <div className='w-full mt-3 flex-1 text-xs'>
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
                                    {data.map((e, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
}
