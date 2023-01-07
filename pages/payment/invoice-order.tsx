import Layout from "@/components/Layout/Layout";
import InvoiceOrder from "@/components/InvoiceOrder/InvoiceOrder";
import {parseCookies} from "@/helpers/parseCookies";

export default function invoiceOrderPage({token}) {
    return (
        <Layout title="Your_Invoice_Order">
            <InvoiceOrder token={token}/>
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
