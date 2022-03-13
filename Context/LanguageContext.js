import {createContext, useEffect, useState} from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("english");

    /*---------Save Product Cart in localStorage-----------*/

  // useEffect(() => {
  //   setLanguage(window.localStorage.getItem("language"));
  // }, []);
  //
  // useEffect(() => {
  //   window.localStorage.setItem("language", language);
  // }, [language]);
  //
  // /*-----------------------X----------------------------*/

  const ChangeToEnglishLanguage = () => {
    setLanguage("english");
  };

  const ChangeToArabicLanguage = () => {
    setLanguage("arabic");
  };

  return (
    <LanguageContext.Provider
      value={{ language, ChangeToEnglishLanguage, ChangeToArabicLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};