import { createContext, useReducer } from "react";

import ProviderPropsType from "../types/ProviderPropsType";
import FiltersStateType from "types/FiltersStateType";
import productFilterReducer from "reducers/product-filter/productFilter.reducer";

type FilterContextValueType = {
    filtersState: FiltersStateType
    dispatch: React.Dispatch<any>
    INITIAL_FILTERS_STATE: any
}

const INITIAL_FILTERS_STATE = {
    priceRange: 20000,
    outOfStock: false,
    fastDelivery: false,
    brands: [],
    categories: [],
    platforms: [],
    esrbRatings: [],
    rating: null,
    sortBy: null,
    search: null,
}

const INITAL_CONTEXT_VALUE = {
    filtersState: INITIAL_FILTERS_STATE,
    dispatch: () => { },
    INITIAL_FILTERS_STATE
}


export const FilterContext = createContext<FilterContextValueType>(INITAL_CONTEXT_VALUE)

export const FilterProvider = ({ children }: ProviderPropsType) => {
    const [filtersState, dispatch] = useReducer(productFilterReducer, INITIAL_FILTERS_STATE)

    const value = {
        filtersState,
        dispatch,
        INITIAL_FILTERS_STATE
    }
    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}