import { useMemo } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Slider,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTranslation } from "react-i18next";
import type { RecipeKeywords } from "../data/recipes";
import { FILTER_CATEGORIES, getAllFilterOptions } from "../data/recipes";
import type { ActiveFilters } from "../types/filters";
import { EMPTY_FILTERS, MAX_TIME_SLIDER } from "../types/filters";

interface RecipeFilterProps {
    filters: ActiveFilters;
    onChange: (filters: ActiveFilters) => void;
}

const CATEGORY_COLORS: Record<keyof RecipeKeywords, string> = {
    type: "#e8907e",
    how: "#a8d5ba",
    diet: "#c3aed6",
    meat: "#d4a5a5",
    dairy: "#f4d9a0",
    plants: "#b5d8b0",
};

export default function RecipeFilter({ filters, onChange }: RecipeFilterProps) {
    const { t } = useTranslation();
    const options = useMemo(() => getAllFilterOptions(), []);

    const timeMarks = useMemo(
        () => [
            { value: 30, label: t("filter.timeMark30") },
            { value: 60, label: t("filter.timeMark60") },
            { value: 90, label: t("filter.timeMark90") },
            { value: 120, label: t("filter.timeMark120") },
            { value: 150, label: t("filter.timeMark150") },
            { value: MAX_TIME_SLIDER, label: t("filter.timeMarkMax") },
        ],
        [t],
    );

    const toggleKeyword = (category: keyof RecipeKeywords, value: string) => {
        const current = filters[category];
        const next = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        onChange({ ...filters, [category]: next });
    };

    const handleTimeChange = (_: unknown, value: number | number[]) => {
        const v = value as number;
        onChange({ ...filters, maxTotalTime: v >= MAX_TIME_SLIDER ? Infinity : v });
    };

    const activeCount =
        filters.type.length +
        filters.how.length +
        filters.meat.length +
        filters.dairy.length +
        filters.plants.length +
        (filters.maxTotalTime < Infinity ? 1 : 0);

    const handleClear = () => {
        onChange({ ...EMPTY_FILTERS });
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Accordion
                disableGutters
                elevation={0}
                sx={{
                    bgcolor: "background.paper",
                    borderRadius: 4,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    "&::before": { display: "none" },
                    overflow: "hidden",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ px: 3, py: 1 }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <FilterListIcon sx={{ color: "primary.main" }} />
                        <Typography fontWeight={600}>{t("filter.title")}</Typography>
                        {activeCount > 0 && (
                            <Chip
                                label={activeCount}
                                size="small"
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "#fff",
                                    fontWeight: 700,
                                    height: 22,
                                    minWidth: 22,
                                }}
                            />
                        )}
                    </Stack>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    {/* Keyword categories */}
                    {FILTER_CATEGORIES.map(({ key }) => (
                        <Box key={key} sx={{ mb: 2 }}>
                            <Typography
                                variant="body2"
                                fontWeight={600}
                                sx={{ mb: 0.75, textTransform: "capitalize" }}
                            >
                                {t(`filter.categories.${key}`)}
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                flexWrap="wrap"
                                useFlexGap
                            >
                                {options[key].map((value) => {
                                    const active = filters[key].includes(value);
                                    return (
                                        <Chip
                                            key={value}
                                            label={value}
                                            size="small"
                                            onClick={() =>
                                                toggleKeyword(key, value)
                                            }
                                            sx={{
                                                cursor: "pointer",
                                                fontWeight: active ? 600 : 400,
                                                bgcolor: active
                                                    ? CATEGORY_COLORS[key]
                                                    : "transparent",
                                                color: active
                                                    ? "#fff"
                                                    : "text.secondary",
                                                border: `1px solid ${active ? CATEGORY_COLORS[key] : "#ddd"}`,
                                                "&:hover": {
                                                    bgcolor: active
                                                        ? CATEGORY_COLORS[key]
                                                        : "rgba(0,0,0,0.04)",
                                                },
                                            }}
                                        />
                                    );
                                })}
                            </Stack>
                        </Box>
                    ))}

                    {/* Time slider */}
                    <Box sx={{ mb: 1 }}>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{ mb: 0.5 }}
                        >
                            {t("filter.maxTime")}
                        </Typography>
                        <Box sx={{ px: 1 }}>
                            <Slider
                                value={filters.maxTotalTime === Infinity ? MAX_TIME_SLIDER : filters.maxTotalTime}
                                onChange={handleTimeChange}
                                min={10}
                                max={MAX_TIME_SLIDER}
                                step={5}
                                marks={timeMarks}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(v) =>
                                    v >= MAX_TIME_SLIDER
                                        ? t("filter.noLimit")
                                        : t("filter.minutesShort", { count: v })
                                }
                                sx={{
                                    color: "#5b9bd5",
                                    "& .MuiSlider-markLabel": {
                                        fontSize: "0.75rem",
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Clear button */}
                    {activeCount > 0 && (
                        <Box sx={{ textAlign: "right", mt: 1 }}>
                            <Button
                                size="small"
                                onClick={handleClear}
                                sx={{ color: "text.secondary" }}
                            >
                                {t("filter.clearAll")}
                            </Button>
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
