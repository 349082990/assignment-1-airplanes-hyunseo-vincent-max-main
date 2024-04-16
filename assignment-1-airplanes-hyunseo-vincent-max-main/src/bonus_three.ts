let ballooonPort: number[] = [];
let closedPort: number[] = [];
let heliport: number[] = [];
let largeAirport: number[] = [];
let mediumAirport: number[] = [];
let seaplaneBase: number[] = [];
let smallAirport: number[] = [];

let chooseAirport: any[][] = [];

let savedArr: any[] = [];
let counter: number = 0;
let v1Distance: number = 0;

function toggleB3(visible: boolean): void {
  BONUS_THREE.hidden = visible;
  DISPLAY_SHORTEST.hidden = visible;
  B3_START.hidden = visible;
  B3_END.hidden = visible;
  DISTANCE_BTN_III.hidden = visible;
  BONUS_III_TIME.hidden = visible;
  TRANSFER_NUM_B3.hidden = visible;
}

function toggleBonus3Section(): void {
  if (bonus3Visible) {
    bonus3Visible = false;
    BONUS_III_BTN.innerText = "Hide Bonus 3";
    toggleB3(bonus3Visible);
  } else {
    bonus3Visible = true;
    BONUS_III_BTN.innerText = "Bonus 3 - Shortest";
    toggleB3(bonus3Visible);
  }
}

function bIIISetUp(): void {
  typeOrder = mergeSort(TYPE_ARR, 0);

  ballooonPort = eachType(typeOrder, "balloonport");
  closedPort = eachType(typeOrder, "closed");
  heliport = eachType(typeOrder, "heliport");
  largeAirport = eachType(typeOrder, "large_airport");
  mediumAirport = eachType(typeOrder, "medium_airport");
  seaplaneBase = eachType(typeOrder, "seaplane_base");
  smallAirport = eachType(typeOrder, "small_airport");

  chooseAirport = [
    ballooonPort,
    closedPort,
    heliport,
    largeAirport,
    mediumAirport,
    seaplaneBase,
    smallAirport,
  ];

  counter = 0;
  savedArr = [];
  v1Distance = 0;
}

function eachType(arr: any[], type: string): number[] {
  let tempArr: number[] = [];
  let typeStart = findStartingIndex(arr, type);
  let typeEnd = findEndingIndex(arr, type);

  for (let i = 0; i < typeEnd - typeStart + 1; i++) {
    tempArr[i] = arr[i + typeStart][1];
  }
  return tempArr;
}

function B3() {
  let startB3: string = B3_START.value;
  let endB3: string = B3_END.value;
  let transferNumbers: number = Number(TRANSFER_NUM_B3.value);

  if (transferNumbers <= 0 || transferNumbers % 1 !== 0) {
    return;
  }
  bonusIII(startB3, endB3, transferNumbers);
  bonusIII_V2(startB3, endB3, transferNumbers, v1Distance);
}

/**
 *
 * V1
 * Compare all the distances from START to END, with transfering at only one (same tpye) airport
 * Take the shortest distance, now assume that transfering location is a new NED
 * Repeat n times to find n transfers
 * All the new ENDs are the idents that will be used for n transfers
 * @returns the shortest distance from start to end, with n transfers
 *
 */
function bonusIII(
  startID: string,
  endID: string,
  requiredTransfer: number
): number {
  let targetArr: number[] = [];
  let indexOne: number = findStartingIndex(IDENT_ARR, startID);
  console.log(indexOne);

  let indexTwo: number = findStartingIndex(IDENT_ARR, endID);
  let firstType: string = TYPE_ARR[indexOne][0];
  let secondType: string = TYPE_ARR[indexTwo][0];

  if (firstType !== secondType) {
    BONUS_THREE.innerHTML = "Different Airports";
    return 0;
  } else if (firstType === "closed") {
    BONUS_THREE.innerHTML = "Closed";
    return 0;
  } else if (firstType === "balloonport") {
    BONUS_THREE.innerHTML = "BalloonPorts";
    return 0;
  } else if (firstType === "heliport") {
    targetArr = chooseAirport[2];
  } else if (firstType === "large_airport") {
    targetArr = chooseAirport[3];
  } else if (firstType === "medium_airport") {
    BONUS_THREE.innerHTML = "Medium Airports";
    return 0;
  } else if (firstType === "seaplane_base") {
    targetArr = chooseAirport[5];
  } else if (firstType === "small_airport") {
    targetArr = chooseAirport[6];
  }

  removeIndex(targetArr, IDENT_ARR[indexOne][1]);
  removeIndex(targetArr, IDENT_ARR[indexTwo][1]);

  let distanceArr: number[] = [];

  let firstIndex: number = Number(IDENT_ARR[indexOne][1]);
  let secondIndex: number = Number(IDENT_ARR[indexTwo][1]);

  let startLatitude: number = LATI_ARR[firstIndex][0];
  let startLongitude: number = LONGI_ARR[firstIndex][0];

  let endLatitude: number = LATI_ARR[secondIndex][0];
  let endLongitude: number = LONGI_ARR[secondIndex][0];
  console.log(startLatitude, startLongitude, endLatitude, endLongitude);

  /** Save all the distances from START to END, with transfering at only one airport */
  for (let i = 0; i < targetArr.length; i++) {
    let middleIndex: number = targetArr[i];

    let middleLatitude: number = LATI_ARR[middleIndex][0];
    let middleLongitude: number = LONGI_ARR[middleIndex][0];

    let startToMiddle: number = haversine(
      startLatitude,
      startLongitude,
      middleLatitude,
      middleLongitude
    );
    let middleToEnd: number = haversine(
      middleLatitude,
      middleLongitude,
      endLatitude,
      endLongitude
    );

    distanceArr[i] = startToMiddle + middleToEnd;
  }

  /** Find the index of mimium distances from the array that stored all the distances */
  let minValue = Math.min(...distanceArr);
  let minIndex = distanceArr.indexOf(minValue);
  let minArrIndex = targetArr[minIndex];

  /** Take the ID that makes the shoretest distance */
  let minID = IDENT_ARR[minArrIndex][0];

  /** Find the distance between the ID that just found, to END */
  let tempDistance: number = haversine(
    LATI_ARR[targetArr[minIndex]][0],
    LONGI_ARR[targetArr[minIndex]][0],
    endLatitude,
    endLongitude
  );

  /** Save the ID and distance */
  savedArr[counter] = [minID, tempDistance];

  console.log(minIndex);
  console.log(minID);
  console.log(savedArr);

  counter++;

  if (counter >= requiredTransfer) {
    let result = displayData(savedArr);
    let speed: number = 0;

    if (firstType === "heliport") {
      speed = 160;
    } else if (firstType === "small_airport") {
      speed = 230;
    } else if (firstType === "large_airport") {
      speed = 800;
    }

    /** First distance from START to first transfer */
    let firstD: number = haversine(
      startLatitude,
      startLongitude,
      LATI_ARR[targetArr[minIndex]][0],
      LONGI_ARR[targetArr[minIndex]][0]
    );
    console.log(result.transferIDs);

    /** Add the first distance and all the distances between transfer -> end */
    let shortestDistance: number = result.shortestD + firstD;

    bIIISetUp();
    v1Distance = shortestDistance;

    BONUS_THREE.innerHTML =
      "Shortest Distance: " +
      shortestDistance +
      " km" +
      "<br>" +
      "Transfers: " +
      result.transferIDs +
      "<br>" +
      "Travel Time: " +
      shortestDistance / speed +
      " hrs";
    return shortestDistance;
  }

  bonusIII(startID, minID, requiredTransfer);
  return 0;
}

/**
 *
 * @param arr Array that stored all the index of the same type
 * @param remove Remove indeex that just found, to avoid transfering at the same spot
 * @returns Input array after removing one number
 */
function removeIndex(arr: number[], remove: number): number[] {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === remove) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
}

function displayData(arr: any[]): any {
  let transferIDs: string[] = [];
  let shortestD: number = 0;

  for (let i = 0; i < arr.length; i++) {
    transferIDs[i] = arr[arr.length - 1 - i][0];
    shortestD = shortestD + arr[i][1];
  }
  return { transferIDs: transferIDs, shortestD: shortestD };
}

/**
 *
 * Bascially same process as V1, but V2 considers chaning START id, while V1 changes END id
 * Same as V1, compare all the distances from START to END, with transfering at only one (same tpye) airport
 * Take the shortest distance, but unlike V1, now assume that transfering location is a new START
 * Repeat n times to find n transfers
 * All the STARTs are the idents that will be used for n transfers
 * @returns this shortest distance from start to end, with n transfers
 * @param v1Distance the shortest distance that found from V1
 * @returns
 */
function bonusIII_V2(
  startID: string,
  endID: string,
  requiredTransfer: number,
  v1Distance: number
): void {
  let targetArr: number[] = [];
  let indexOne: number = findStartingIndex(IDENT_ARR, startID);

  console.log(indexOne);

  let indexTwo: number = findStartingIndex(IDENT_ARR, endID);

  let firstType = TYPE_ARR[indexOne][0];
  let secondType = TYPE_ARR[indexTwo][0];

  if (firstType !== secondType) {
    BONUS_THREE.innerHTML = "Different Airports";
    return;
  } else if (firstType === "closed") {
    BONUS_THREE.innerHTML = "Closed";
    return;
  } else if (firstType === "balloonport") {
    BONUS_THREE.innerHTML = "BalloonPorts";
    return;
  } else if (firstType === "heliport") {
    targetArr = chooseAirport[2];
  } else if (firstType === "large_airport") {
    targetArr = chooseAirport[3];
  } else if (firstType === "medium_airport") {
    BONUS_THREE.innerHTML = "Medium Airports";
    return;
  } else if (firstType === "seaplane_base") {
    targetArr = chooseAirport[5];
  } else if (firstType === "small_airport") {
    targetArr = chooseAirport[6];
  }

  removeIndex(targetArr, IDENT_ARR[indexOne][1]);
  removeIndex(targetArr, IDENT_ARR[indexTwo][1]);

  let distanceArr: number[] = [];

  let firstIndex: number = Number(IDENT_ARR[indexOne][1]);
  let secondIndex: number = Number(IDENT_ARR[indexTwo][1]);

  let startLatitude: number = LATI_ARR[firstIndex][0];
  let startLongitude: number = LONGI_ARR[firstIndex][0];

  let endLatitude: number = LATI_ARR[secondIndex][0];
  let endLongitude: number = LONGI_ARR[secondIndex][0];

  console.log(startLatitude, startLongitude, endLatitude, endLongitude);

  for (let i = 0; i < targetArr.length; i++) {
    let middleIndex: number = targetArr[i];

    let middleLatitude: number = LATI_ARR[middleIndex][0];
    let middleLongitude: number = LONGI_ARR[middleIndex][0];

    let startToMiddle: number = haversine(
      startLatitude,
      startLongitude,
      middleLatitude,
      middleLongitude
    );
    let middleToEnd: number = haversine(
      middleLatitude,
      middleLongitude,
      endLatitude,
      endLongitude
    );

    distanceArr[i] = startToMiddle + middleToEnd;
  }

  let minValue: number = Math.min(...distanceArr);
  let minIndex: number = distanceArr.indexOf(minValue);
  let minArrIndex: number = targetArr[minIndex];
  let minID: string = IDENT_ARR[minArrIndex][0];

  let tempDistance: number = haversine(
    LATI_ARR[targetArr[minIndex]][0],
    LONGI_ARR[targetArr[minIndex]][0],
    startLatitude,
    startLongitude
  );

  savedArr[counter] = [minID, tempDistance];

  console.log(minIndex);
  console.log(minID);
  console.log(savedArr);

  counter++;

  if (counter >= requiredTransfer) {
    let result = displayData(savedArr);

    let speed: number = 0;

    if (firstType === "heliport") {
      speed = 160;
    } else if (firstType === "small_airport") {
      speed = 230;
    } else if (firstType === "large_airport") {
      speed = 800;
    }

    let lastD: number = haversine(
      endLatitude,
      endLongitude,
      LATI_ARR[targetArr[minIndex]][0],
      LONGI_ARR[targetArr[minIndex]][0]
    );
    console.log(result.transferIDs);
    let shortestDistance: number = result.shortestD + lastD;

    console.log(shortestDistance);

    if (v1Distance <= shortestDistance) {
      console.log(v1Distance);
      console.log(shortestDistance);
      console.log("v1 is better");
      return;
    } else {
      BONUS_THREE.innerHTML =
        "Shortest Distance: " +
        shortestDistance +
        " km" +
        "<br>" +
        "Transfers: (Reverse) " +
        result.transferIDs +
        "<br>" +
        "Travel Time: " +
        shortestDistance / speed +
        " hrs";
    }

    bIIISetUp();

    console.log("v2 is better");
    return;
  }
  bonusIII_V2(minID, endID, requiredTransfer, v1Distance);
}
