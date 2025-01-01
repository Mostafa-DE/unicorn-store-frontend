import {Resend} from 'resend';
import ReceiptEmail from "@/components/EmailTemplates/Receipt";
import {RESEND_EMAIL_KEY} from "@/config/index";


const sendEmail = async (req: any, res: any) => {
    if (req.method === "POST") {
        const {
            email,
            orderNumber,
            customerName,
            phone,
            city,
            address,
            building,
            orderDate,
            items,
            orderTotal,
        } = req.body;

        const resend = new Resend(RESEND_EMAIL_KEY);
        const {data, error} = await resend.emails.send({
            from: 'Unicorns Store <sales@unicorns-store.com>',
            to: [email],
            subject: `Your order has been received, Order Number: ${orderNumber}`,
            react: ReceiptEmail({
                orderNumber,
                email,
                customerName,
                phone,
                city,
                address,
                building,
                orderDate,
                items,
                orderTotal,
            })
        });

        if (error) {
            return res.status(400).json({message: "Failed to send email"});
        }

        res.status(200).json({message: "Email sent"});

    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
}

export default sendEmail;
