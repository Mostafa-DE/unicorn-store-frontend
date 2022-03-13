import Layout from "@/components/Layout/Layout";
import LoginForm from "@/components/LoginForm/LoginForm";
import withAuth from "@/components/HOC/withAuth";

function loginPage() {
  return (
    <Layout title="Account_Login">
      <LoginForm />
    </Layout>
  );
}

export default withAuth(loginPage);
