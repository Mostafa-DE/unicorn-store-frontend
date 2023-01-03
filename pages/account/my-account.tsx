import Layout from "@/components/Layout/Layout";
import MyAccount from "@/components/MyAccount/MyAccount";
// import {parseCookies} from "@/helpers/index";
// import {API_URL} from "@/config/index";

export default function myAccount() {
    return (
        <Layout title="Your_Account_Details">
            <MyAccount/>
        </Layout>
    );
}

// export async function getServerSideProps({req}) {
//     // const {user, token} = parseCookies(req);
//     // const userAccount = JSON.parse(user)
//     // const res = await fetch(`${API_URL}/profiles/me`, {
//     //     method: "GET",
//     //     headers: {
//     //         "Content-Type": "application/json",
//     //         "Authorization": `Bearer ${token}`
//     //     }
//     // });
//     // const userProfile = await res.json();
//
//     return {
//         props: {
//             // userAccount,
//             // userProfile: userProfile,
//             // token
//         }
//     };
// }
