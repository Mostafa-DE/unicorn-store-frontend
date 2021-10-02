import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import CategoriesPhoto from "@/components/CategoriesPhoto";

export default function Home() {
  return (
    <Layout title="Unicorn Store | Shop Online For Fastions, Tools, Gifts & More">
      <CategoriesPhoto />
    </Layout>
  );
}
