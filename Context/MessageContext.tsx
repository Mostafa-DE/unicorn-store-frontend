import {createContext, useState} from "react";

interface IMessage {
    text: string;
    severity: "success" | "error" | "info" | "warning";
    autoHideDuration?: number;
}

interface IMessageContext {
    growl: (message: IMessage) => void;
    message: IMessage;
    closeGrowl: () => void;
}


export const MessageContext = createContext<IMessageContext>(null);

export const MessageProvider = ({children}) => {
    const [message, setMessage] = useState<IMessage | null>(null);

    const growl = (message: IMessage) => {
        setMessage(message);
    };

    const closeGrowl = () => {
        setMessage(null);
    }

    return (
        <MessageContext.Provider value={{growl, message, closeGrowl}}>
            {children}
        </MessageContext.Provider>
    );
};
