import Swal from "sweetalert2";

export const DialogAlert = (title, textBtn, body, icon) => {
    return Swal.fire({
        icon: icon,
        title: title,
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: textBtn,
        html: `<p> ${body} </p>`
    });
}