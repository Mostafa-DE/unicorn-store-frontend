import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";

export default function ServerUnavailable() {
    return (
        <ErrorComponent
            reaction="OOPS!"
            statusError="503 - Service Unavailable"
            ErrorMessage="The server is temporarily unavailable, Please try again later!!"
            hideBackButton={true}
        />
    );
}
