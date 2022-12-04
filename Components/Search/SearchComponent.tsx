import ProductItems from "@/components/ProductItems/ProductItems";
import Box from "@mui/material/Box";
import {useRouter} from "next/router"
import {AiOutlineLine} from "react-icons/ai";

export default function SearchComponent({products, token}) {
    const router = useRouter()

    return (
        <Box sx={{margin: "8rem 0 0 0"}}>
            <Box data-aos="fade-in"
                 data-aos-once='true'
                 className="containerTitle"
            >
                <h1 className="h1Title">نتائج البحث عن </h1>
                <h1 className="h1Title">"{router.query.term}"</h1>
                <AiOutlineLine className="lineIcon"/>
            </Box>


            <Box className="containerCardProducts">
                {products?.map((product, idx) => (
                    <ProductItems
                        key={idx}
                        product={product}
                        token={token}
                    />
                ))}
            </Box>
        </Box>
    );
}

