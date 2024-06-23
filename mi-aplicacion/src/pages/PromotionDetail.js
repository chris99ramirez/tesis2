import React, { useState,useEffect } from 'react';
import './NewPromotion.scss';
import LayoutBasic from '../layouts/LayoutBasic';
import ProductTable from '../components/ProductTable';
import addIcon from '../images/add.svg'; 
import { ReactComponent as AddIcon } from '../images/add.svg';
import ModalFindProduct from '../components/ModalFindProudct';
import { useLocation } from 'react-router-dom';
import ModalProductSelect from '../components/ModalProductSelect';
import { addProducts } from '../api/productos';
import ModalRegistro from '../components/ModalRegistro';
import ModalAdvert from '../components/ModalAdvert';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { obtenerProductosPromocion, obtenerPromocion } from '../api/promocion';
import TableDetailPromotion from '../components/TableDetailPromotion';
import { actualizarEstadoPromocion } from '../api/promocion';
import Spinner from "../components/Spinner";

const PromotionDetail = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const {idPromocion } = location.state;
    const [idPromo,setIdPromo]=useState(idPromocion)
    const [promocion,setPromocion]=useState({})
    const [productoPromo,setProductoPromo]=useState([])
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);
    useEffect(() => {
          obtenerProductosPromocion(idPromo).then(data2=>{
            setProductoPromo(data2);
            setPromocion(data2[0].promocion);
            setIsLoading(false);

            console.log(data2);
          }
          )

  }, []);
  const getTipoPromocion = (tipo) => {
    switch(tipo) {
        case 0:
            return 'Combo';
        case 1:
            return 'Descuento';
        default:
            return 'Desconocido';
    }
};
const handleDescontinuar =() =>{
  setIsConfirmationModalVisible(true);
}


const handleConfirmarModal = () => {
  actualizarEstadoPromocion(idPromo)
      .then(response => {
        console.log('Respuesta del servidor:', response);
        if (response && !response.errMsg) {  
            console.log('Promocion desactivada:', response);
            setIsConfirmationModalVisible(false);
            setIsRegistrationModalVisible(true);
        } else {
            console.error('Error en la desactivado:', response.errMsg);
        }
      })
      .catch(error => {
          console.error('Error:', error);
      });
};
const handleCancelarModal = () => {
  setIsConfirmationModalVisible(false);
  setIsRegistrationModalVisible(false);
};

const handleRegistroConfirmado = () => {
  setIsRegistrationModalVisible(false);
  navigate("/Promotions");
};



    return (
        <LayoutBasic>
           {isLoading ? (
                    <Spinner />
                ) : (
          <div className="new-promotion-container">
            <div className="new-promotion-header">
              <h1>Detalle de la promoción</h1>
              <button
              className="deactivate-btn"
              onClick={handleDescontinuar}
              disabled={promocion.estado === 0}
            >
              {promocion.estado === 0 ? 'Cancelado' : 'Desactivar'}
            </button>
            </div>
            <div className="header-box">
                    Datos Generales de la promoción
            </div>
            <div className='new-promotion-general-info'>
                <div className='info-row'>
                        <div className="info-label">Descripción:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={promocion.descripcion}
                        />
                    </div>
                <div className='info-row'>

                <div className="info-label">Tipo de promoción:</div>
                <input
                    type="text"
                    className="info-textbox"
                    value={getTipoPromocion(promocion.tipoPromocion)}
                    readOnly
                />
                </div>
                <div className='info-row'>

                    <div className="info-column">
                    <div className="info-label">Fecha Inicial</div>
                        <input
                                type="text"
                                className="info-textbox-date"
                                value={promocion.fechaInicio}
                        />
                </div>
               
                    <div className="info-column">
                    <div className="info-label">Fecha Fin</div>
                        <input
                                type="text"
                                className="info-textbox-date"
                                value={promocion.fechaFin}
                        />
                </div>
                    </div>
                    </div>
            <div className="header-box">
                    Detalle de los productos
            </div>
            <div className="table-container-sale">
              <TableDetailPromotion products={productoPromo}></TableDetailPromotion>
            </div>
            <div className="monto-bar">
            <div className="info-row">
                        <div className="info-column">
                            <div className="info-label">Stock:</div>
                            <input
                                type="text"
                                className="info-textbox"
                                value={`${promocion.stock} ${promocion.unidadStock}`}
                            />
                        </div>

            </div>
            <div className="info-row">
                        <div className="info-column">
                            <div className="info-label">Descuento:</div>
                            <input
                                type="text"
                                className="info-textbox"
                                value={`${promocion.valorDescuento*100}%`}
                            />
                        </div>
                        <div className="info-column">
                        <div className="info-label">Monto con descuento:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={promocion.precio}

                            />
                        </div>
            </div>


            </div >
            <div className="button-bar">
              <button className="button-back" onClick={() => navigate(-1)}>
                Regresar
              </button>


            </div>
        
          </div>
                    )}

          {isConfirmationModalVisible && (
                <ModalAdvert
                    title="Desactivar promoción"
                    bodyText="Estas seguro que quieres descontinuar la promoción seleccionada?"
                    confirmButtonText="Confirmar"
                    cancelButtonText="Cancelar"
                    onConfirm={handleConfirmarModal}
                    onCancel={handleCancelarModal}
                />
            )}
            {isRegistrationModalVisible && (
                <ModalRegistro
                    title="Promocion desactivada"
                    buttonText="Volver a promociones"
                    onConfirm={handleRegistroConfirmado}
                    redirectPath="/Promotions"
                />
            )}
        </LayoutBasic>
      );
}
export default PromotionDetail;

