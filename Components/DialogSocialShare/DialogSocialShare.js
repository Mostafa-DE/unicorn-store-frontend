import styles from "@/components/DialogSocialShare/DialogSocialShare.module.css";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {AiOutlineLine} from "react-icons/ai";
import {VscClose} from "react-icons/vsc";
import {FiFacebook} from "react-icons/fi"
import {ImWhatsapp} from "react-icons/im"
import {SiGmail} from "react-icons/si"
import {FaTwitter, FaTelegramPlane} from "react-icons/fa"
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {NEXT_URL} from "@/config/index";


export default function DialogShoppingBag({shareDialog, closeShareDialog, product}) {
    return (
        <div>
            <Dialog
                open={shareDialog}
                onClose={closeShareDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div data-aos="fade-in"
                         className={styles.containerTitle}
                    >
                        <p className={styles.titleShoppingBag}> شارك المنتج عبر </p>
                        <AiOutlineLine className={styles.lineIcon}/>
                    </div>
                    <div className={styles.closeIcon}>
                        <VscClose onClick={closeShareDialog}/>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={styles.containerIcons}>
                        <FacebookShareButton
                            url={`${NEXT_URL}/${product.productDetailsPage}/${product.slug}`}
                            quote="Unicorns Store"
                            hashtag={"#Unicorns_Store"}
                        >
                            <div className={styles.containerFacebook}>
                                <FiFacebook className={styles.facebookIcon}/>
                            </div>
                        </FacebookShareButton>
                        <WhatsappShareButton url={`${NEXT_URL}/${product.productDetailsPage}/${product.slug}`}>
                            <div className={styles.containerWhatsaap}>
                                <ImWhatsapp className={styles.whatsappIcon}/>
                            </div>
                        </WhatsappShareButton>
                        <EmailShareButton url={`${NEXT_URL}/${product.productDetailsPage}/${product.slug}`}>
                            <div className={styles.containerEmail}>
                                <SiGmail className={styles.emailIcon}/>
                            </div>
                        </EmailShareButton>
                        <TelegramShareButton url={`${NEXT_URL}/${product.productDetailsPage}/${product.slug}`}>
                            <div className={styles.containerTelegram}>
                                <FaTelegramPlane className={styles.telegramIcon}/>
                            </div>
                        </TelegramShareButton>
                        <TwitterShareButton url={`${NEXT_URL}/${product.productDetailsPage}/${product.slug}`}>
                            <div className={styles.containerTwitter}>
                                <FaTwitter className={styles.twitterIcon}/>
                            </div>
                        </TwitterShareButton>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
