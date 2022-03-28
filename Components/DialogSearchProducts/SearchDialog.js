import styles from "@/components/DialogSearchProducts/SearchDialog.module.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {AiOutlineLine} from "react-icons/ai";
import {VscClose} from "react-icons/vsc";
import {useRouter} from "next/router";
import useInputField from "@/Hooks/useInputField"

export default function DialogShoppingBag({searchDialog, closeSearchDialog}) {
    const router = useRouter();
    const [value, handleChange, reset] = useInputField("")

    const handleSubmit = async () => {
        await router.push(`/products/search?term=${value}`)
        reset()
    }

    return (
        <div>
            <Dialog
                open={searchDialog}
                onClose={closeSearchDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div data-aos="fade-in"
                         className={styles.containerTitle}
                    >
                        <p className={styles.titleShoppingBag}> أخبرنا مالذي تبحث عنه ؟؟ </p>
                        <AiOutlineLine className={styles.lineIcon}/>
                    </div>
                    <div className={styles.closeIcon}>
                        <VscClose onClick={closeSearchDialog}/>
                    </div>
                </DialogTitle>
                <DialogContent sx={{width: "25rem", height: "7rem"}}>
                    <div className={styles.main}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            value={value}
                            onChange={handleChange}
                            placeholder="😉 إبحث هنا"
                        />
                        <button onClick={() => handleSubmit() && closeSearchDialog() } className={styles.searchBtn}>بحث</button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
