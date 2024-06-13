const PREFERENCES = 'preferences';

export const PAGE_TABLE = "page";


export const getPreferencesUrlToStorage = (resourceUrl = "") => {
    return `${PREFERENCES}_${resourceUrl}`;
};

export const preferencesToStorage = {
    PAGE_TABLE
};