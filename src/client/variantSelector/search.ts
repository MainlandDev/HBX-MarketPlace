/** Whether a colour label matches the search box: every word of the query must appear in the label, in any order, ignoring case. */
export const matchesQuery = (label: string, query: string): boolean => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const haystack = label.toLowerCase();
    return words.every((word) => haystack.includes(word));
};
