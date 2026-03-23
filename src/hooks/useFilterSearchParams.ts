import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ActiveFilters, FilterMode } from "../types/filters";
import { EMPTY_FILTERS, MAX_TIME_SLIDER } from "../types/filters";
import { FILTER_CATEGORIES } from "../data/recipes";
import type { RecipeKeywords } from "../data/recipes";

const FILTER_MODE_PARAM = "mode";
const MAX_TIME_PARAM = "maxTime";

function parseFiltersFromSearchParams(searchParams: URLSearchParams): ActiveFilters {
    const filters: ActiveFilters = { ...EMPTY_FILTERS };

    for (const { key } of FILTER_CATEGORIES) {
        const paramValue = searchParams.get(key);
        if (paramValue) {
            filters[key] = paramValue.split(",").filter((value) => value.length > 0);
        }
    }

    const modeParam = searchParams.get(FILTER_MODE_PARAM);
    if (modeParam === "AND" || modeParam === "OR") {
        filters.filterMode = modeParam as FilterMode;
    }

    const maxTimeParam = searchParams.get(MAX_TIME_PARAM);
    if (maxTimeParam !== null) {
        const parsedTime = Number(maxTimeParam);
        if (!Number.isNaN(parsedTime) && parsedTime > 0) {
            filters.maxTotalTime = parsedTime >= MAX_TIME_SLIDER ? Infinity : parsedTime;
        }
    }

    return filters;
}

function buildSearchParamsFromFilters(filters: ActiveFilters): URLSearchParams {
    const params = new URLSearchParams();

    for (const { key } of FILTER_CATEGORIES) {
        const values = filters[key as keyof RecipeKeywords];
        if (values.length > 0) {
            params.set(key, values.join(","));
        }
    }

    if (filters.filterMode !== EMPTY_FILTERS.filterMode) {
        params.set(FILTER_MODE_PARAM, filters.filterMode);
    }

    if (filters.maxTotalTime < Infinity) {
        params.set(MAX_TIME_PARAM, String(filters.maxTotalTime));
    }

    return params;
}

/**
 * Custom hook that synchronises ActiveFilters with URL search parameters so
 * that a filtered cookbook URL can be shared.
 */
export function useFilterSearchParams(): [ActiveFilters, (nextFilters: ActiveFilters) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(() => parseFiltersFromSearchParams(searchParams), [searchParams]);

    const setFilters = useCallback(
        (nextFilters: ActiveFilters) => {
            const nextParams = buildSearchParamsFromFilters(nextFilters);
            setSearchParams(nextParams, { replace: true });
        },
        [setSearchParams],
    );

    return [filters, setFilters];
}

