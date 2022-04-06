import styles from "@/components/Reviews/Reviews.module.css";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import {Divider, Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {useContext, useState} from "react";
import {API_URL} from "@/config/index";
import {useRouter} from "next/router";
import {AuthContext} from "@/context/AuthContext";
import {FaTrash, FaEdit} from "react-icons/fa";
import useInputField from "@/Hooks/useInputField"

export default function Reviews({product, reviews, token}) {
    const {user} = useContext(AuthContext)

    const router = useRouter()
    const collectionName = router.pathname.split("[")[0]

    const [tabs, setTabs] = useState('1');
    const handleChangeTabs = (event, newValue) => {
        setTabs(newValue);
    };

    const [editReview, setEditReview] = useState({
        id: 0,
        isEditing: false
    })
    const [textInput, handleChangeInput, reset] = useInputField("")
    const [textUpdateInput, setTextUpdateInput] = useState("")
    const handleChangeUpdateText = (evnt) => {
        setTextUpdateInput(evnt.target.value)
    }

    const reverseString = (review) => {
        return review.slice(0, 10).split("-").reverse().join("-")
    }

    const createReview = async () => {
        await fetch(`${API_URL}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                body: textInput,
                product: `${collectionName}${router.query.slug}`
            })

        })
        reset()
        await router.reload()
        await setTabs("2")
    }

    const deleteReview = async (review) => {
        await fetch(`${API_URL}/reviews/${review.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        await router.reload()
    }

    const updateReview = async (review) => {
        await fetch(`${API_URL}/reviews/${review.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                body: textUpdateInput,
                product: `${collectionName}${router.query.slug}`
            })
        })
        setEditReview({isEditing: false, id: 0})
        await router.reload()
    }

    // prevent the user from add multiple review in the same product
    const isUserAddReviewBefore = (reviews) => {
        for (let review of reviews) {
            if (review.user.username === user?.username) return true
        }
        return false
    }

    return (
        <Box sx={{width: '100%', typography: 'body1', backgroundColor: "#fafafa"}}>
            <TabContext value={tabs}>
                <Box className={styles.containerTabsHeader}
                     sx={{borderBottom: 1, borderColor: 'divider'}}
                >
                    <Tabs
                        value={tabs}
                        onChange={handleChangeTabs}
                        variant="fullWidth"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="1"
                             label="description"
                        />
                        <Tab value="2"
                             label="reviews"
                        />
                        {user && (
                            <Tab value="3"
                                 label="Add Review"
                            />
                        )}
                    </Tabs>
                </Box>
                <TabPanel value="1">
                    <Box display="flex"
                         justifyContent="center"
                    >
                        {product.description ? (
                            <p className={styles.description}>{product.description}</p>
                        ) : (
                            <p className={styles.noDescriptionText}>Sorry, there is no description to show right now 🙂</p>
                        )}

                    </Box>
                </TabPanel>

                <TabPanel value="2">
                    {reviews.length !== 0 ? (
                        <Box
                            className={styles.containerReviews}
                        >
                            {reviews?.map(review => (
                                <Box key={review.id}
                                     className={styles.containerCardReview}
                                >
                                    {user?.username === review.user.username && (
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                            sx={{margin: "0 0 1rem 0", fontSize: "1.1rem", cursor: "pointer"}}
                                        >
                                            <Box sx={{margin: "0 0 -2rem 0"}}>
                                                <FaEdit
                                                    onClick={() => {
                                                        setEditReview({isEditing: true, id: review.id})
                                                        setTextUpdateInput(review.body)
                                                    }}
                                                    className={styles.editIcon}
                                                />
                                                <FaTrash
                                                    className={styles.removeIcon}
                                                    onClick={() => deleteReview(review)}
                                                />
                                            </Box>
                                        </Box>
                                    )}
                                    <Box display="flex">
                                        <img src="/images/user.png"
                                             height={35}
                                             width={35}
                                             alt="user-logo"
                                        />
                                        <Box display="flex"
                                             flexDirection="column"
                                             sx={{margin: "0 0 0 0.4rem"}}
                                        >
                                            <span className={styles.username}>{review.user.username}</span>
                                            <span className={styles.created_at}>Created: {reverseString(review.created_at)}</span>
                                            <span className={styles.update_at}>Last Update: {reverseString(review.updated_at)}</span>
                                        </Box>
                                    </Box>
                                    <Box width="15rem"
                                         sx={{margin: "0.6rem 0 0 0"}}
                                    >
                                        {(editReview.isEditing
                                            && user.username === review.user.username
                                            && editReview.id === review.id) ? (
                                            <Box>
                                            <textarea
                                                cols={80}
                                                rows={8}
                                                style={{padding: "0.2rem 1rem"}}
                                                maxLength={200}
                                                value={textUpdateInput}
                                                onChange={handleChangeUpdateText}
                                                className={styles.textArea}
                                            />
                                                <Box display="flex"
                                                     justifyContent="center"
                                                >
                                                    <button
                                                        className={styles.cancelBtn}
                                                        onClick={() => setEditReview({isEditing: false, id: 0})}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className={styles.editBtn}
                                                        onClick={() => updateReview(review)}
                                                    >Edit
                                                    </button>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <span className={styles.bodyReviewText}>{review.body}</span>
                                        )}
                                    </Box>
                                    <Divider className={styles.divider}/>
                                </Box>
                            ))}

                        </Box>
                    ) : (
                        <p className={styles.noReviewsText}>There are no reviews to show for now 😞</p>)}

                </TabPanel>

                <TabPanel value="3">
                    <Box display="flex"
                         justifyContent="center"
                    >
                        {!isUserAddReviewBefore(reviews) ? (
                            <Box display="flex"
                                 flexDirection="column"
                                 alignItems="center"
                            >
                            <textarea
                                cols={80}
                                rows={4}
                                maxLength={200}
                                value={textInput}
                                onChange={handleChangeInput}
                                className={styles.textArea}
                                placeholder="أضف مراجعتك هنا"
                            />
                                <button
                                    className={styles.submitBtn}
                                    onClick={() => createReview()}
                                >
                                    أضف اﻵن
                                </button>
                            </Box>
                        ) : (
                            <p className={styles.userAlreadyAddedReviewText}>Sorry you already added a review on this product 😉</p>)}

                    </Box>
                </TabPanel>
            </TabContext>
        </Box>
    );
}