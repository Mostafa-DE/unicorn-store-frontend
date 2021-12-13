import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import withAuthUserExist from "@/components/HOC/withAuthUserExist";

function loginPage() {
  return (
    <Layout title="Account_Login">
      <LoginForm />
    </Layout>
  );
}

export default withAuthUserExist(loginPage);
