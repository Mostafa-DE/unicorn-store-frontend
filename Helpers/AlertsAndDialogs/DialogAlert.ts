import Swal from "sweetalert2";
import {SweetAlertIcon} from "sweetalert2";

interface IDialogAlert {
    title: string;
    icon: SweetAlertIcon;
    textBtn?: string;
    body: string;
}

export const DialogAlert = ({title, textBtn = "OK", body, icon}: IDialogAlert) => {
    return Swal.fire({
        icon: icon,
        title: title,
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: textBtn,
        html: `<p> ${body} </p>`
    });
}
