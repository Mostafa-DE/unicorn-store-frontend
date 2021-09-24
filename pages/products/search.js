import styles from "@/styles/Search.module.css";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
// import { AiOutlineLine } from "react-icons/ai";
import Layout from "@/components/Layout";
import Link from "next/link";
import ProductItems from "@/components/ProductItems";
import qs from "qs";

export default function productsList({ products }) {
  const router = useRouter();
  return (
    <Layout>
      {/*--Check if there are a products to show--*/}
      <h1>Results for "{router.query.term}"</h1>
      {products.length === 0 ? (
        <div className={styles.containerNotFound}>
          <h1 className={styles.h1NotFound}> Nothing Here </h1>
          <p className={styles.pText}>
            We Couldn't find any products We are sorry
          </p>
          <Link href="/products/products-list" passHref={true}>
            <button className={styles.backBtn}> return now </button>
          </Link>
        </div>
      ) : (
        <div className={styles.cardsProductsList}>
          {products.map((product) => (
            <ProductItems key={product.id} product={product} />
          ))}
        </div>
      )}
      {/*--------------------X--------------------*/}
    </Layout>
  );
}

// export async function getServerSideProps({ query: { term } }) {
//   const query = qs.stringify({
//     _where: {
//       _or: [{ name_contains: term }, { description_contains: term }],
//     },
//   });
//   const res = await fetch(`${API_URL}/turkey-dresses?${query}`);
//   const products = await res.json();
//   return {
//     props: {
//       products,
//     },
//   };
// }
// /*--------------------------------X-----------------------------*/
