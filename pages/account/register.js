import RegisterForm from "@/components/RegisterForm";
import Layout from "@/components/Layout";
import withAuthUserExist from "@/components/HOC/withAuthUserExist";

function register() {
  return (
    <Layout title="Account__Register">
      <RegisterForm />
    </Layout>
  );
}

export default withAuthUserExist(register);
