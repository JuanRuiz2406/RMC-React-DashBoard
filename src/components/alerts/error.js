import Swal from "sweetalert2";

const Error = (text) => {
  Swal.fire("Error", text, "error");
};

export default Error;
