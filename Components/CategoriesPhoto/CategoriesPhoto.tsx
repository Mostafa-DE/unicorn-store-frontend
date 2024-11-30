import styles from "@/components/CategoriesPhoto/CategoriesPhoto.module.css";
import {categories} from "./constants";
import {Card, CardActionArea, CardMedia} from "@mui/material";
import Link from "next/link";

export default function CategoriesPhoto() {
    return (
        <div data-aos="fade-in"
             data-aos-once='true'
             className={styles.main}
        >
            <div className={styles.container}>
                {
                    categories.map((category) => (
                        <Card className={styles.card} sx={{width: 400, margin: "0 0 3rem 0", cursor: "pointer", boxShadow: "none"}}>
                            <CardActionArea>
                                <Link href={category.link} style={{textDecoration: "none", color: "#333"}}>
                                    <CardMedia
                                        component="img"
                                        sx={{borderRadius: "20px"}}
                                        height="550"
                                        image={category.image}
                                        alt={category.title}
                                    />
                                </Link>
                            </CardActionArea>
                            <p className={styles.title}>
                                {category.title}
                            </p>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
}
