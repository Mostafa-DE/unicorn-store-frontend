import Swal from "sweetalert2";

export const alertRememberMe = (): void => {
    Swal.fire({
        icon: "warning",
        title: "👋 مرحباً",
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: "حسناً",
        html: `<p>يرجى ملاحظة أننا نستخدم ملفات تعريف الارتباط للاحتفاظ بتسجيل الدخول الخاص بك لمدة أسبوع ، وبعد ذلك يتم تسجيل الخروج تلقائيًا ، إذا كنت لا تريد الاحتفاظ بتسجيل الدخول فيمكنك الضغط على خيار تسجيل الخروج من القائمة</p>`
    });
};
