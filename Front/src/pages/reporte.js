// src/pages/Reporte.js

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getDesempeno } from '../services/reporte';
import '../styles/reporte.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Reporte = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDesempeno();
                setData(result.map(item => ({
                    name: item.nombreProducto,
                    value: item.cantidadTotal
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="reporte-container">
            <h2 className="reporte-title">Productos con Mejor Desempeño</h2>
            <div className="reporte-chart">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius="80%"
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default Reporte;
