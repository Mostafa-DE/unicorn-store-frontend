import {createContext, useEffect, useState} from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState("arabic");

    /*---------Save Product Cart in localStorage-----------*/

    useEffect(() => {
        if (window.localStorage.getItem("language") !== null) {
            setLanguage(window.localStorage.getItem("language"));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("language", language);
    }, [language]);

    // /*-----------------------X----------------------------*/

    const ChangeLanguageToEnglish = () => {
        setLanguage("english");
    };

    const ChangeLanguageToArabic = () => {
        setLanguage("arabic");
    };

    return (
        <LanguageContext.Provider
            value={{language, ChangeLanguageToEnglish, ChangeLanguageToArabic}}
        >
            {children}
        </LanguageContext.Provider>
    );
};