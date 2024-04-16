/**
 * Sorts a 2D array [data][index], based on its data in ascending or descending order, and then by index if data is the same.
 * @param arr The 2D array [data][index] to be sorted.
 * @param sortingOption Sorting option: 0 for ascending, 1 for descending.
 * @returns The sorted array.
 * Time complexity of merge sorting: O(n log n), Ω(n log n) --> Θ(n log n)
 * Improved & fixed (from chat-gpt)
 */
function mergeSort(arr: any[][], sortingOption: number): any[][] {
  if (arr.length <= 1) {
    return arr;
  }

  let mid = Math.floor(arr.length / 2);
  let left = [];
  let right = [];

  for (let i = 0; i < mid; i++) {
    left[i] = arr[i];
  }

  for (let i = mid; i < arr.length; i++) {
    right[i - mid] = arr[i];
  }

  if (sortingOption === 0) {
    return merge(mergeSort(left, 0), mergeSort(right, 0));
  } else {
    return mergeDescending(mergeSort(left, 1), mergeSort(right, 1));
  }
}

/**
 * Merges two sorted arrays into one sorted array.
 * @param left The left sorted array.
 * @param right The right sorted array.
 * @returns The merged sorted array in acsending order.
 */
function merge(left: any[], right: any[]): any[] {
  let result: any[] = new Array(left.length + right.length);
  let leftIndex: number = 0;
  let rightIndex: number = 0;
  let resultIndex: number = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const LEFT_DATA = left[leftIndex][0];
    const RIGHT_DATA = right[rightIndex][0];
    const LEFT_REF = left[leftIndex][1];
    const RIGHT_REF = right[rightIndex][1];

    if (LEFT_DATA < RIGHT_DATA) {
      result[resultIndex++] = left[leftIndex++];
    } else if (LEFT_DATA > RIGHT_DATA) {
      result[resultIndex++] = right[rightIndex++];
    } else {
      if (LEFT_REF <= RIGHT_REF) {
        result[resultIndex++] = left[leftIndex++];
      } else {
        result[resultIndex++] = right[rightIndex++];
      }
    }
  }

  while (leftIndex < left.length) {
    result[resultIndex++] = left[leftIndex++];
  }

  while (rightIndex < right.length) {
    result[resultIndex++] = right[rightIndex++];
  }
  return result;
}

/**
 * Merges two sorted arrays into one sorted array in descending order.
 * @param left The left sorted array.
 * @param right The right sorted array.
 * @returns The merged sorted array in descending order.
 */
function mergeDescending(left: any[], right: any[]): any[] {
  let result: any[] = new Array(left.length + right.length);
  let leftIndex: number = 0;
  let rightIndex: number = 0;
  let resultIndex: number = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const LEFT = left[leftIndex][0];
    const RIGHT = right[rightIndex][0];

    if (LEFT > RIGHT) {
      result[resultIndex++] = left[leftIndex++];
    } else {
      result[resultIndex++] = right[rightIndex++];
    }
  }
  while (leftIndex < left.length) {
    result[resultIndex++] = left[leftIndex++];
  }
  while (rightIndex < right.length) {
    result[resultIndex++] = right[rightIndex++];
  }

  return result;
}
