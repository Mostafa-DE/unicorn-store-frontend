import Layout from "@/components/Layout/Layout";
import CheckoutLoginForm from "@/components/CheckoutLogin/CheckoutLoginForm";
import withAuth from "@/components/HOC/withAuth";

function loginPage() {
  return (
    <Layout title="Account_Login">
      <CheckoutLoginForm />
    </Layout>
  );
}

export default withAuth(loginPage);