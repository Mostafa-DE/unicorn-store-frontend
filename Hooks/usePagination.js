import { useState } from "react";
import { useRouter } from "next/router"

export default function useLoginDialog() {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const handleChangePage = async (event, value) => {
        event.preventDefault();
        setPage(value);
        if(router.pathname === "/products/search"){
            return router.push(`?term=${router.query.term}&page=${value}`)
        }
        await router.push(`?page=${value}`);
    };

  return [page, handleChangePage];
}