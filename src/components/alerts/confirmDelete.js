import Swal from "sweetalert2";

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
        Swal.fire("Eliminado!", deleteResponse.message, "success");
        setTimeout(() => {
          refreshPage();
        }, 1000 * 2);
      }

      if (deleteResponse.code === 400) {
        alert(deleteResponse.message);
      }

      if (deleteResponse.status === 401) {
        alert(deleteResponse.error);
      }
    }
  });
};

export default Confirm;
