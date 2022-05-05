import Swal from "sweetalert2";

export const DialogAlert = () => {
    return Swal.fire({
        icon: "error",
        title: "Sorry 😔",
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: "حسناً",
        html: `<p> The maximum quantity that can be ordered is 2. </p>`
    });
}