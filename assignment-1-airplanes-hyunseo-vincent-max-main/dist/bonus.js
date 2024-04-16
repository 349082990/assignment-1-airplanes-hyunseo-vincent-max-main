"use strict";
const BONUS_ONE = document.getElementById("bonusOne");
const BONUS_I_BTN = document.getElementById('bonusOneBtn');
const DISPLAY_DISTANCE = document.getElementById('displayDistance');
const FIRST_ID_B1 = document.getElementById('firstID');
const SECOND_ID_B1 = document.getElementById('secondID');
const DISTANCE_BTN = document.getElementById('distanceBtn');
const BONUS_I_TIME = document.getElementById('bonusOneTime');
const BONUS_TWO = document.getElementById("bonusTwo");
const TRANSGER_NUM_B2 = document.getElementById('transferNumsB2');
const TRANSFER_NUM_SELECT = document.getElementById('transferNum');
const BONUS_II_BTN = document.getElementById('bonusTwoBtn');
const DISPLAY_CUMULATIVE = document.getElementById('displayCumulative');
const START_ID_B2 = document.getElementById('B2-start');
const END_ID_B2 = document.getElementById('B2-end');
const FIRST_TRANSFER_B2 = document.getElementById('B2-T1');
const SECOND_TRANSFER_B2 = document.getElementById('B2-T2');
const THIRD_TRANSFER_B2 = document.getElementById('B2-T3');
const FOURTH_TRANSFER_B2 = document.getElementById('B2-T4');
const FIFTH_TRANSFER_B2 = document.getElementById('B2-T5');
const SIXTH_TRANSFER_B2 = document.getElementById('B2-T6');
const SEVENTH_TRANSFER_B2 = document.getElementById('B2-T7');
const DISTANCE_BTN_II = document.getElementById('cumulativeBtn');
const BONUS_II_TIME = document.getElementById('bonusTwoTime');
const BONUS_THREE = document.getElementById("bonusThree");
const DISPLAY_SHORTEST = document.getElementById('displayShortest');
const B3_START = document.getElementById('B3-start');
const B3_END = document.getElementById('B3-end');
const TRANSFER_NUM_B3 = document.getElementById('transferNumsB3');
const DISTANCE_BTN_III = document.getElementById('shortest');
const BONUS_III_TIME = document.getElementById('bonusThreeTime');
const BONUS_III_BTN = document.getElementById('bonusThreeBtn');
const TYPE_ARR = copyArrayWithIndex(data.type, true);
const IDENT_ARR = copyArrayWithIndex(data.ident, true);
const LATI_ARR = copyArrayWithIndex(data.latitude_deg, true);
const LONGI_ARR = copyArrayWithIndex(data.longitude_deg, true);
const RADIUS = 6371;
let bonus1Visible = true;
let bonus2Visible = true;
let bonus3Visible = true;
const B2_TRANSFERS = [
    START_ID_B2,
    FIRST_TRANSFER_B2,
    SECOND_TRANSFER_B2,
    THIRD_TRANSFER_B2,
    FOURTH_TRANSFER_B2,
    FIFTH_TRANSFER_B2,
    SIXTH_TRANSFER_B2,
    SEVENTH_TRANSFER_B2,
    END_ID_B2
];
function toggleB1(visible) {
    DISPLAY_DISTANCE.hidden = visible;
    FIRST_ID_B1.hidden = visible;
    SECOND_ID_B1.hidden = visible;
    DISTANCE_BTN.hidden = visible;
    BONUS_I_TIME.hidden = visible;
}
function toggleBonus1Section() {
    if (bonus1Visible) {
        bonus1Visible = false;
        BONUS_I_BTN.innerText = 'Hide Bonus 1';
        toggleB1(bonus1Visible);
    }
    else {
        bonus1Visible = true;
        BONUS_I_BTN.innerText = 'Bonus 1 - Great Circle Distance ';
        toggleB1(bonus1Visible);
        BONUS_ONE.innerHTML = '';
        BONUS_I_TIME.innerHTML = '';
    }
}
function bonusI() {
    let firstID = FIRST_ID_B1.value;
    let secondID = SECOND_ID_B1.value;
    let result = checkType(firstID, secondID);
    if (result === -1) {
        BONUS_ONE.innerHTML = 'Different Airport Type or Closed Airport ';
    }
    else if (result === -2) {
        BONUS_ONE.innerHTML = 'Unknown Airport ID ';
    }
    else {
        BONUS_ONE.innerHTML = 'Distance: ' + result + 'km   ';
    }
}
function toggleB2(visible) {
    BONUS_TWO.hidden = visible;
    DISPLAY_CUMULATIVE.hidden = visible;
    START_ID_B2.hidden = visible;
    END_ID_B2.hidden = visible;
    FIRST_TRANSFER_B2.hidden = visible;
    SECOND_TRANSFER_B2.hidden = visible;
    THIRD_TRANSFER_B2.hidden = visible;
    FOURTH_TRANSFER_B2.hidden = visible;
    FIFTH_TRANSFER_B2.hidden = visible;
    SIXTH_TRANSFER_B2.hidden = visible;
    SEVENTH_TRANSFER_B2.hidden = visible;
    DISTANCE_BTN_II.hidden = visible;
    BONUS_II_TIME.hidden = visible;
    TRANSFER_NUM_SELECT.hidden = visible;
    TRANSGER_NUM_B2.hidden = visible;
}
function toggleBonus2Section() {
    if (bonus2Visible) {
        bonus2Visible = false;
        BONUS_II_BTN.innerText = 'Hide Bonus 2';
        toggleB2(bonus2Visible);
        const SELECTED_INDEX = trackSelectedIndex();
        toggleTransferInputs(SELECTED_INDEX);
    }
    else {
        bonus2Visible = true;
        BONUS_II_BTN.innerText = 'Bonus 2 - Transfer';
        toggleB2(bonus2Visible);
        toggleTransferInputs(0);
        FIRST_TRANSFER_B2.hidden = true;
    }
}
// Function to track selected index
function trackSelectedIndex() {
    return TRANSFER_NUM_SELECT.selectedIndex + 1;
}
// Function to toggle visibility of transfer inputs
function toggleTransferInputs(selectedIndex) {
    const TRANSFER_INPUTS_ARRAY = [
        FIRST_TRANSFER_B2,
        SECOND_TRANSFER_B2,
        THIRD_TRANSFER_B2,
        FOURTH_TRANSFER_B2,
        FIFTH_TRANSFER_B2,
        SIXTH_TRANSFER_B2,
        SEVENTH_TRANSFER_B2
    ];
    for (let i = 0; i < TRANSFER_INPUTS_ARRAY.length; i++) {
        if (i < selectedIndex) {
            TRANSFER_INPUTS_ARRAY[i].hidden = false;
        }
        else {
            TRANSFER_INPUTS_ARRAY[i].hidden = true;
        }
    }
}
function sumBonusII() {
    let totalTransfers = TRANSFER_NUM_SELECT.selectedIndex + 1;
    console.log(totalTransfers);
    let currentDistance = 0;
    for (let i = 0; i < totalTransfers; i++) {
        let first = B2_TRANSFERS[i].value;
        console.log(first);
        let second = B2_TRANSFERS[i + 1].value;
        console.log(second);
        let result = checkType(first, second);
        if (result === -1) {
            BONUS_TWO.innerHTML = 'Different Airport Type or Closed Airport ';
            return undefined;
        }
        else if (result === -2) {
            BONUS_TWO.innerHTML = 'Unknown Airport ID ';
            return undefined;
        }
        currentDistance = currentDistance + result;
        console.log(currentDistance);
    }
    let endIndx = B2_TRANSFERS.length - 1;
    let lastDistance = checkType(B2_TRANSFERS[totalTransfers].value, B2_TRANSFERS[endIndx].value);
    console.log(lastDistance);
    let totalD = currentDistance + lastDistance;
    let displacementD = checkType(B2_TRANSFERS[0].value, B2_TRANSFERS[endIndx].value);
    BONUS_TWO.innerHTML = 'Cumulative Distance: ' + totalD + ' km' + '<br>' + 'Displacement: ' + displacementD + ' km   ';
}
/**
 *
 * @returns -2 if there is unknown ID
 * @returns -1 if inputs are closed or not the same
 * @returns oterwise, return the distance between two IDs
 */
function checkType(firstID, secondID) {
    let indexOne = findStartingIndex(IDENT_ARR, firstID);
    console.log(indexOne);
    let indexTwo = findStartingIndex(IDENT_ARR, secondID);
    console.log(indexTwo);
    if (indexOne === -1 || indexTwo === -1) {
        return -2;
    }
    let firstIndex = Number(IDENT_ARR[indexOne][1]);
    let secondIndex = Number(IDENT_ARR[indexTwo][1]);
    console.log(firstIndex);
    console.log(secondIndex);
    if (TYPE_ARR[firstIndex][0] != TYPE_ARR[secondIndex][0] || TYPE_ARR[firstIndex][0] == 'closed') {
        return -1;
    }
    else {
        let firstLatitude = (LATI_ARR[firstIndex][0]);
        let firstLongitude = (LONGI_ARR[firstIndex][0]);
        let secondLatitude = (LATI_ARR[secondIndex][0]);
        let secondLongitude = (LONGI_ARR[secondIndex][0]);
        console.log(firstLatitude, firstLongitude, secondLatitude, secondLongitude);
        return haversine(firstLatitude, firstLongitude, secondLatitude, secondLongitude);
    }
}
/** Haversine formula reference: https://kayuse88.github.io/haversine/ */
function haversine(firstLatitude, firstLongitude, secondLatitude, secondLongitude) {
    let sineDeltaLatitude = sineValue(degreeToRad(absValue(secondLatitude - firstLatitude)) / 2);
    let sineDeltaLongitude = sineValue(degreeToRad(absValue(secondLongitude - firstLongitude)) / 2);
    let insideRoot = sineDeltaLatitude * sineDeltaLatitude + cosineValue(degreeToRad(firstLatitude)) * cosineValue(degreeToRad(secondLatitude)) * sineDeltaLongitude * sineDeltaLongitude;
    let squareRoot = sqrtValue(insideRoot);
    let distance = 2 * RADIUS * arcSine(squareRoot);
    return distance;
}
function degreeToRad(degree) {
    return (degree * Math.PI / 180);
}
function absValue(num) {
    if (num >= 0) {
        return num;
    }
    else {
        return -num;
    }
}
/** Sine function reference, Chat-gpt */
function sineValue(x) {
    const TERMS = 10;
    const PERIOD = 2 * Math.PI;
    x = x % PERIOD; // Ensure x is within one period of the sine function
    let result = 0; // Initialize result to 0
    let numerator = x; // Initialize numerator for the next term
    let denominator = 1; // Initialize denominator for the next term
    for (let i = 1; i <= TERMS; i++) {
        result += numerator / denominator; // Add the next term to the result
        numerator *= -1 * x * x; // Next numerator term
        denominator *= (2 * i) * (2 * i + 1); // Next denominator term
    }
    return result;
}
/** square root function reference, Chat-gpt */
function sqrtValue(number, precision = 1e-15) {
    let guess = number / 2; // Initial guess (can be any reasonable value)
    let previousGuess = Number.POSITIVE_INFINITY; // Initialize previousGuess with positive infinity to ensure the loop runs at least once
    // Iterate until the absolute difference between consecutive guesses is smaller than the specified precision
    while (absValue(previousGuess - guess) > precision) {
        previousGuess = guess; // Store the current guess as the previous guess
        guess = (guess + number / guess) / 2; // Update the guess using the Newton-Raphson method
    }
    return guess; // Return the final calculated square root
}
/** arc sine function reference, chat-gpt */
function arcSine(x) {
    // Ensure x is within the range [-1, 1]
    if (x < -1 || x > 1) {
        throw new Error("Sine value must be in the range [-1, 1]");
    }
    let sum = 0; // Initialize the sum of the Taylor series expansion
    let term = x; // Initialize the first term of the series
    let n = 1; // Start with the second term of the series
    let sign = 1; // Alternate signs of terms
    let precision = 1e-15;
    // Calculate the terms of the Taylor series until the change in term becomes smaller than the specified precision
    while (absValue(term) > precision) {
        sum += term; // Add the current term to the sum
        sign = -sign; // Alternate signs
        term = (term * x * x * (2 * n - 1) * (2 * n - 1)) / ((2 * n) * (2 * n + 1)); // Calculate the next term
        n++; // Increment the index for the next term
    }
    return sum;
}
/** Cosine function, increasing sine function input by PI/2 rad */
function cosineValue(x) {
    x = x + Math.PI / 2;
    const TERMS = 10;
    const PERIOD = 2 * Math.PI;
    x = x % PERIOD;
    let result = 0;
    let numerator = x;
    let denominator = 1;
    for (let i = 1; i <= TERMS; i++) {
        result += numerator / denominator;
        numerator *= -1 * x * x;
        denominator *= (2 * i) * (2 * i + 1);
    }
    return result;
}
//# sourceMappingURL=bonus.js.map