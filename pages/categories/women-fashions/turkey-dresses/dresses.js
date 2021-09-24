import { API_URL } from "@/config/index";
import useSearch from "@/Hooks/useSearch";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function dresses({ turkeyDresses }) {
  const pathname = "/categories/women-fashions/turkey-dresses";

  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout>
      <input
        style={{ margin: "10rem 0 0 0" }}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search For A Products"
      />

      <div className="containerCardProducts">
        {turkeyDresses
          .filter((products) => {
            if (searchTerm === "") {
              return products;
            } else if (
              products.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return products;
            } else if (
              products.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return products;
            }
          })
          .map((turkeyDress) => (
            <ProductItems
              key={turkeyDress.id}
              pathname={pathname}
              product={turkeyDress}
            />
          ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/turkey-dresses`);

  const turkeyDresses = await res.json();

  return {
    props: {
      turkeyDresses: turkeyDresses,
    },
  };
}
