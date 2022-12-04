import styles from "@/components/MyAccount/MyAccount.module.css";
import {useState} from "react";
import Link from "next/link";
import {getRandomQuote} from "@/components/MyAccount/helper";
import EditProfile from "@/components/EditProfileForm";
import ProfileInfo from "@/components/ProfileInfo";


export default function MyAccount({userAccount, userProfile, token}) {
    const {username} = userAccount;
    const [editMode, setEditMode] = useState(false);

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div data-aos="zoom-in"
                     data-aos-once='true'
                     className={styles.containerFirstBox}
                >
                    <div className={styles.containerText}>
                        <h3 data-aos="fade-out" data-aos-once='true'>{username} 👋 مرحباً</h3>
                        <p data-aos="fade-out" data-aos-once='true'> {getRandomQuote(username)} </p>
                    </div>

                    <div data-aos="fade-out"
                         data-aos-once='true'
                         className={styles.containerBtns}
                    >
                        <Link href="/account/dashboard-user" passHref>
                            <button className={styles.orderHistoryBtn}>سجل طلباتك</button>
                        </Link>
                        <Link href="/products/shopping-bag" passHref>
                            <button className={styles.shoppingBagBtn}>
                                حقيبة التسوق
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={styles.containerSecondBox}>
                    {editMode ?
                        <EditProfile
                            userAccount={userAccount}
                            userProfile={userProfile}
                            handleEditMode={handleEditMode}
                            token={token}
                        />
                        :
                        <ProfileInfo
                            userAccount={userAccount}
                            userProfile={userProfile}
                            handleEditMode={handleEditMode}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
