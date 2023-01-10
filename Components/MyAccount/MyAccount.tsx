import styles from "@/components/MyAccount/MyAccount.module.css";
import {useState, useContext, useMemo} from "react";
import {AuthContext} from "@/context/AuthContext";
import Link from "next/link";
import {getRandomQuote} from "@/components/MyAccount/helper";
import EditProfile from "@/components/MyAccount/EditProfileForm";
import ProfileInfo from "@/components/MyAccount/ProfileInfo";


export default function MyAccount() {
    const [editMode, setEditMode] = useState(false);
    // @ts-ignore
    const {user, userProfile} = useContext(AuthContext);
    let quote = useMemo(() => getRandomQuote(user?.username), []);

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
                        <h3 data-aos="fade-out" data-aos-once='true'>{user?.username} 👋 مرحباً</h3>
                        <p data-aos="fade-out" data-aos-once='true'>{quote}</p>
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
                            user={user}
                            profile={userProfile}
                            handleEditMode={handleEditMode}
                        />
                        :
                        <ProfileInfo
                            user={user}
                            profile={userProfile}
                            handleEditMode={handleEditMode}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
