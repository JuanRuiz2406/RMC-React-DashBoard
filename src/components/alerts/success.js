import Swal from "sweetalert2";

const Success = (title, text) => {
  Swal.fire(title, text, "success");
};

export default Success;
