import{BASE_PATH} from './config';

export function crearPromocion(promocion) {
    const url = new URL(`${BASE_PATH}api/promociones/registrar`);
    
    return fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(promocion)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Obtener el texto de la respuesta
    })
    .then(responseText => {
        if (responseText) {
            // Solo intentar parsear si hay contenido en la respuesta
            return JSON.parse(responseText);
        }
        return {}; // Devolver un objeto vacío si no hay contenido
    })
    .then(data => {
        console.log('Promocion creada:', data);
        return data;
    })
    .catch(error => {
        console.error('Error al crear la promocion:', error);
    });
}

export function listarPromociones() {
    const url = new URL(`${BASE_PATH}api/promociones/listar`);
    
    return fetch(url, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); 
    })
    .then(responseText => {
        if (responseText) {
            const data = JSON.parse(responseText);
            console.log(data)
            return data.map(promo => ({
                ...promo,
                fechaInicio: new Date(promo.fechaInicio).toISOString().split('T')[0],
                fechaFin: new Date(promo.fechaFin).toISOString().split('T')[0]
            }));
        }
        return []; 
    })
    .then(data => {
        console.log('Promociones listadas:', data);
        return data;
    })
    .catch(error => {
        console.error('Error al listar las promociones:', error);
    });
}

export function buscarPrecioDescuento(idProducto) {
    const url = `${BASE_PATH}api/productoPromocion/promociones/${idProducto}`;
    const params = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error al listar movimientos del producto: ", error);
            return {
                errMsg: error.message,
                success: false
            };
        });

}
export function obtenerPromocion(idPromocion) {
    const url = new URL(`${BASE_PATH}api/promociones/detalle/${idPromocion}`);
    
    return fetch(url, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); 
    })
    .then(responseText => {
        if (responseText) {
            const promo = JSON.parse(responseText);
            return {
                ...promo,
                fechaInicio: new Date(promo.fechaInicio).toISOString().split('T')[0],
                fechaFin: new Date(promo.fechaFin).toISOString().split('T')[0]
            };
        }
        return null; 
    })
    .then(data => {
        console.log('Promoción obtenida:', data);
        return data;
    })
    .catch(error => {
        console.error('Error al obtener la promoción:', error);
    });
}
export function obtenerProductosPromocion(idPromocion) {
    const url = new URL(`${BASE_PATH}api/productoPromocion/${idPromocion}`);
    
    return fetch(url, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); 
    })
    .then(responseText => {
        if (responseText) {
            const productos = JSON.parse(responseText);
            return productos.map(productoPromocion => ({
                ...productoPromocion,
                promocion: {
                    ...productoPromocion.promocion,
                    fechaInicio: new Date(productoPromocion.promocion.fechaInicio).toISOString().split('T')[0],
                    fechaFin: new Date(productoPromocion.promocion.fechaFin).toISOString().split('T')[0]
                }
            }));
        }
        return []; 
    })
    .then(data => {
        console.log('Productos de la promoción obtenidos:', data);
        return data;
    })
    .catch(error => {
        console.error('Error al obtener los productos de la promoción:', error);
    });
}

export function actualizarEstadoPromocion(idPromocion) {
    const url = new URL(`${BASE_PATH}api/promociones/actualizarEstado/${idPromocion}`);
    
    return fetch(url, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Estado de la promoción actualizado:', data);
        return data;
    })
    .catch(errMsg => {
        return {
            errMsg: errMsg.message,
            success: false
        };
    });
}

export function listarPromocionesCombo(tipoPromocion) {
    const url = new URL(`${BASE_PATH}api/promociones/listarCombo/${tipoPromocion}`);
    
    return fetch(url, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); 
    })
    .then(responseText => {
        if (responseText) {
            const data = JSON.parse(responseText);
            return data.map(promo => ({
                ...promo,
                fechaInicio: new Date(promo.fechaInicio).toISOString().split('T')[0],
                fechaFin: new Date(promo.fechaFin).toISOString().split('T')[0]
            }));
        }
        return []; 
    })
    .then(data => {
        console.log('Promociones listadas:', data);
        return data;
    })
    .catch(error => {
        console.error('Error al listar las promociones:', error);
    });
}


