//Don't remove this
interface Data {
  continent: string[];
  ident: string[];
  iso_country: string[];
  iso_region: string[];
  latitude_deg: number[];
  longitude_deg: number[];
  name: string[];
  type: string[];
}

const data: Data = loadJSON("../DO_NOT_TOUCH/data.json") as Data; //Don't delete this line. All your data is here. It does take a few seconds for Replit to load the data because it's so large.

//This below just shows you how to access the data. You can remove these.
console.log(data);
console.log(data.ident);

/** Sorted ascending order of 'ident' data along with their corresponding indices. */
const IDENT_ORDER: string[][] = mergeSort(
  copyArrayWithIndex(data.ident, false),
  0
);

const LENGTH: number = data.continent.length;
const ITEMS_PER_PAGE = 5;

let countryOrder: string[][] = [];
let nameOrder: string[][] = [];
let typeOrder: string[][] = [];
let displayArr: any[][] = [];
let displayStartIndex: number = 0;
let displayEndIndex: number = LENGTH - 1;
let currentPage: number = 1;
let totalPages: number = Math.ceil(LENGTH / ITEMS_PER_PAGE);

/** Get HTML elements for various functionalities */
const SEARCH_TIME = document.getElementById(
  "searchTime"
) as HTMLParagraphElement;
const CONTINENT_TABLE = document.getElementById(
  "continentTable"
) as HTMLTableSectionElement;
const PREV_BTN = document.getElementById("prevBtn") as HTMLButtonElement;
const NEXT_BTN = document.getElementById("nextBtn") as HTMLButtonElement;
const SEARCH_BTN = document.getElementById("searchBtn") as HTMLButtonElement;
const GO_FIRST_PAGE = document.getElementById(
  "goToFirstPage"
) as HTMLButtonElement;
const SECOND_PREV_BTN = document.getElementById(
  "secondPrevBtn"
) as HTMLButtonElement;
const SECOND_NEXT_BTN = document.getElementById(
  "secondNextBtn"
) as HTMLButtonElement;
const SECOND_PAGE_SORT = document.getElementById(
  "secondPageSort"
) as HTMLButtonElement;
const SECOND_PAGE_INPUT = document.getElementById(
  "secondPageInput"
) as HTMLInputElement;
const SORTING_SELECT = document.getElementById(
  "sortSelect"
) as HTMLSelectElement;
const SORTING_TYPE = document.getElementById(
  "sortingType"
) as HTMLSelectElement;
const SORTING_TIME = document.getElementById(
  "sortingTime"
) as HTMLParagraphElement;
const CURRENT_PAGE_ELEMENT = document.getElementById(
  "currentPage"
) as HTMLSpanElement;
const PAGE_INPUT = document.getElementById("pageInput") as HTMLInputElement;
const SEARCH_INPUT = document.getElementById("searchInput") as HTMLInputElement;
const GO_SORTING_PAGE_BTN = document.getElementById(
  "sortingPageBtn"
) as HTMLButtonElement;
const SEARCH_SELECT = document.getElementById(
  "searchSelect"
) as HTMLSelectElement;

/** Initialize the page when the first page is loaded */
function startSetUp(): void {
  let begin = performance.now();
  displayArr = copyArrayWithIndex(data.ident, false);
  basicSetUp();
  sorting();
  updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
  tables(displayArr, displayStartIndex, displayEndIndex, currentPage);
  btnSetUp();
  console.log(performance.now() - begin);
}

/** Initialize the page when the second page is loaded */
function secondPageSetUp(): void {
  displayArr = copyArrayWithIndex(data.ident, false);
  secondBtnSetUp();
  basicSetUp();
  bIIISetUp();
  bIVSetUp();
}

/** Set up basic variables when any page is loaded */
function basicSetUp(): void {
  currentPage = 1;
  displayStartIndex = 0;
  displayEndIndex = LENGTH - 1;
}

// Function to copy array with index
/**
 * @param sortBy base array, an array will be sorted by based on this param
 * @param bonus using for bonus or not, for bonus, cannot use first option when copying the data.ident
 * @returns copy of an array, but has an extra demension to store its corresponding index
 */
function copyArrayWithIndex(sortBy: any[], bonus: boolean): any[][] {
  let arrayCopy: any[][] = [];
  if (sortBy === data.ident && bonus == false) {
    for (let i = 0; i < sortBy.length; i++) {
      arrayCopy[i] = [sortBy[i].toString(), i];
    }
  } else {
    for (let i = 0; i < LENGTH; i++) {
      const INDEX: number = Number(IDENT_ORDER[i][1]);
      if (sortBy === data.ident) {
        arrayCopy[i] = [sortBy[INDEX].toString(), i];
      } else {
        arrayCopy[i] = [sortBy[INDEX], i];
      }
    }
  }
  return arrayCopy;
}

/** Update current page display */
function updateCurrentPageDisplay(starting: number, ending: number): void {
  totalPages = Math.ceil((ending - starting + 1) / ITEMS_PER_PAGE);
  CURRENT_PAGE_ELEMENT.textContent = `Page: ${currentPage} / ` + totalPages;
}

/**
 * Render table rows based on the inputs
 * @param arr displayArr, display table based on the index from this input array
 * @param start starting index number of the given displayArr
 * @param end ending index number of the given displayArr
 * @param pageNumber page number to start display from the given page number
 * @param baseArr If the input is void, (not data.ident), Display the results alphabetically (or descending) via their IDs
 */
function tables(
  arr: any[][],
  start: number,
  end: number,
  pageNumber: number,
  baseArr: string[] | void
): void {
  CONTINENT_TABLE.innerHTML = "";
  let Tprint = performance.now();
  const START_INDEX: number = (pageNumber - 1) * ITEMS_PER_PAGE + start;
  const END_INDEX: number = START_INDEX + ITEMS_PER_PAGE;
  let finalIndex: number = 0;

  for (let i = START_INDEX; i < END_INDEX && i <= end; i++) {
    if (baseArr !== data.ident) {
      let index: number = Number(arr[i][1]);
      finalIndex = Number(IDENT_ORDER[index][1]);
    } else {
      finalIndex = Number(arr[i][1]);
    }
    console.log(finalIndex);
    const ROW = CONTINENT_TABLE.insertRow();
    ROW.insertCell().innerHTML = data.continent[finalIndex];
    ROW.insertCell().innerHTML = data.ident[finalIndex];
    ROW.insertCell().innerHTML = data.iso_country[finalIndex];
    ROW.insertCell().innerHTML = data.iso_region[finalIndex];
    ROW.insertCell().innerHTML = data.latitude_deg[finalIndex].toString();
    ROW.insertCell().innerHTML = data.longitude_deg[finalIndex].toString();
    ROW.insertCell().innerHTML = data.name[finalIndex];
    ROW.insertCell().innerHTML = data.type[finalIndex];
  }
  let printT = performance.now();
  console.log(printT - Tprint);
}

/**
 * Copy each array along with their corresponding indices.
 * Sorted ascending based on their data, if data is the same, compare their indices
 * Searching will be performed using these arrays
 */
function sorting(): void {
  countryOrder = mergeSort(copyArrayWithIndex(data.iso_country, false), 0);
  nameOrder = mergeSort(copyArrayWithIndex(data.name, false), 0);
  typeOrder = mergeSort(copyArrayWithIndex(data.type, false), 0);
}

/** determine the searching opion, based on the html selctions, return the matching sorted array */
function checkSearchOption(): string[][] {
  const SEARCH_BY = SEARCH_SELECT.selectedIndex;
  const SEARCH_ARRAYS = [IDENT_ORDER, countryOrder, nameOrder, typeOrder];
  return SEARCH_ARRAYS[SEARCH_BY];
}

/**
 * get starting and ending indices and display all indices between them
 * @param arr array to search through its data, arr = [data][indices]
 */
function search(arr: string[][]): void {
  currentPage = 1;
  let searchingFor = SEARCH_INPUT.value;
  let searchingTime1 = performance.now();
  displayStartIndex = findStartingIndex(arr, searchingFor);
  console.log(displayStartIndex);
  displayEndIndex = findEndingIndex(arr, searchingFor);
  console.log(displayEndIndex);
  let searchT = performance.now() - searchingTime1;
  SEARCH_TIME.innerHTML = "Searching Time: " + searchT;
  displayArr = arr;

  if (arr === IDENT_ORDER) {
    updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
    tables(
      displayArr,
      displayStartIndex,
      displayEndIndex,
      currentPage,
      data.ident
    );
  } else {
    updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
    tables(displayArr, displayStartIndex, displayEndIndex, currentPage);
  }
}

/** Based on the current sorting html selections, display the corresponding sorted array */
function checkSortingOption(): void {
  let time1 = performance.now();
  currentPage = 1;

  const CHOOSE_ARR: any[][] = [
    data.continent,
    data.ident,
    data.iso_country,
    data.iso_region,
    data.latitude_deg,
    data.longitude_deg,
    data.name,
    data.type,
  ];

  displayArr = copyArrayWithIndex(
    CHOOSE_ARR[SORTING_SELECT.selectedIndex],
    false
  );
  displayArr = mergeSort(displayArr, SORTING_TYPE.selectedIndex);
  console.log(displayArr);
  let sortingT: number = performance.now() - time1;
  console.log(sortingT);
  SORTING_TIME.innerHTML = "Sorting Time: " + sortingT;
  tables(
    displayArr,
    displayStartIndex,
    displayEndIndex,
    currentPage,
    CHOOSE_ARR[SORTING_SELECT.selectedIndex]
  );
  updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
}
