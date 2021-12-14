import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import withAuth from "@/components/HOC/withAuth";

function loginPage() {
  return (
    <Layout title="Account_Login">
      <LoginForm />
    </Layout>
  );
}

export default withAuth(loginPage);
