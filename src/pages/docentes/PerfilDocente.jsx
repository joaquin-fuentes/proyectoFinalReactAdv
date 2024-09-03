import avatar from "../../assets/imagenes/avatarPerfil.jpeg";
import { Container} from "react-bootstrap";
import "./Docentes.css";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";
import ModalProfileEdit from "../../components/ModalProfileEdit";
import { useEffect } from "react";

const PerfilDocente = () => {  
  const { user } = useAuth(state => ({ user: state.user }));
  const { usuario, getUsuarioById, updateUsuario } = useUsuarios(state => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById,
    updateUsuario: state.updateUsuario
  }));

  useEffect(() => {
    if (user?.id) {
      getUsuarioById(user.id);
    }
  }, [user?.id, getUsuarioById]);

  const handleUserUpdated = async (updatedUser) => {
    if (user?.id) {
      await updateUsuario(user.id, updatedUser);
    }
  };

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center py-md-3">
        <img src={avatar} alt="avatar" className="avatarPerfil" />
        <ModalProfileEdit usuario={usuario} onUserUpdated={handleUserUpdated} />
        <article className="perfil-card rounded py-2 mt-3 bg-azulOscuro text-light">
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">DNI</h6>
            <span className="ms-auto my-0">{usuario?.dni}</span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Nombre Completo</h6>
            <span className="ms-auto my-0">{usuario?.nombre} {usuario?.apellido}</span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Correo Electrónico</h6>
            <span className="ms-auto my-0">{usuario?.email}</span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Dirección</h6>
            <span className="ms-auto my-0">
              {usuario?.direccion}
            </span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Número de Teléfono</h6>
            <span className="ms-auto my-0">{usuario?.telefono}</span>
          </div>
        </article>
      </Container>
    </>
  );
};

export default PerfilDocente;
