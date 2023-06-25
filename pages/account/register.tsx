import Layout from "@/components/Layout/Layout";
import dynamic from "next/dynamic";

const DynamicRegisterForm = dynamic(
    () => import("@/components/RegisterForm"),
    {
        loading: () => (
            <h1>Loading...</h1>
        )
    });

function register() {
    return (
        <Layout title="Account__Register">
            <DynamicRegisterForm/>
        </Layout>
    );
}

export default register;
