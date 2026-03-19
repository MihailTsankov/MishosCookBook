import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const LANGUAGES = [
    { code: "bg", label: "БГ" },
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const handleChange = (
        _mouseEvent: React.MouseEvent<HTMLElement>,
        lang: string | null,
    ) => {
        if (lang) {
            i18n.changeLanguage(lang);
            document.documentElement.lang = lang;
        }
    };

    return (
        <ToggleButtonGroup
            value={i18n.language}
            exclusive
            onChange={handleChange}
            size="small"
            sx={{
                "& .MuiToggleButton-root": {
                    px: 1.5,
                    py: 0.25,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    borderColor: "#ddd",
                    color: "text.secondary",
                    "&.Mui-selected": {
                        bgcolor: "primary.main",
                        color: "#fff",
                        "&:hover": { bgcolor: "primary.dark" },
                    },
                },
            }}
        >
            {LANGUAGES.map(({ code, label }) => (
                <ToggleButton key={code} value={code}>
                    {label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

