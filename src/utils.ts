// @ts-ignore
import curry from "curry";

type Dict = {
  [propName: string]: any;
};


/**
 * Checks if a key in a object contains the searchterm
 * @param item Object to be searched 
 * @param key Key to be searched for 
 * @param searchTerm Searchmterm
 */
export const keyMatcher = curry((key: string,  searchTerm: string, item: Dict) : boolean => {
    const value = item[key];
    if (!value) {
        return false
    }
    return (typeof value === 'string' && value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
});


/**
 * Helper function for searching array of object
 * Searches an array of objects and return objects that contain values matching the search term.
 * 
 * @param Arr Array of objects to be searched
 * @param matchers functions determine if a object should be filtered or not
 * @returns Array of objects
 */
export const searchObjects = (Arr: Array<Dict>, matchers:Array<Function>) : Array<Dict> => {
    return Arr.filter(item => {
        return matchers.find(matcher => matcher(item));
    });
}   

