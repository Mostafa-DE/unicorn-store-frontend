import { useState } from "react";
import { useRouter } from "next/router"

export default function useLoginDialog() {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const handleChangePage = async (event, value) => {
        event.preventDefault();
        setPage(value);
        await router.push(`?page=${value}`);
    };

  return [page, handleChangePage];
}