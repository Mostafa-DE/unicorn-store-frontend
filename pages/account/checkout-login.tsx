import Layout from "@/components/Layout/Layout";
import dynamic from "next/dynamic";

const DynamicCheckoutLogin = dynamic(
    () => import("@/components/CheckoutLogin"),
    {
        loading: () => (
            <h1>Loading...</h1>
        )
    });

function loginPage() {
    return (
        <Layout title="Account_Login">
            <DynamicCheckoutLogin/>
        </Layout>
    );
}

export default loginPage;
