import styles from "@/components/Header/Header.module.css";
import PopOver from "@/components/PopOver";
import {MdLanguage} from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {useContext} from "react";
import {LanguageContext} from "@/context/LanguageContext";

export default function DropdownLnguage({handleClickLanguage, anchorEl, open, handleCloseLanguage}) {
    const {ChangeLanguageToEnglish, ChangeLanguageToArabic} = useContext(LanguageContext)

    return (
        <div>
            <PopOver
                text="Language"
                icon={
                    <MdLanguage
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickLanguage}
                        className={styles.languageIcon}
                    />
                }
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseLanguage}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={() => {
                    ChangeLanguageToArabic()
                    handleCloseLanguage()
                }}
                >
                    عربي
                </MenuItem>
                <MenuItem onClick={() => {
                    ChangeLanguageToEnglish()
                    handleCloseLanguage()
                }}
                >
                    English
                </MenuItem>
            </Menu>
        </div>
    )
}