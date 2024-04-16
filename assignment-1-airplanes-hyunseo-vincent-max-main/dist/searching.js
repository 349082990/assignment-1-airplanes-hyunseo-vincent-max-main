"use strict";
/**
 * Compares two strings for an exact match.
 * @param str1 The first string to compare, the prefix of what user wants to search for.
 * @param str2 The second string to compare, string from the array.
 * @returns A boolean that indicates whether the two strings are exactly the same.
 * O(n), where n is the length of the input strings --> But ignorable time in this searching process
 * Since both (str1 and str2) are the words, its length is way smaller than the length of the whole array
 * Ω(1)
 */
function compareExactMatch(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Finds the first starting index of strings in a sorted 2D array that matches with a given prefix.
 * @param arr The sorted 2D array of strings to search through.
 * @param prefix The prefix string to match against.
 * @returns The starting index of matching strings.
 * Time complexity of binary searching: O(log n)
 * Improved & fixed (from chat-gpt)
*/
function findStartingIndex(arr, prefix) {
    let start = 0;
    let end = arr.length - 1;
    let startIndex = -1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (compareExactMatch(prefix, arr[mid][0])) {
            startIndex = mid;
            end = mid - 1;
        }
        else if (prefix < arr[mid][0]) {
            end = mid - 1;
        }
        else {
            start = mid + 1;
        }
    }
    return startIndex;
}
/**
 * Finds the ending index of strings in a sorted 2D array that matches with a given prefix.
 * @param arr The sorted 2D array of strings to search through.
 * @param prefix The prefix string to match against.
 * @returns The ending index of matching strings.
 * Time complexity of binary searching: O(log n)
 * Improved & fixed (from chat-gpt)
*/
function findEndingIndex(arr, prefix) {
    let start = 0;
    let end = arr.length - 1;
    let endIndex = -1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (compareExactMatch(prefix, arr[mid][0])) {
            endIndex = mid;
            start = mid + 1;
        }
        else if (prefix < arr[mid][0]) {
            end = mid - 1;
        }
        else {
            start = mid + 1;
        }
    }
    return endIndex;
}
//# sourceMappingURL=searching.js.map