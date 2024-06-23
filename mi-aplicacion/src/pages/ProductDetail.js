import React, { useEffect } from 'react';
import './ProductDetail.scss'; 
import LayoutBasic from '../layouts/LayoutBasic';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { disableProduct } from '../api/productos';
import ModalRegistro from '../components/ModalRegistro';
import ModalAdvert from '../components/ModalAdvert';
import { useState } from 'react';
import { buscarPrecioDescuento } from '../api/promocion';

const ProductDetail = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); 
    };
    const handleButtonClickEdit = (product) => {
        navigate('/Edit', { state: { product }});
        
    };
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);
    const handleDescontinuar =() =>{
        setIsConfirmationModalVisible(true);
    }
    const handleHistoryPrice =() =>{
        navigate('/PriceHistory', { state: { product }});
    }
    const handleBuyPrice =() =>{
        navigate('/PriceBuyHistory', { state: { product }});
    }
    const handleConfirmarModal = () => {
        disableProduct(product.idProducto)
            .then(response => {
                console.log('Respuesta del servidor:', response);
                if (response && !response.errMsg) {  
                    console.log('Producto desactivado:', response);
                    setIsConfirmationModalVisible(false);
                    setIsRegistrationModalVisible(true);
                } else {
                    console.error('Error en la desactivado:', response.errMsg);
                }
            })
            .catch(error => {
                console.error('Error al desactivado el producto:', error);
            });
    };
    const handleCancelarModal = () => {
        setIsConfirmationModalVisible(false);
        setIsRegistrationModalVisible(false);
    };

    const handleRegistroConfirmado = () => {
        setIsRegistrationModalVisible(false);
        navigate("/Products");
    };
    const [precioActual, setPrecioActual] = useState(product.precioVenta);

    
    useEffect(() => {
        buscarPrecioDescuento(product.idProducto).then(data => {
            if (data && data.length > 0) {
                setPrecioActual(data[0]); 
            } else {
                setPrecioActual(product.precioVenta);
            }
        }).catch(error => {
            setPrecioActual(product.precioVenta); 
        });
    }, [product]);

    return (
        <LayoutBasic>
            <div className="detail-container">
                <div className="detail-header">
                    <h1>Detalle del producto</h1>
                    <button className="deactivate-btn" onClick={handleDescontinuar}>Descontinuar</button>
                </div>
                <div className="header-box">
                    Datos Generales del producto
                </div>
                <div className="product-general-info">
                    <div className="info-row">
                        <div className="info-column">
                        <div className="info-label">Nombre de producto:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={product.nombre}
                            />
                        </div>
                        <div className="info-column">
                        <div className="info-label">Marca:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={product.marca.nombre}
                            />
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-column">
                        <div className="info-label">Categoría:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={product.categoria.nombre}
                            />
                        </div>
                        <div className="info-column">
                        <div className="info-label">Unidad:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={product.unidad.nombre}
                            />
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-column">
                        <div className="info-label">Proveedor:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={product.proveedor.nombre}
                            />
                        </div>
                        <div className="info-column">
                        </div>
                    </div>
                </div>
                <div className="header-box">
                    Datos de inventario
                </div>
                <div className="product-general-info">
                    <div className="info-row">
                        <div className="info-column-history">
                            <div className="info-label">Precio Venta (S/.) :</div>
                            <div className='history'>
                                <input type="text" className="info-textbox" value={precioActual.toFixed(2)} />
                                <button className="button-history" onClick={handleHistoryPrice}>Ver historial</button>
                            </div>

                        </div>
                        <div className="info-column-history">
                            <div className="info-label">Precio compra (S/.) :</div>
                            <div className='history'>
                            <input type="text" className="info-textbox" value={product.precioCompra.toFixed(2)} />
                            <button className="button-history" onClick={handleBuyPrice}>Ver historial</button>
                            </div>

                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-column">
                            <div className="info-label">Stock:</div>
                            <input type="text" className="info-textbox" value={product.stock} />
                        </div>
                        <div className="info-column">
                            <div className="info-label">Stock mínimo:</div>
                            <input type="text" className="info-textbox" value={product.stockMinimo} />
                        </div>
                    </div>
                </div>

                <div className="button-bar">
                        <button  onClick={handleBack} className="button-back" >Regresar</button>
                        <button onClick={()=>handleButtonClickEdit(product)} className="button-edit">Editar producto</button>
                </div>
                {isConfirmationModalVisible && (
                <ModalAdvert
                    title="Descontinuar producto"
                    bodyText="Estas seguro que quieres descontinuar el producto seleccionado?"
                    confirmButtonText="Confirmar"
                    cancelButtonText="Cancelar"
                    onConfirm={handleConfirmarModal}
                    onCancel={handleCancelarModal}
                />
            )}
            {isRegistrationModalVisible && (
                <ModalRegistro
                    title="Producto descontinuado"
                    buttonText="Volver a productos"
                    onConfirm={handleRegistroConfirmado}
                    redirectPath="/Products"
                />
            )}
            </div>
    </LayoutBasic>
    );
};

export default ProductDetail;
