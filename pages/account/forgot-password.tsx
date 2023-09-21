import Layout from "@/components/Layout/Layout";
import dynamic from "next/dynamic";

const DynamicForgotPasswordForm = dynamic(
    () => import("@/components/ForgotPasswordForm"),
    {
        loading: () => (
            <h1>Loading...</h1>
        )
    });

export default function forgotPassword() {
    return (
        <Layout title="Recover_Password">
            <DynamicForgotPasswordForm/>
        </Layout>
    );
}
