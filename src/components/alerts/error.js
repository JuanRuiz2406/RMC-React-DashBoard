import Swal from "sweetalert2";

const Error = (text) => {
  Swal.fire({
    title: "Error",
    text: text,
    icon: "error",
    confirmButtonColor: "#3085d6",
  });
};

export default Error;
