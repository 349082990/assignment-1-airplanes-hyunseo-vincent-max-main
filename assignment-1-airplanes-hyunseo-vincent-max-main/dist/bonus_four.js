"use strict";
let helicopters = [];
let smallAirplanes = [];
let largeAirplanes = [];
let savedB4 = [];
let TRANSPORTATION = [];
function bIVSetUp() {
    typeOrder = mergeSort(TYPE_ARR, 0);
    heliport = eachType(typeOrder, 'heliport');
    largeAirport = eachType(typeOrder, 'large_airport');
    smallAirport = eachType(typeOrder, 'small_airport');
    largeAirplanes = largeAirport;
    smallAirplanes = [...largeAirport, ...smallAirport];
    helicopters = [...largeAirport, ...smallAirport, ...heliport];
    TRANSPORTATION = [
        largeAirplanes,
        smallAirplanes,
        helicopters
    ];
}
function giveValue(type) {
    if (type === 'heliport') {
        return 0;
    }
    else if (type === 'small_airport') {
        return 1;
    }
    else {
        return 2;
    }
}
function mostOptimzed(startID, endID, transfer1, transfer2) {
    let targetArr = [];
    let distanceLimit = 0;
    savedB4 = [];
    let indexStart = findStartingIndex(IDENT_ARR, startID);
    console.log(indexStart);
    let trasnportationType = TYPE_ARR[indexStart][0];
    if (trasnportationType === 'large_airport') {
        targetArr = TRANSPORTATION[0];
        distanceLimit = 14000;
    }
    else if (trasnportationType === 'small_airport') {
        targetArr = TRANSPORTATION[1];
        distanceLimit = 3000;
    }
    else if (trasnportationType === 'heliport') {
        targetArr = TRANSPORTATION[2];
        distanceLimit = 600;
    }
    else {
        return;
    }
    let first = giveValue(TYPE_ARR[indexStart][0]);
    let transferInputI = findStartingIndex(IDENT_ARR, transfer1);
    let second = giveValue(TYPE_ARR[transferInputI][0]);
    let transferInputII = findStartingIndex(IDENT_ARR, transfer2);
    let third = giveValue(TYPE_ARR[transferInputII][0]);
    let indexEnd = findStartingIndex(IDENT_ARR, endID);
    let last = giveValue(TYPE_ARR[indexEnd][0]);
    console.log(first, second, third, last);
    if (first > second && first > third && first > last) {
        console.log('choose different airport');
        return;
    }
    console.log(targetArr);
    savedB4[savedB4.length] = startID;
    betweenTwo(targetArr, startID, transfer1, distanceLimit);
    console.log(transfer1);
    savedB4[savedB4.length] = transfer1;
    betweenTwo(targetArr, transfer1, transfer2, distanceLimit);
    console.log(transfer2);
    savedB4[savedB4.length] = transfer2;
    betweenTwo(targetArr, transfer2, endID, distanceLimit);
    savedB4[savedB4.length] = endID;
    bIVSetUp();
    console.log(savedB4);
    addAll(savedB4);
}
function addAll(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length - 2; i++) {
        let indexOne = findStartingIndex(IDENT_ARR, arr[i]);
        let indexTwo = findStartingIndex(IDENT_ARR, arr[i + 1]);
        let firstIndex = Number(IDENT_ARR[indexOne][1]);
        let secondIndex = Number(IDENT_ARR[indexTwo][1]);
        let startLatitude = (LATI_ARR[firstIndex][0]);
        let startLongitude = (LONGI_ARR[firstIndex][0]);
        let endLatitude = (LATI_ARR[secondIndex][0]);
        let endLongitude = (LONGI_ARR[secondIndex][0]);
        let distance = haversine(startLatitude, startLongitude, endLatitude, endLongitude);
        console.log(distance);
        sum = sum + distance;
    }
    console.log(sum);
}
function betweenTwo(targetArr, startID, endID, distanceLimit) {
    let indexOne = findStartingIndex(IDENT_ARR, startID);
    let indexTwo = findStartingIndex(IDENT_ARR, endID);
    removeIndex(targetArr, IDENT_ARR[indexOne][1]);
    removeIndex(targetArr, IDENT_ARR[indexTwo][1]);
    let distanceArr = [];
    let overDistanceArr = [];
    let overDistanceArr2 = [];
    let firstIndex = Number(IDENT_ARR[indexOne][1]);
    let secondIndex = Number(IDENT_ARR[indexTwo][1]);
    let startLatitude = (LATI_ARR[firstIndex][0]);
    let startLongitude = (LONGI_ARR[firstIndex][0]);
    let endLatitude = (LATI_ARR[secondIndex][0]);
    let endLongitude = (LONGI_ARR[secondIndex][0]);
    console.log(startLatitude, startLongitude, endLatitude, endLongitude);
    if (haversine(startLatitude, startLongitude, endLatitude, endLongitude) <= distanceLimit) {
        return -1;
    }
    let a = 0;
    let b = 0;
    let c = 0;
    console.log(targetArr.length);
    for (let i = 0; i < targetArr.length; i++) {
        let middleIndex = targetArr[i];
        let middleLatitude = LATI_ARR[middleIndex][0];
        let middleLongitude = LONGI_ARR[middleIndex][0];
        let startToMiddle = haversine(startLatitude, startLongitude, middleLatitude, middleLongitude);
        let middleToEnd = haversine(middleLatitude, middleLongitude, endLatitude, endLongitude);
        if (startToMiddle <= distanceLimit && middleToEnd <= distanceLimit) {
            distanceArr[i - a] = [(startToMiddle + middleToEnd), i];
        }
        else if (startToMiddle <= distanceLimit && middleToEnd > distanceLimit) {
            overDistanceArr[b] = [(startToMiddle + middleToEnd), i];
            b++;
            a++;
        }
        else {
            overDistanceArr2[c] = [(startToMiddle + middleToEnd), i];
            c++;
            a++;
        }
    }
    if (overDistanceArr.length === 0) {
        console.log(distanceArr);
        console.log(overDistanceArr);
        console.log(overDistanceArr2);
        overDistanceArr = overDistanceArr2;
    }
    if (distanceArr.length != 0) {
        console.log(distanceArr);
        let minDistanceData = distanceArr[0][0];
        let minDistanceIndex = distanceArr[0][1];
        for (let i = 1; i < distanceArr.length; i++) {
            const [data, index] = distanceArr[i];
            if (data < minDistanceData) {
                minDistanceData = data;
                minDistanceIndex = index;
            }
        }
        console.log(minDistanceIndex);
        let finalMinIndex = targetArr[minDistanceIndex];
        console.log(finalMinIndex);
        let finalMinID = IDENT_ARR[finalMinIndex][0];
        savedB4[savedB4.length] = finalMinID;
        console.log(savedB4);
        return 0;
    }
    let minData = overDistanceArr[0][0];
    let minIndex = overDistanceArr[0][1];
    for (let i = 1; i < overDistanceArr.length; i++) {
        const [data, index] = overDistanceArr[i];
        if (data < minData) {
            minData = data;
            minIndex = index;
        }
    }
    console.log(minIndex);
    let minArrIndex = targetArr[minIndex];
    console.log(targetArr);
    console.log(minArrIndex);
    let minID = IDENT_ARR[minArrIndex][0];
    savedB4[savedB4.length] = minID;
    console.log(savedB4);
    betweenTwo(targetArr, minID, endID, distanceLimit);
    return 0;
}
//# sourceMappingURL=bonus_four.js.map