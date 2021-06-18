import Swal from "sweetalert2";

const Success = (title, text) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonColor: "#3085d6",
  });
};

export default Success;
