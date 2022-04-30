import styles from "@/components/ProductDetails/ProductDetails.module.css";
import {ImWhatsapp} from "react-icons/im";
import Swal from "sweetalert2";

export const AlertSizeNotExist = (
    <p className={styles.sizeNotExistText}>
        نعتذر يبدو أن القياس المطلوب غير متوفر حالياً لمعرفة إن كان سيتوفر بعد
        مدة معينة يرجى مراسلتنا عبر{" "}
        <a href="https://wa.me/message/HRQFZDWSM3EUH1">
            <ImWhatsapp/>
        </a>
    </p>
);

export const AlertErrorSize = async () => {
    await Swal.fire({
        title: "نعتذر لا يمكن تنفيذ طلبك",
        text:
            " لا تستطيع إضافة المنتج إلى حقيبة التسوق الخاصة بك, يجب عليك إدخال الطول والوزن لتحديد القياس المناسب لك أولاً",
        icon: "error",
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: "حسناً",
        showClass: {
            popup: "animate__animated animate__flipInX"
        },
        hideClass: {
            popup: "animate__animated animate__flipOutX"
        }
    });
};