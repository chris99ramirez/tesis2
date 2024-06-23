import React, { useState,useEffect } from 'react';
import LayoutBasic from '../layouts/LayoutBasic';
import { Navigate,useNavigate } from 'react-router-dom';
import './SalesNew.scss'
import TableSaleDetail from '../components/TableSaleDetail';
import { useLocation } from 'react-router-dom';
import { cancelarVenta, obtenerVentasDetalle,obtenerVentasDetallePromo } from '../api/ventas';
import ModalAdvert from '../components/ModalAdvert';
import ModalRegistro from '../components/ModalRegistro';
import Spinner from "../components/Spinner";

const SalesDetail =() => {
    const location = useLocation();
    const {clientPrevio, montoTotalPrevio,idVentas,estado } = location.state;
    const [products,setProducts]=useState([]);
    const navigate=useNavigate();
    const [montoTotal,setMontoTotal]=useState(montoTotalPrevio)
    const [cliente,setCliente]=useState(clientPrevio)
    const [idVenta,setIdVenta]=useState(idVentas)
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [isConfirmationModalVisible2, setIsConfirmationModalVisible2] = useState(false);
    const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);
    const [ventaState,setVentaState]=useState(estado)
    const [promotions, setPromotions] = useState([]);
    const  [metodo,setMetodo]=useState(-1);
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [productsData, promotionsData] = await Promise.all([
                    obtenerVentasDetalle(idVenta),
                    obtenerVentasDetallePromo(idVenta)
                ]);

                // Combine the results
                const combinedData = [...productsData, ...promotionsData];
                console.log(combinedData)
                setMetodo(combinedData[0].venta.idMetodoPago)
                setProducts(combinedData);
            } catch (error) {
                console.error('Error al obtener los detalles de la venta:', error);
            }
        };

        fetchDetails();
    }, [idVenta]);

    const handleDescontinuar =() =>{
        setIsConfirmationModalVisible(true);
    }
    const handleConfirmarModal2 = () => {
      const date = new Date();
      date.setHours(date.getHours() - 5); 
      const movementData = {
          idUsuario: 1, 
          fechaMovimiento: date.toISOString()
      };
  
      console.log('Datos a enviar al servidor:', movementData);
  
      cancelarVenta(idVenta, movementData)
          .then(response => {
              console.log('Respuesta del servidor:', response);
              if (response && !response.errMsg) {  
                  setIsConfirmationModalVisible(false);
                  setIsRegistrationModalVisible(true);
              } else {
                  console.error('Error en la cancelacion:', response.errMsg);
              }
          })
          .catch(error => {
              console.error('Error al cancelar la venta:', error);
          });
    };
    const handleConfirmarModal = () => {
        setIsConfirmationModalVisible2(true);
        setIsConfirmationModalVisible(false);

    };
    const handleRegistroConfirmado = () => {
      setIsConfirmationModalVisible2(false);
      navigate("/SalesList");
  };

    const handleCancelarModal = () => {
        setIsConfirmationModalVisible(false);
        setIsConfirmationModalVisible2(false);
        setIsRegistrationModalVisible(false);
    };
    return (
        <LayoutBasic>
          <div className="sale-container">
            <div className="sale-header">
              <h1>Venta No. {idVenta}</h1>
              <button
                    className="deactivate-btn"
                    onClick={handleDescontinuar}
                    disabled={ventaState === 0 || metodo !=1}
                >
                    {ventaState === 0 ? "Descontinuado" : "Descontinuar"}
                </button>


            </div>
            <div className="header-box">
                    Datos Generales del cliente
            </div>
            <div className='client-general-info'>
                <div className='info-row'>
                    <div className="info-column">
                        <div className="info-label">Nombre:</div>
                        <input
                                disabled={true}

                                type="text"
                                className="info-textbox"
                                value={cliente.nombre}
                        />
                    </div>
                    <div className="info-column">
                        <div className="info-label">Número de DNI:</div>
                        <input
                                                        disabled={true}

                                type="text"
                                className="info-textbox"
                                value={cliente.dni}
                        />
                    </div>
                    <div className="info-column">
                        <div className="info-label">Número de teléfono:</div>
                        <input
                                disabled={true}
                                type="text"
                                className="info-textbox"
                                value={cliente.celular}
                        />
                    </div>
                </div>
            </div>
            <div className="table-container-sale">
            {products.length > 0 ? (
                <TableSaleDetail products={products}/>
            ) : (
                <Spinner />
            )}
            </div>
            <div className="button-bar">
              <button className="button-back" onClick={() => navigate(-1)}>
                Regresar
              </button>
              <div className='saleConfirm'>
                <h2>Monto Total (S/.) {montoTotal}</h2>

              </div>

            </div>
        
          </div>
          {isConfirmationModalVisible && (
                <ModalAdvert
                    title="Cancelar venta"
                    bodyText="La venta solo debe ser eliminada en caso se aceptó la devolución del producto y se realizó la reinversión de dinero efectivo al cliente."
                    confirmButtonText="Siguiente"
                    cancelButtonText="Cancelar"
                    onConfirm={handleConfirmarModal}
                    onCancel={handleCancelarModal}
                />
            )}
                      {isConfirmationModalVisible2 && (
                <ModalAdvert
                    title="Cancelar venta"
                    bodyText="Desea eliminar la venta seleccionada?"
                    confirmButtonText="Confirmar"
                    cancelButtonText="Cancelar"
                    onConfirm={handleConfirmarModal2}
                    onCancel={handleCancelarModal}
                />
            )}
                        {isRegistrationModalVisible && (
                <ModalRegistro
                    title="Venta cancelada"
                    buttonText="Volver a ventas"
                    onConfirm={handleRegistroConfirmado}
                    redirectPath="/SalesList"
                />
            )}
        </LayoutBasic>
      );
};
export default SalesDetail;
