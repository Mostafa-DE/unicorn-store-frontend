import RegisterForm from "@/components/RegisterForm/RegisterForm";
import Layout from "@/components/Layout/Layout";
import withAuth from "@/components/HOC/withAuth";

function register() {
  return (
    <Layout title="Account__Register">
      <RegisterForm />
    </Layout>
  );
}

export default withAuth(register);
