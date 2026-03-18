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
import type { RecipeKeywords } from "../data/recipes";
import { FILTER_CATEGORIES, getAllFilterOptions } from "../data/recipes";
import type { ActiveFilters } from "../types/filters";
import { EMPTY_FILTERS } from "../types/filters";

interface RecipeFilterProps {
  filters: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
}

const TIME_MARKS = [
  { value: 15, label: "15m" },
  { value: 30, label: "30m" },
  { value: 45, label: "45m" },
  { value: 60, label: "60m" },
];

const CATEGORY_COLORS: Record<keyof RecipeKeywords, string> = {
  type: "#e8907e",
  how: "#a8d5ba",
  meat: "#d4a5a5",
  dairy: "#f4d9a0",
  plants: "#b5d8b0",
};

export default function RecipeFilter({ filters, onChange }: RecipeFilterProps) {
  const options = useMemo(() => getAllFilterOptions(), []);

  const toggleKeyword = (category: keyof RecipeKeywords, value: string) => {
    const current = filters[category];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [category]: next });
  };

  const handleTimeChange = (_: unknown, value: number | number[]) => {
    onChange({ ...filters, maxTotalTime: value as number });
  };

  const activeCount =
    filters.type.length +
    filters.how.length +
    filters.meat.length +
    filters.dairy.length +
    filters.plants.length +
    (filters.maxTotalTime < 60 ? 1 : 0);

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
            <Typography fontWeight={600}>Filters</Typography>
            {activeCount > 0 && (
              <Chip
                label={activeCount}
                size="small"
                sx={{ bgcolor: "primary.main", color: "#fff", fontWeight: 700, height: 22, minWidth: 22 }}
              />
            )}
          </Stack>
        </AccordionSummary>

        <AccordionDetails sx={{ px: 3, pb: 3 }}>
          {/* Keyword categories */}
          {FILTER_CATEGORIES.map(({ key, label }) => (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 0.75, textTransform: "capitalize" }}>
                {label}
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {options[key].map((value) => {
                  const active = filters[key].includes(value);
                  return (
                    <Chip
                      key={value}
                      label={value}
                      size="small"
                      onClick={() => toggleKeyword(key, value)}
                      sx={{
                        cursor: "pointer",
                        fontWeight: active ? 600 : 400,
                        bgcolor: active ? CATEGORY_COLORS[key] : "transparent",
                        color: active ? "#fff" : "text.secondary",
                        border: `1px solid ${active ? CATEGORY_COLORS[key] : "#ddd"}`,
                        "&:hover": {
                          bgcolor: active ? CATEGORY_COLORS[key] : "rgba(0,0,0,0.04)",
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
            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
              Max Total Time
            </Typography>
            <Box sx={{ px: 1 }}>
              <Slider
                value={filters.maxTotalTime}
                onChange={handleTimeChange}
                min={10}
                max={60}
                step={5}
                marks={TIME_MARKS}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v} min`}
                sx={{
                  color: "#5b9bd5",
                  "& .MuiSlider-markLabel": { fontSize: "0.75rem" },
                }}
              />
            </Box>
          </Box>

          {/* Clear button */}
          {activeCount > 0 && (
            <Box sx={{ textAlign: "right", mt: 1 }}>
              <Button size="small" onClick={handleClear} sx={{ color: "text.secondary" }}>
                Clear all filters
              </Button>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}




