function btnSetUp() {
  PREV_BTN.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      tables(displayArr, displayStartIndex, displayEndIndex, currentPage);
      updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
    }
  });

  NEXT_BTN.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      tables(displayArr, displayStartIndex, displayEndIndex, currentPage);
      updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
    }
  });

  PAGE_INPUT.addEventListener("change", () => {
    goToPage();
  });

  SEARCH_BTN.addEventListener("click", () => {
    search(checkSearchOption());
  });

  GO_SORTING_PAGE_BTN.addEventListener("click", () => {
    window.location.href = "sorting.html";
  });
}

function goToPage(): void {
  let goTo: number = Number(PAGE_INPUT.value);
  if (goTo > 0 && goTo <= totalPages) {
    currentPage = goTo;
    tables(displayArr, displayStartIndex, displayEndIndex, currentPage);
    updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
    PAGE_INPUT.value = "";
  }
}

function secondBtnSetUp() {
  toggleB1(bonus1Visible);
  toggleB2(bonus2Visible);
  toggleB3(bonus3Visible);
  currentPage = 1;

  SECOND_PREV_BTN.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      tables(displayArr, displayStartIndex, displayEndIndex, currentPage);
      updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
    }
  });

  SECOND_NEXT_BTN.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      tables(displayArr, displayStartIndex, displayEndIndex, currentPage);
      updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
    }
  });

  SECOND_PAGE_INPUT.addEventListener("change", () => {
    secondGoToPage();
  });

  SECOND_PAGE_SORT.addEventListener("click", () => {
    checkSortingOption();
  });

  GO_FIRST_PAGE.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  BONUS_I_BTN.addEventListener("click", () => {
    toggleBonus1Section();
  });

  BONUS_II_BTN.addEventListener("click", () => {
    toggleBonus2Section();
  });

  DISTANCE_BTN.addEventListener("click", () => {
    let b1T: number = performance.now();
    bonusI();
    let b1Time: number = performance.now() - b1T;
    BONUS_I_TIME.innerHTML = "Time: " + b1Time + " ms";
  });

  DISTANCE_BTN_II.addEventListener("click", () => {
    let t1: number = performance.now();
    sumBonusII();
    let t: number = performance.now() - t1;
    BONUS_II_TIME.innerHTML = "Time: " + t + " ms";
  });

  TRANSFER_NUM_SELECT.addEventListener("change", () => {
    toggleTransferInputs(trackSelectedIndex());
  });

  BONUS_III_BTN.addEventListener("click", () => {
    toggleBonus3Section();
  });

  DISTANCE_BTN_III.addEventListener("click", () => {
    let t1: number = performance.now();
    B3();
    let t: number = performance.now() - t1;
    BONUS_III_TIME.innerHTML = "Running Time: " + t + " ms";
  });
}

function secondGoToPage(): void {
  let goTo: number = Number(SECOND_PAGE_INPUT.value);
  if (goTo > 0 && goTo <= totalPages) {
    currentPage = goTo;
    tables(displayArr, displayStartIndex, displayEndIndex, currentPage);
    updateCurrentPageDisplay(displayStartIndex, displayEndIndex);
    SECOND_PAGE_INPUT.value = "";
  }
}
