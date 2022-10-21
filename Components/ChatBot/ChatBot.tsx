import ChatBot from "react-simple-chatbot";
import {useState} from "react";
import {ThemeProvider} from "styled-components";
import HeaderChatBot from "./HeaderChatBot";

const theme = {
    background: "#fff",
    fontFamily: `"Tajawal", sans-serif`,
    headerBgColor: "#fb9aa7",
    headerFontColor: "#fff",
    headerFontSize: "22px",
    botBubbleColor: "#fafafa",
    botFontColor: "#333",
    userBubbleColor: "#fafafa",
    userFontColor: "#333",
};

export default function ChatBotComponent({userAccount}) {
    const [opened, setOpened] = useState(false);
    const toggleFloating = () => {
        setOpened(!opened);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <ChatBot
                    headerComponent={
                        <HeaderChatBot
                            userAccount={userAccount}
                            toggleFloating={toggleFloating}
                        />
                    }
                    botAvatar="/images/avatar.svg"
                    floatingIcon={
                        <img
                            src="/images/avatar.svg"
                            width={45}
                            height={45}
                            alt="chatBot-img"
                        />
                    }
                    floatingStyle={{bottom: "5.2rem", right: "1.9rem"}}
                    botDelay={2000}
                    placeholder="...أدخل رسالتك هنا"
                    recognitionLang="ar"
                    hideUserAvatar={true}
                    floating={true}
                    opened={opened}
                    toggleFloating={toggleFloating}
                    steps={[
                        {
                            id: "1",
                            message: "مرحباً, أنا هنا للمساعدة أخبرني  كيف أستطيع مساعدتك ؟؟",
                            trigger: "2"
                        },
                        {
                            id: "2",
                            options: [
                                {
                                    value: 1,
                                    label: "بحاجة إلى رقم هاتف للتواصل",
                                    trigger: "3"
                                },
                                {
                                    value: 2,
                                    label: "هل أستطيع التحدث مع أحد الموظفين المتاحين ؟؟",
                                    trigger: "8"
                                },
                                {value: 3, label: "أين موقعكم ؟؟", trigger: "9"},
                                {
                                    value: 4,
                                    label: "ماهي سياسة المعاينة لديكم ؟؟",
                                    trigger: "10"
                                },
                                {
                                    value: 5,
                                    label: "هل تتوفر لديكم خدمة قياس الملابس قبل الدفع ؟؟",
                                    trigger: "11"
                                },
                                {
                                    value: 6,
                                    label: "ماهي كلفة أجور التوصيل ؟؟",
                                    trigger: "12"
                                },
                                {
                                    value: 7,
                                    label: "ماهي  المدة الزمنية التي يستغرقها التوصيل ؟؟",
                                    trigger: "13"
                                }
                            ]
                        },
                        {
                            id: "3",
                            message: "رائع, نحن بانتظار اتصالك على الرقم التالي 0787834878",
                            trigger: "4"
                        },
                        {
                            id: "4",
                            message: "هل تحتاج إلى شيء آخر ؟؟",
                            trigger: "5"
                        },
                        {
                            id: "5",
                            options: [
                                {value: 2, label: "نعم", trigger: "2"},
                                {value: 3, label: "لا, شكراً", trigger: "6"}
                            ]
                        },
                        {
                            id: "6",
                            message:
                                "شكراً لك لزيارتك متجرنا, في حال أردت شيء آخر في المستقبل أعلمني به من خلال إرسال أي رسالة",
                            trigger: "7"
                        },
                        {
                            id: "7",
                            user: true,
                            trigger: "1"
                        },
                        {
                            id: "8",
                            message:
                                "تم إرسال طلبك وسيتم الرد عليك بأسرع وقت ممكن في حال التأخر في الرد يرجى التواصل معنا عبر  وسائل التواصل الأخرى المتاحة",
                            trigger: "4"
                        },
                        {
                            id: "9",
                            message:
                                "يرجى العلم أننا حالياً فقط أون لاين مع العلم أن خدمة التوصيل متوفرة إلى جميع أنحاء المملكة",
                            trigger: "4"
                        },
                        {
                            id: "10",
                            message:
                                "يرجى العلم أن أي طلب مرسل إليك تستطيع معاينته والتأكد من تطابق المنتج, في حال كان هنالك أي خطأ تستطيع إرجاع الطلب دون ترتب أي مبالغ عليك",
                            trigger: "4"
                        },
                        {
                            id: "11",
                            message:
                                "بالطبع تتوفر لدينا خدمة القياس قبل الدفع, عند وصول المندوب  تستطيع الطلب منه الإنتظار لمدة قليلة دون الدفع  ثم تقوم بقياس المنتج , في حال كان القياس غير مناسب تقوم بإرجاع الطلب إلى المندوب مع دفع قيمة أجور التوصيل فقط",
                            trigger: "4"
                        },
                        {
                            id: "12",
                            message:
                                "يرجى العلم أن أجور التوصيل هي 3 دنانير داخل عمان والزرقاء و 5 دنانير لباقي المحافظات",
                            trigger: "4"
                        },
                        {
                            id: "13",
                            message:
                                "يرجى العلم أن التوصيل يحتاج لفترة عمل تتراوح مابين 24 - 48 ساعة تقريبا, حيث في حال حدث أي تأخير سيتم إعلام حضرتك بذلك مباشرة",
                            trigger: "4"
                        }
                    ]}
                />
            </ThemeProvider>
        </div>
    );
}
