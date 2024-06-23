import{BASE_PATH} from './config';

export function crearVenta(venta) {
    const url = new URL(`${BASE_PATH}api/ventas/registrar`);
    return fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(venta)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Venta creado:', data);
        return data;
    })
    .catch(error => {
        console.error('Error al crear el Venta:', error);
    });
}
export function crearVentaPromo(ventaPromocion) {
    const url = new URL(`${BASE_PATH}api/ventasPromo/registrarVentaPromocion`);
    return fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ventaPromocion)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Venta creado:', data);
        return data;
    })
    .catch(error => {
        console.error('Error al crear el Venta:', error);
    });
}
export function obtenerVentasDelDia() {
    const url = new URL(`${BASE_PATH}api/ventas/hoy`);
    return fetch(url, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error al listar ventas:', error);
        return {
            errMsg: error.message,
            success: false
        };
    });
}
export function obtenerVentasDetalle(idVentas) {
    const url = new URL(`${BASE_PATH}api/ventas/${idVentas}/detalles`);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.status === 204) {
            return []; // Manejar respuesta vacía
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error al listar ventas:', error);
        return [];
    });
}

export function obtenerVentasDetallePromo(idVentas) {
    const url = new URL(`${BASE_PATH}api/ventas/${idVentas}/promo`);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.status === 204) {
            return []; // Manejar respuesta vacía
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error al listar ventas:', error);
        return [];
    });
}

export function cancelarVenta(idVentas, movementData) {
    const url = new URL(`${BASE_PATH}api/ventas/cancelar/${idVentas}`);
    const params = new URLSearchParams(movementData);
    url.search = params.toString();

    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(errMsg => {
        return {
            errMsg: errMsg.message,
            success: false
        };
    });
}

export function obtenerVentasPorFecha(fecha) {
    const url = `${BASE_PATH}api/ventas/fecha?fecha=${fecha}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(errMsg => {
        return {
            errMsg: errMsg.message,
            success: false
        };
    });
}