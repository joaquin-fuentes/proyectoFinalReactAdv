import Swal from 'sweetalert2';

const useSweetAlert = () => {
  const showAlert = async (type, title, text, confirmButtonText = 'Aceptar', confirmButtonColor = '#004b81') => {
    const result = await Swal.fire({
      title,
      text,
      icon: type,
      confirmButtonColor,
      confirmButtonText,
    });
    return result;
  };

  const showConfirmation = async (title, text) => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#004b81',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });
    return result;
  };

  return {
    showAlert,
    showConfirmation,
  };
};

export default useSweetAlert;