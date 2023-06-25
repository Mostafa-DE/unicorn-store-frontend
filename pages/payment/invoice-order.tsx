import Layout from "@/components/Layout/Layout";
import {parseCookies} from "@/helpers/index";
import dynamic from "next/dynamic";

const DynamicInvoiceOrder = dynamic(
    () => import("@/components/InvoiceOrder"),
    {
        loading: () => (
            <h1>Loading...</h1>
        )
    });

export default function invoiceOrderPage({token}) {
    return (
        <Layout title="Your_Invoice_Order">
            <DynamicInvoiceOrder token={token}/>
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const {token = null} = parseCookies(req);

    return {
        props: {
            token: token
        }
    };
}
