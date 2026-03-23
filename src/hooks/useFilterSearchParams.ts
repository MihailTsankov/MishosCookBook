import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ActiveFilters, FilterMode } from "../types/filters";
import { EMPTY_FILTERS, MAX_TIME_SLIDER } from "../types/filters";
import { FILTER_CATEGORIES } from "../data/recipes";
import type { RecipeKeywords } from "../data/recipes";

const FILTER_MODE_PARAM = "mode";
const MAX_TIME_PARAM = "maxTime";

/**
     * Parse URL search parameters into an ActiveFilters object.
     *
     * This is a pure helper that reads the provided `URLSearchParams` and maps
     * them to the application's `ActiveFilters` shape. The function:
     * - starts from a shallow copy of `EMPTY_FILTERS` so unspecified filters keep defaults;
     * - iterates `FILTER_CATEGORIES` and reads CSV-valued parameters for each category key;
     * - validates and sets the filter mode only if it equals "AND" or "OR";
     * - parses `maxTime` and maps it to a number, mapping values >= MAX_TIME_SLIDER to Infinity.
     *
     * Behavior notes and edge cases:
     * - CSV parsing: parameter values are split on commas and empty segments are discarded.
     * - Missing parameters: any missing parameter leaves the corresponding `filters` entry at the default
     *   value from `EMPTY_FILTERS`.
     * - Invalid numeric `maxTime`: non-numeric or non-positive values are ignored.
     * - `maxTime` value equal or greater than `MAX_TIME_SLIDER` becomes `Infinity` to represent "no limit".
     *
     * @param {URLSearchParams} searchParams - The URLSearchParams object (usually from location.search)
     *   containing query parameters to convert into filter state.
     * @returns {ActiveFilters} A new ActiveFilters object populated from `searchParams`.
     *
     * @example
     * // Given URL ?cuisine=italian,greek&mode=AND&maxTime=60
     * // parseFiltersFromSearchParams(new URLSearchParams("cuisine=italian,greek&mode=AND&maxTime=60"))
     * // => { cuisine: ["italian", "greek"], filterMode: "AND", maxTotalTime: 60, ...defaults }
     */
    function parseFiltersFromSearchParams(searchParams: URLSearchParams): ActiveFilters {
        // Start from defaults so missing params preserve default values
        const filters: ActiveFilters = { ...EMPTY_FILTERS };

        // For each configured filter category, read a CSV list from the search params
        for (const { key } of FILTER_CATEGORIES) {
            const paramValue = searchParams.get(key);
            if (paramValue) {
                // Split on commas and drop any empty segments (e.g., trailing commas)
                filters[key] = paramValue.split(",").filter((value) => value.length > 0);
            }
        }

        // Normalize and validate filter mode: only accept "AND" or "OR"
        const modeParam = searchParams.get(FILTER_MODE_PARAM);
        if (modeParam === "AND" || modeParam === "OR") {
            filters.filterMode = modeParam as FilterMode;
        }

        // Parse max time; accept only positive numbers. Map large sentinel values to Infinity.
        const maxTimeParam = searchParams.get(MAX_TIME_PARAM);
        if (maxTimeParam !== null) {
            const parsedTime = Number(maxTimeParam);
            if (!Number.isNaN(parsedTime) && parsedTime > 0) {
                // If parsed time reaches or exceeds the slider's max sentinel, treat as "no limit".
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

