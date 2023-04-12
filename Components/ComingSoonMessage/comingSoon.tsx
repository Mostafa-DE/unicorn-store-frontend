import styles from "@/components/ErrorComponent/ErrorComponent.module.css";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ComingSoon(): JSX.Element {
    return (
        <Box margin="12rem 0">
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Typography data-aos="fade-in" data-aos-once='true' className="coming-soon-text">
                    Coming Soon...
                </Typography>
                <p data-aos="fade-in" data-aos-once="true" className={styles.explainText}>
                    Stay tuned for more from Unicorns Store 🦄
                </p>
                <Link href="/" passHref={true}>
                    <button className={styles.backBtn}>
                        Back to Home
                    </button>
                </Link>
            </Box>
        </Box>
    );
}
