import {API_URL} from "@/config/index";
import Swal from "sweetalert2";

const Alert = (alertText, icon) => {
    return Swal.fire({
        title: alertText,
        icon: icon,
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: "حسناً",
        showClass: {
            popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutUp"
        }
    })
};

export const addProductToWishList = async (product, token, addToWishBag) => {
        const res = await fetch(`${API_URL}/wishes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: `${product.name}`,
                price: `${product.price}`,
                image: `${product.images[0].id}`,
                slug: `${product.slug}`,
                productDetailsPage: `/${product.productDetailsPage}/${product.slug}`,
                IdProductExist: `${product.id}`,
                qty: product.qty || 1
            })
        });
        if (!res.ok) {
            return Alert("نعتذر حدث خطأ أثناء إضافة المنتج إلى قائمة المفضلة,من فضلك تأكد من أنك مسجل الدخول إلى حسابك بالفعل" , "error")
        }
        addToWishBag(product);
        return Alert("تم إضافة المنتج إلى قائمة المفضلة لديك" , "success")
};