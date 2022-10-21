import Alert from "react-bootstrap/Alert";

export const TextAlert = (showAlert, handleShowAlert) => {
    return (
        <Alert
            style={{
                width: "100%",
                textAlign: "center",
                fontSize: "1rem",
                backgroundColor: "#fafafa"
            }}
            variant="secondary"
            dismissible
            onClose={handleShowAlert}
            show={showAlert}
        >
            Sorry 😔, The maximum quantity that can be ordered is 2.
        </Alert>
    )
}