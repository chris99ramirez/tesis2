import React from 'react';
import './TableMovement.scss'

const TablePrices = ({ precios = [] }) => {
    // Function to format date strings to only display the date part
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    };

    // Function to determine if the current date is within the date range
    const isActive = (fechaInicio, fechaFinal) => {
        const currentDate = new Date();
        const startDate = new Date(fechaInicio);
        const endDate = new Date(fechaFinal);

        return currentDate >= startDate && currentDate <= endDate;
    };

    return (
        <div className="products-table">
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Usuario de registro</th>
                        <th>Precio de venta</th>
                        <th>Fecha Inicial</th>
                        <th>Fecha Final</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {precios.map((precio, index) => (
                        <tr key={precio.id}>
                            <td>{index + 1}</td>
                            <td>{precio.usuario.nombre}</td>
                            <td>{precio.precioActual.toFixed(2)}</td>
                            <td>{formatDate(precio.fechaInicio)}</td>
                            <td>{precio.fechaFinal === '2099-01-01T00:00:00' ? '-' : formatDate(precio.fechaFinal)}</td>
                            <td>{isActive(precio.fechaInicio, precio.fechaFinal) ? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablePrices;
