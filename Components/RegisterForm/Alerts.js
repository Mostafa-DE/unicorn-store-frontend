import Swal from "sweetalert2";

export const alertLoginFailed = async (error) => {
    await Swal.fire({
        title: "حدث خطأ أثناء تسجيل الدخول",
        icon: "error",
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: "حسناً",
        html: `<p>${error}</p>`
    });
}