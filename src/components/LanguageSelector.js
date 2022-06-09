import { useTranslation } from "react-i18next";
import trFlag from "../assets/tr.png";
import enFlag from "../assets/en.png";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    return (
        <div>
            <img src={trFlag} alt="Turkish Flag" title="Türkçe" width="24" height="24" onClick={() => i18n.changeLanguage("tr")} /> {' '}
            <img src={enFlag} alt="Great Britian Flag" title="English" width="24" height="24" onClick={() => i18n.changeLanguage("en")} />
        </div>
    );
};

export default LanguageSelector;