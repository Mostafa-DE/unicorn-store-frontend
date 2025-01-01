import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";
import {NEXT_URL} from "@/config/index";


export const ReceiptEmail = (
    {orderNumber, customerName, address, phone, building, city, email, orderDate, orderTotal, items = []}
) => (
    <Html>
        <Head/>
        <Preview>Get your order summary, estimated delivery date and more</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={track.container}>
                    <Row>
                        <Column>
                            <Text style={global.paragraphWithBold}>Tracking Number</Text>
                            <Text style={track.number}>{orderNumber}</Text>
                        </Column>
                        <Column align="right">
                            <Link href={`${NEXT_URL}/account/dashboard-user`}
                                  style={global.button}>
                                Track Package
                            </Link>
                        </Column>
                    </Row>
                </Section>
                <Hr style={global.hr}/>
                <Section style={message}>
                    <Heading style={global.heading}>
                        Your order is on its way!
                    </Heading>
                    <Text style={global.text}>
                        You order has been received and is being processed. To track your order
                        or view your order details, visit your Orders page using the button above.
                    </Text>
                    <Text style={{...global.text, marginTop: 24}}>
                        Please note that the deliver fee is included in the total amount.
                    </Text>
                </Section>
                <Hr style={global.hr}/>
                <Section style={global.defaultPadding}>
                    <Text style={adressTitle}>Shipping to: {customerName}</Text>
                    <Text style={{...global.text, fontSize: 14}}>
                        Phone: {phone} <br/>
                        Email: {email} <br/>
                        {address}, {city}, {building}
                    </Text>
                </Section>
                <Hr style={global.hr}/>
                <Section
                    style={{...paddingX, paddingTop: "40px", paddingBottom: "40px"}}
                >
                    {
                        items.map(item => (
                            <Row>
                                <Column>
                                    <Img
                                        src={item.images.length ? item.images[0].url : ""}
                                        style={{float: "left"}}
                                        width="260px"
                                    />
                                </Column>
                                <Column style={{verticalAlign: "top", paddingLeft: "12px", width: "100%"}}>
                                    <Text style={{...paragraph, fontWeight: "500"}}>
                                        {item.name}
                                    </Text>
                                    <Text style={global.text}>Size: {item.size}</Text>
                                    <Text style={global.text}>Quantity: {item.qty}</Text>
                                    <Text style={global.text}>Price: ${item.price}</Text>
                                </Column>
                            </Row>
                        ))
                    }
                </Section>
                <Hr style={global.hr}/>
                <Section style={global.defaultPadding}>
                    <Row style={{display: "inline-flex", marginBottom: 40}}>
                        <Column style={{width: "170px"}}>
                            <Text style={global.paragraphWithBold}>Order Number</Text>
                            <Text style={track.number}>{orderNumber}</Text>
                        </Column>
                        <Column style={{width: "170px"}}>
                            <Text style={global.paragraphWithBold}>Order Date</Text>
                            <Text style={track.number}>{orderDate}</Text>
                        </Column>
                        <Column>
                            <Text style={global.paragraphWithBold}>Order Total</Text>
                            <Text style={track.number}>${orderTotal}</Text>
                        </Column>
                    </Row>
                </Section>
                <Hr style={global.hr}/>
                <Section style={menu.container}>
                    <Row>
                        <Text style={menu.title}>Get Help</Text>
                    </Row>
                    <Row style={menu.content}>
                        <Column style={{width: "33%"}} colSpan={1}>
                            <Link href="https://unicorns-store.com/terms-policy/terms-conditions" style={menu.text}>
                                Terms of service
                            </Link>
                        </Column>
                        <Column style={{width: "33%"}} colSpan={1}>
                            <Link href="https://unicorns-store.com/terms-policy/privacy-policy" style={menu.text}>
                                Privacy policy
                            </Link>
                        </Column>
                        <Column style={{width: "33%"}} colSpan={1}>
                            <Link href="https://unicorns-store.com/terms-policy/sales-policy" style={menu.text}>
                                Sales Policies
                            </Link>
                        </Column>
                    </Row>
                    <Row style={{...menu.content, paddingTop: "0"}}>
                        <Column style={{width: "33%"}} colSpan={1}>
                            <Link href="https://unicorns-store.com/terms-policy/refund-policy" style={menu.text}>
                                Refund Policy
                            </Link>
                        </Column>
                        <Column style={{width: "33%"}} colSpan={2}>
                            <Link href="https://unicorns-store.com/terms-policy/cancellation-policy" style={menu.text}>
                                Cancellation Policy
                            </Link>
                        </Column>
                        <Column style={{width: "33%"}} colSpan={2}>
                            <Link href="https://unicorns-store.com/terms-policy/shipping-policy" style={menu.text}>
                                Shipping policy
                            </Link>
                        </Column>
                    </Row>
                    <Hr style={global.hr}/>
                    <Row style={menu.tel}>
                        <Column>
                            <Row>
                                <Column>
                                    <Text style={{...menu.text, marginBottom: "0"}}>
                                        Contact Us Via WhatsApp: 000000
                                    </Text>
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                </Section>
                <Hr style={global.hr}/>
                <Section style={paddingY}>
                    <Row>
                        <Text style={global.heading}>Unicorns Store (Modern Luxe)</Text>
                    </Row>
                    <Row style={categories.container}>
                        <Column align="center">
                            <Link href="https://unicorns-store.com/categories/women-fashions/midi-dresses"
                                  style={categories.text}
                            >
                                Midi Dress
                            </Link>
                        </Column>
                        <Column align="center">
                            <Link href="https://unicorns-store.com/categories/women-fashions/mini-dresses"
                                  style={categories.text}
                            >
                                Mini Dress
                            </Link>
                        </Column>
                        <Column align="center">
                            <Link href="https://unicorns-store.com/categories/women-fashions/long-dresses"
                                  style={categories.text}
                            >
                                Long Dresses
                            </Link>
                        </Column>
                        <Column align="center">
                            <Link href="https://unicorns-store.com/products" style={categories.text}>
                                And More...
                            </Link>
                        </Column>
                    </Row>
                </Section>
                <Hr style={{...global.hr, marginTop: "12px"}}/>
                <Section style={paddingY}>
                    <Row>
                        <Text style={{...footer.text, paddingTop: 30, paddingBottom: 30}}>
                            Please contact us if you have any questions. (If you reply to this
                            email, we won't be able to see it.)
                        </Text>
                    </Row>
                    <Row>
                        <Text style={footer.text}>
                            © 2025 Unicorns Store, Inc. All Rights Reserved.
                        </Text>
                    </Row>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default ReceiptEmail;

const paddingX = {
    paddingLeft: "40px",
    paddingRight: "40px",
};

const paddingY = {
    paddingTop: "22px",
    paddingBottom: "22px",
};

const paragraph = {
    margin: "0",
    lineHeight: "2",
};

const global = {
    paddingX,
    paddingY,
    defaultPadding: {
        ...paddingX,
        ...paddingY,
    },
    paragraphWithBold: {...paragraph, fontWeight: "bold"},
    heading: {
        fontSize: "32px",
        lineHeight: "1.3",
        fontWeight: "700",
        textAlign: "center",
        letterSpacing: "-1px",
    } as React.CSSProperties,
    text: {
        ...paragraph,
        color: "#747474",
        fontWeight: "500",
    },
    button: {
        border: "1px solid #929292",
        fontSize: "16px",
        textDecoration: "none",
        padding: "10px 0px",
        width: "220px",
        display: "block",
        textAlign: "center",
        fontWeight: 500,
        color: "#000",
    } as React.CSSProperties,
    hr: {
        borderColor: "#E5E5E5",
        margin: "0",
    },
};

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "10px auto",
    width: "600px",
    maxWidth: "100%",
    border: "1px solid #E5E5E5",
};

const track = {
    container: {
        padding: "22px 40px",
        backgroundColor: "#F7F7F7",
    },
    number: {
        margin: "12px 0 0 0",
        fontWeight: 500,
        lineHeight: "1.4",
        color: "#6F6F6F",
    },
};

const message = {
    padding: "40px 74px",
    textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
    ...paragraph,
    fontSize: "15px",
    fontWeight: "bold",
};

const recomendationsText = {
    margin: "0",
    fontSize: "15px",
    lineHeight: "1",
    paddingLeft: "10px",
    paddingRight: "10px",
};

const recomendations = {
    container: {
        padding: "20px 0",
    },
    product: {
        verticalAlign: "top",
        textAlign: "left" as const,
        paddingLeft: "2px",
        paddingRight: "2px",
    },
    title: {...recomendationsText, paddingTop: "12px", fontWeight: "500"},
    text: {
        ...recomendationsText,
        paddingTop: "4px",
        color: "#747474",
    },
};

const menu = {
    container: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "20px",
        backgroundColor: "#F7F7F7",
    },
    content: {
        ...paddingY,
        paddingLeft: "20px",
        paddingRight: "20px",
    },
    title: {
        paddingLeft: "20px",
        paddingRight: "20px",
        fontWeight: "bold",
    },
    text: {
        fontSize: "13.5px",
        marginTop: 0,
        fontWeight: 500,
        color: "#000",
    },
    tel: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "32px",
        paddingBottom: "22px",
    },
};

const categories = {
    container: {
        width: "370px",
        margin: "auto",
        paddingTop: "12px",
    },
    text: {
        fontWeight: "500",
        color: "#000",
    },
};

const footer = {
    policy: {
        width: "166px",
        margin: "auto",
    },
    text: {
        margin: "0",
        color: "#AFAFAF",
        fontSize: "13px",
        textAlign: "center",
    } as React.CSSProperties,
};

