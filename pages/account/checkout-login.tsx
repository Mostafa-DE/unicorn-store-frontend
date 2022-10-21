import Layout from "@/components/Layout/Layout";
import CheckoutLoginForm from "@/components/CheckoutLogin/CheckoutLoginForm";

function loginPage() {
  return (
    <Layout title="Account_Login">
      <CheckoutLoginForm />
    </Layout>
  );
}

export default loginPage;