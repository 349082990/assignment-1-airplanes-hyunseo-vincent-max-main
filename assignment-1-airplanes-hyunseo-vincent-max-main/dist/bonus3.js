"use strict";
let ballooonPort = [];
let closedPort = [];
let heliport = [];
let largeAirport = [];
let mediumAirport = [];
let seaplaneBase = [];
let smallAirport = [];
let chooseAirport = [];
function bIIISetUp() {
    typeOrder = mergeSort(TYPE_ARR, 0);
    ballooonPort = eachType(typeOrder, 'balloonport');
    closedPort = eachType(typeOrder, 'closed');
    heliport = eachType(typeOrder, 'heliport');
    largeAirport = eachType(typeOrder, 'large_airport');
    mediumAirport = eachType(typeOrder, 'medium_airport');
    seaplaneBase = eachType(typeOrder, 'seaplane_base');
    smallAirport = eachType(typeOrder, 'small_airport');
    chooseAirport = [
        ballooonPort,
        closedPort,
        heliport,
        largeAirport,
        mediumAirport,
        seaplaneBase,
        smallAirport
    ];
    counter = 0;
    savedArr = [];
    v1Distance = 0;
}
let savedArr = [];
let counter = 0;
let v1Distance = 0;
function eachType(arr, type) {
    let tempArr = [];
    let typeStart = findStartingIndex(arr, type);
    let typeEnd = findEndingIndex(arr, type);
    for (let i = 0; i < typeEnd - typeStart + 1; i++) {
        tempArr[i] = arr[i + typeStart][1];
    }
    return tempArr;
}
function removeIndex(arr, remove) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === remove) {
            arr.splice(i, 1);
            break; // Stop looping after removing the first occurrence
        }
    }
    return arr;
}
function bonusIII(startID, endID, requiredTransfer) {
    let targetArr = [];
    let indexOne = findStartingIndex(IDENT_ARR, startID);
    console.log(indexOne);
    let indexTwo = findStartingIndex(IDENT_ARR, endID);
    let firstType = TYPE_ARR[indexOne][0];
    let secondType = TYPE_ARR[indexTwo][0];
    if (firstType !== secondType) {
        BONUS_THREE.innerHTML = 'Different Airports';
        return 0;
    }
    else if (firstType === 'closed') {
        BONUS_THREE.innerHTML = 'Closed';
        return 0;
    }
    else if (firstType === 'balloonport') {
        BONUS_THREE.innerHTML = 'BalloonPorts';
        return 0;
    }
    else if (firstType === 'heliport') {
        targetArr = chooseAirport[2];
    }
    else if (firstType === 'large_airport') {
        targetArr = chooseAirport[3];
    }
    else if (firstType === 'medium_airport') {
        BONUS_THREE.innerHTML = 'Medium Airports';
        return 0;
    }
    else if (firstType === 'seaplane_base') {
        targetArr = chooseAirport[5];
    }
    else if (firstType === 'small_airport') {
        targetArr = chooseAirport[6];
    }
    removeIndex(targetArr, IDENT_ARR[indexOne][1]);
    removeIndex(targetArr, IDENT_ARR[indexTwo][1]);
    let distanceArr = [];
    let firstIndex = Number(IDENT_ARR[indexOne][1]);
    let secondIndex = Number(IDENT_ARR[indexTwo][1]);
    let startLatitude = (LATI_ARR[firstIndex][0]);
    let startLongitude = (LONGI_ARR[firstIndex][0]);
    let endLatitude = (LATI_ARR[secondIndex][0]);
    let endLongitude = (LONGI_ARR[secondIndex][0]);
    console.log(startLatitude, startLongitude, endLatitude, endLongitude);
    for (let i = 0; i < targetArr.length; i++) {
        let middleIndex = targetArr[i];
        let middleLatitude = LATI_ARR[middleIndex][0];
        let middleLongitude = LONGI_ARR[middleIndex][0];
        let startToMiddle = haversine(startLatitude, startLongitude, middleLatitude, middleLongitude);
        let middleToEnd = haversine(middleLatitude, middleLongitude, endLatitude, endLongitude);
        distanceArr[i] = startToMiddle + middleToEnd;
    }
    let minValue = Math.min(...distanceArr);
    let minIndex = distanceArr.indexOf(minValue);
    let minArrIndex = targetArr[minIndex];
    let minID = IDENT_ARR[minArrIndex][0];
    let tempDistance = haversine(LATI_ARR[targetArr[minIndex]][0], LONGI_ARR[targetArr[minIndex]][0], endLatitude, endLongitude);
    savedArr[counter] = [minID, tempDistance];
    console.log(minIndex);
    console.log(minID);
    console.log(savedArr);
    counter++;
    if (counter >= requiredTransfer) {
        let result = displayData(savedArr);
        let speed = 0;
        if (firstType === 'heliport') {
            speed = 160;
        }
        else if (firstType === 'small_airport') {
            speed = 230;
        }
        else if (firstType === 'large_airport') {
            speed = 800;
        }
        let firstD = haversine(startLatitude, startLongitude, LATI_ARR[targetArr[minIndex]][0], LONGI_ARR[targetArr[minIndex]][0]);
        console.log(result.transferIDs);
        let shortestDistance = result.shortestD + firstD;
        bIIISetUp();
        v1Distance = shortestDistance;
        BONUS_THREE.innerHTML = 'Shortest Distance: ' + shortestDistance + ' km'
            + '<br>' + 'Transfers: ' + result.transferIDs
            + '<br>' + 'Travel Time: ' + shortestDistance / speed + ' hrs';
        return shortestDistance;
    }
    bonusIII(startID, minID, requiredTransfer);
    return 0;
}
function displayData(arr) {
    let transferIDs = [];
    let shortestD = 0;
    for (let i = 0; i < arr.length; i++) {
        transferIDs[i] = arr[arr.length - 1 - i][0];
        shortestD = shortestD + arr[i][1];
    }
    return { transferIDs: transferIDs, shortestD: shortestD };
}
function B3() {
    let startB3 = B3_START.value;
    let endB3 = B3_END.value;
    let transferNumbers = Number(TRANSFER_NUM_B3.value);
    if (transferNumbers <= 0 || transferNumbers % 1 !== 0) {
        return;
    }
    bonusIII(startB3, endB3, transferNumbers);
    bonusIII_V2(startB3, endB3, transferNumbers, v1Distance);
}
function toggleB3(visible) {
    BONUS_THREE.hidden = visible;
    DISPLAY_SHORTEST.hidden = visible;
    B3_START.hidden = visible;
    B3_END.hidden = visible;
    DISTANCE_BTN_III.hidden = visible;
    BONUS_III_TIME.hidden = visible;
    TRANSFER_NUM_B3.hidden = visible;
}
function toggleBonus3Section() {
    if (bonus3Visible) {
        bonus3Visible = false;
        BONUS_III_BTN.innerText = 'Hide Bonus 3';
        toggleB3(bonus3Visible);
        // Additional logic if needed
    }
    else {
        bonus3Visible = true;
        BONUS_III_BTN.innerText = 'Bonus 3 - Shortest';
        toggleB3(bonus3Visible);
        // Additional logic if needed
    }
}
function bonusIII_V2(startID, endID, requiredTransfer, v1Distance) {
    let targetArr = [];
    let indexOne = findStartingIndex(IDENT_ARR, startID);
    console.log(indexOne);
    let indexTwo = findStartingIndex(IDENT_ARR, endID);
    let firstType = TYPE_ARR[indexOne][0];
    let secondType = TYPE_ARR[indexTwo][0];
    if (firstType !== secondType) {
        BONUS_THREE.innerHTML = 'Different Airports';
        return;
    }
    else if (firstType === 'closed') {
        BONUS_THREE.innerHTML = 'Closed';
        return;
    }
    else if (firstType === 'balloonport') {
        BONUS_THREE.innerHTML = 'BalloonPorts';
        return;
    }
    else if (firstType === 'heliport') {
        targetArr = chooseAirport[2];
    }
    else if (firstType === 'large_airport') {
        targetArr = chooseAirport[3];
    }
    else if (firstType === 'medium_airport') {
        BONUS_THREE.innerHTML = 'Medium Airports';
        return;
    }
    else if (firstType === 'seaplane_base') {
        targetArr = chooseAirport[5];
    }
    else if (firstType === 'small_airport') {
        targetArr = chooseAirport[6];
    }
    removeIndex(targetArr, IDENT_ARR[indexOne][1]);
    removeIndex(targetArr, IDENT_ARR[indexTwo][1]);
    let distanceArr = [];
    let firstIndex = Number(IDENT_ARR[indexOne][1]);
    let secondIndex = Number(IDENT_ARR[indexTwo][1]);
    let startLatitude = (LATI_ARR[firstIndex][0]);
    let startLongitude = (LONGI_ARR[firstIndex][0]);
    let endLatitude = (LATI_ARR[secondIndex][0]);
    let endLongitude = (LONGI_ARR[secondIndex][0]);
    console.log(startLatitude, startLongitude, endLatitude, endLongitude);
    for (let i = 0; i < targetArr.length; i++) {
        let middleIndex = targetArr[i];
        let middleLatitude = LATI_ARR[middleIndex][0];
        let middleLongitude = LONGI_ARR[middleIndex][0];
        let startToMiddle = haversine(startLatitude, startLongitude, middleLatitude, middleLongitude);
        let middleToEnd = haversine(middleLatitude, middleLongitude, endLatitude, endLongitude);
        distanceArr[i] = startToMiddle + middleToEnd;
    }
    let minValue = Math.min(...distanceArr);
    let minIndex = distanceArr.indexOf(minValue);
    let minArrIndex = targetArr[minIndex];
    let minID = IDENT_ARR[minArrIndex][0];
    let tempDistance = haversine(LATI_ARR[targetArr[minIndex]][0], LONGI_ARR[targetArr[minIndex]][0], startLatitude, startLongitude);
    savedArr[counter] = [minID, tempDistance];
    console.log(minIndex);
    console.log(minID);
    console.log(savedArr);
    counter++;
    if (counter >= requiredTransfer) {
        let result = displayData(savedArr);
        let speed = 0;
        if (firstType === 'heliport') {
            speed = 160;
        }
        else if (firstType === 'small_airport') {
            speed = 230;
        }
        else if (firstType === 'large_airport') {
            speed = 800;
        }
        let lastD = haversine(endLatitude, endLongitude, LATI_ARR[targetArr[minIndex]][0], LONGI_ARR[targetArr[minIndex]][0]);
        console.log(result.transferIDs);
        let shortestDistance = result.shortestD + lastD;
        console.log(shortestDistance);
        if (v1Distance <= shortestDistance) {
            console.log(v1Distance);
            console.log(shortestDistance);
            console.log('a');
            return;
        }
        else {
            BONUS_THREE.innerHTML = 'Shortest Distance: ' + shortestDistance + ' km'
                + '<br>' + 'Transfers: (Reverse) ' + result.transferIDs
                + '<br>' + 'Travel Time: ' + shortestDistance / speed + ' hrs';
        }
        bIIISetUp();
        console.log('b');
        return;
    }
    bonusIII_V2(minID, endID, requiredTransfer, v1Distance);
}
//# sourceMappingURL=bonus3.js.map