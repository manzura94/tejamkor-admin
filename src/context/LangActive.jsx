import React, { useContext } from "react"
import { LanguageContext } from "./LanguageContext"


export const LangActive = () => {
    const { language } = useContext(LanguageContext)
    return language === "uz"
}
