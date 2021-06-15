import Swal from "sweetalert2";
import Error from "./error";
import Success from "./success";

const Confirm = (title, text, action) => {
  const refreshPage = () => {
    window.location.reload();
  };

  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "¡No, cancelar!",
    confirmButtonText: "Si, eliminar!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const deleteResponse = await action;

      if (deleteResponse.code === 200) {
        Success("Eliminado!", deleteResponse.message);
        setTimeout(() => {
          refreshPage();
        }, 1000 * 2);
      }

      if (deleteResponse.code === 400) {
        Error(deleteResponse.message);
      }

      if (deleteResponse.status === 401) {
        Error(deleteResponse.error);
      }
    }
  });
};

export default Confirm;
