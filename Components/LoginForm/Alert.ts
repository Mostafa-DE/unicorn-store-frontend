import Swal from "sweetalert2";

export const alertBenefitsLogin = () => {
    Swal.fire({
        title: "الميزات التي ستتمتع بها بمجرد إنشاء حساب ",
        html: `
      <p> الطلب بشكل أسرع في المستقبل دون الحاجة لإدخال البيانات في كل مرة تنوي بها الطلب</p>
      <hr />
      <p>سجل الطلبات لتتبع طلباتك في المستقبل في أي وقت تريده</p>
      <hr />
      <p>الوصول لقائمة المفضلة لديك وإمكانية حفظ المنتجات التي تنوي شرائها في المستقبل</p>
      <hr />
      <p>الحصول على متابعة أسهل من قبل الفريق المختص لدينا في حال واجهتك أي مشاكل في الموقع</p>
      <hr />
      <p>الحصول على خصومات مميزة خاصة</p>
      <hr />
      <p>إخطارك في  حال توفر عروض وخصومات حصرية على الموقع</p>
      `,
        customClass: "",
        icon: "info",
        confirmButtonText: "حسناً, لقد فهمت",
        confirmButtonColor: "#fb9aa7",
        footer: `<a href="#">أنا بحاجة إلى المساعدة</a> لم تتضح الأمور بشكل جيد`
    });
};

export const alertRememberMe = () => {
    Swal.fire({
        icon: "warning",
        title: "👋 مرحباً",
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: "حسناً",
        html: `<p>يرجى ملاحظة أننا نستخدم ملفات تعريف الارتباط للاحتفاظ بتسجيل الدخول الخاص بك لمدة أسبوع ، وبعد ذلك يتم تسجيل الخروج تلقائيًا ، إذا كنت لا تريد الاحتفاظ بتسجيل الدخول فيمكنك الضغط على خيار تسجيل الخروج من القائمة</p>`
    });
};

export const alertLoginFailed = (error) => {
    Swal.fire({
        title: "حدث خطأ أثناء عملية تسجيل الدخول",
        text: error,
        icon: "error",
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: "حسناً"
    });
}
