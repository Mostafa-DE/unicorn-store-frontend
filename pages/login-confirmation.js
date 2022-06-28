import {API_URL} from "@/config/index";

export default function LoginConfirmationPage() {
    return <></>;
}

export async function getServerSideProps({req, res}) {
    const loginPath = req.url.substring(req.url.lastIndexOf("?"));
    const result = await fetch(`${API_URL}/auth/google/callback/${loginPath}`);
    const data = await result.json();
    if (result.ok) res.setHeader('set-cookie', `token=${data.jwt}`);

    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
    }
}
