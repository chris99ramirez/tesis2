import React, { useState,useEffect } from 'react';
import LayoutBasic from '../layouts/LayoutBasic';
import { Navigate,useNavigate } from 'react-router-dom';
import './SalesNew.scss'
import { useLocation } from 'react-router-dom';
import logoElectro from '../images/efectivo.png';
import logoVisaMastercard from '../images/visa.jpg';
import logoYape from '../images/yape.png';
import logoPlin from '../images/plin.jpg';
import ModalRegistro from '../components/ModalRegistro';
import ModalAdvert from '../components/ModalAdvert';
import { crearVenta, crearVentaPromo } from '../api/ventas';
const SaleConfirm =() => {
    const location = useLocation();
    const { productsSale, client, montoTotal } = location.state;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const handlePaymentMethodChange = (index) => {
        setSelectedPaymentMethod(index);
    };
    const handleRegistrationProductConfirmed = () => {
        setIsRegistrationProductModalVisible(false);
        navigate("/SalesList");  
    };
    const navigate=useNavigate();
    const [cliente,setCliente]=useState(client);
    const handleNombreChange = (event) => {
        setCliente(prevCliente => ({
            ...prevCliente,
            nombre: event.target.value
        }));
    };
    const handleDniChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setCliente(prevCliente => ({
            ...prevCliente,
            dni: value
        }));
    };
    
    const handleTelefonoChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setCliente(prevCliente => ({
            ...prevCliente,
            telefono: value
        }));
    };

    const handleDetail = () => {
        navigate('/SalesNew', {
          state: {
            productosPrevios: productsSale,
            clientPrevio: cliente,  
            montoTotalPrevio: montoTotal
          }
        });
      };
      function convertirProductos(productsSale) {
        return productsSale.map(product => ({
            idProducto: product.idProducto,
            cantidad: product.cantidad
        }));
    }
    function convertirPromociones(promociones) {
        return promociones.map(promocion => ({
            idPromocion: promocion.idPromocion,
            cantidad: promocion.cantidad
        }));
    }
      const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
      const [isRegistrationProductModalVisible, setIsRegistrationProductModalVisible] = useState(false);
      const handleGuardar = () => {
        setIsSaveModalVisible(true);
      };
      const [ventaId, setVentaId] = useState(null);
      const handleConfirmSave = () => {
        setIsSaveModalVisible(false);
        const date = new Date();
        date.setHours(date.getHours() - 5); 
        const promociones = productsSale.filter(product => product.idPromocion);
        const productos = productsSale.filter(product => !product.idPromocion);
    
        console.log('Promociones:', promociones);
        console.log('Productos:', productos);
    
        const productosDetalle = convertirProductos(productos); // Convertir solo los productos, no las promociones
        const promocionDetalle = convertirPromociones(promociones);
        console.log('promocionDetalle:', promocionDetalle);
    
        const ventaProducto = {
            cliente: cliente,
            productos: productosDetalle,
            metodoPago: selectedPaymentMethod,
            fechaMovimiento: date.toISOString(),
            totalFinal: parseFloat(montoTotal),
        };
    
        if (productos.length > 0) {
            console.log('Venta Producto:', ventaProducto);
            crearVenta(ventaProducto)         
            .then(response => {
                setVentaId(response.idVentas);
                console.log('ID de la venta creada:', response.idVentas);
                
                if (promociones.length > 0) {
                    const ventaPromo = {
                        idVenta: response.idVentas,
                        cliente: cliente,
                        promociones: promocionDetalle,
                        metodoPago: selectedPaymentMethod,
                        fechaMovimiento: date.toISOString(),
                        totalFinal: parseFloat(montoTotal),
                    };
                    console.log('Venta Promo:', ventaPromo);
                    return crearVentaPromo(ventaPromo); 
                }
            })
            .then(response => {
                if (response) {
                    console.log('Venta Promo creada:', response);
                }
                setIsRegistrationProductModalVisible(true);
            })
            .catch(error => {
                console.error('Error guardando la venta:', error);
            });
        } else if (promociones.length > 0) {
            const ventaPromo = {
                idVenta: ventaId,
                cliente: cliente,
                promociones: promocionDetalle,
                metodoPago: selectedPaymentMethod,
                fechaMovimiento: date.toISOString(),
                totalFinal: parseFloat(montoTotal),
            };
            console.log('Venta Promo:', ventaPromo);
            crearVentaPromo(ventaPromo)         
            .then(response => {
                console.log('Venta Promo creada:', response);
                setIsRegistrationProductModalVisible(true);
            })
            .catch(error => {
                console.error('Error guardando la venta promocion:', error);
            });
        }
    };
    
    return (
        <LayoutBasic>
          <div className="sale-container">
            <div className="sale-header">
              <h1>Nueva venta</h1>
            </div>
            <div className="header-box">
                    Datos Generales del cliente
            </div>
            <div className='client-general-info'>
                <div className='info-row'>
                    <div className="info-column">
                        <div className="info-label">Nombre:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={cliente.nombre}
                                onChange={handleNombreChange}
                        />
                    </div>
                    <div className="info-column">
                        <div className="info-label">Número de DNI:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={cliente.dni}
                                onChange={handleDniChange}
                        />
                    </div>
                    <div className="info-column">
                        <div className="info-label">Número de teléfono:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={cliente.telefono}
                                onChange={handleTelefonoChange}
                        />
                    </div>
                </div>
            </div>
            <div className="header-box">
                    Detalle de venta
            </div>
            <div className='detail-box'>
                <div className='info-row'>
                    <div className="info-column">
                        <div className="info-label">Número de productos</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={productsSale.length}
                                onChange={handleNombreChange}
                        />
                    </div>
                    <div className="info-column">
                        <div className="info-label">Monto total:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={montoTotal}
                                onChange={handleDniChange}
                        />
                    </div>
                    <div className='info-column'>
                        <button className="button-edit" onClick={handleDetail}>
                            Ver detalle 
                        </button>
                    </div>
                </div>
            </div>
            <div className="header-box">
                    Métodos de pago
            </div>
            <div className="payment-methods-container">
                <div className="payment-method">
                    <img src={logoElectro} alt="Electro" className="payment-logo"/>
                    <input type="radio" id="electro" name="paymentMethod" value="electro" 
            checked={selectedPaymentMethod === 1} 
            onChange={() => handlePaymentMethodChange(1)}  />
                    <label htmlFor="electro">Efectivo</label>
                </div>
                <div className="payment-method">
                    <img src={logoVisaMastercard} alt="Visa Mastercard" className="payment-logo"/>
                    <input type="radio" id="visaMastercard" name="paymentMethod"            value="visaMastercard" 
            checked={selectedPaymentMethod === 2} 
            onChange={() => handlePaymentMethodChange(2)} />
                    <label htmlFor="visaMastercard">Visa/Mastercard</label>
                </div>
                <div className="payment-method">
                    <img src={logoYape} alt="Yape" className="payment-logo"/>
                    <input type="radio" id="yape" name="paymentMethod"            value="yape" 
            checked={selectedPaymentMethod === 3} 
            onChange={() => handlePaymentMethodChange(3)} />
                    <label htmlFor="yape">Yape</label>
                </div>
                <div className="payment-method">
                    <img src={logoPlin} alt="Plin" className="payment-logo"/>
                    <input type="radio" id="plin" name="paymentMethod"            value="plin" 
            checked={selectedPaymentMethod === 4} 
            onChange={() => handlePaymentMethodChange(4)} />
                    <label htmlFor="plin">Plin</label>
                </div>
                </div>
            <div className="button-bar">
              <button className="button-back" onClick={() => navigate('/SalesList')}>
                Cancelar venta
              </button>

                <button className="button-edit" onClick={handleGuardar}>
                  Confirmar 
              </button>
              
              </div>
          </div>
          {isSaveModalVisible && (
                    <ModalAdvert
                        title="Registrar nueva venta"
                        bodyText="¿Está seguro de que desea registrar esta nueva venta?"
                        confirmButtonText="Confirmar"
                        cancelButtonText="Cancelar"
                        onConfirm={handleConfirmSave}
                        onCancel={() => setIsSaveModalVisible(false)}
                    />
                )}
                {isRegistrationProductModalVisible && (
                    <ModalRegistro
                        title="Venta Registrada"
                        buttonText="Volver a ventas"
                        onConfirm={handleRegistrationProductConfirmed}
                        redirectPath="/SalesList"
                    />
                )}
        </LayoutBasic>
      );
};
export default SaleConfirm;
