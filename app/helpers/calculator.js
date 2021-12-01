const getClub = (actualDistance, shots) => {
  // in between estimate - range message - shot club - percent power
  let execute = {
    iBMessage: "",
    iBOne: "",
    iBTwo: "",
    message: "",
  };

  const reset = {
    iBMessage: "",
    iBOne: "",
    iBTwo: "",
    message: "",
  };

  let bagMax = 0;
  let bagMin = 0;

  // reset the execute object on each pass to eliminate messages and values from previous distance
  execute = { ...reset };
  // find the spread of users bag
  for (const shot of shots) {
    if (bagMin === 0) {
      bagMin = shots[0].min;
    }
    if (Number(shot.min) < bagMin) {
      bagMin = shot.min;
      // console.log("bag min - ", bagMin);
    }
    if (Number(shot.max) > bagMax) {
      bagMax = shot.max;
      // console.log("bag max - ", bagMax);
    }
  }

  for (const shot of shots) {
    // check for shots above or below players range
    if (actualDistance > bagMax) {
      execute.message = "Out of range";
    }
    if (actualDistance > 450) {
      execute.message = "Common...";
    }
    if (actualDistance < bagMin) {
      execute.message = "too short";
    }
  }

  //check for inbetween club returns the same
  for (let i = 0; i < shots.length - 1; i++) {
    if (actualDistance > shots[i].max && actualDistance < shots[i + 1].min) {
      // execute = { ...reset };
      execute.iBOne = shots[i].club;
      execute.iBTwo = shots[i + 1].club;
      execute.iBMessage = "In Between Clubs";
    }
  }
  console.log("EXECUTE ::: ", execute);

  return execute;
};

// array of multiple swings
const getSwings = (actualDistance, shots) => {
  let swings = [];
  let shotObj = { club: "", power: "" };

  for (const shot of shots) {
    if (
      actualDistance >= Number(shot.min) &&
      actualDistance <= Number(shot.max)
    ) {
      // because inputs in bag are strings refactored this with Number(), reset values if found
      // execute = { ...reset };
      shotObj.club = shot.club;
      shotObj.power = Math.round(
        Number(shot.minPow) +
          ((100 - Number(shot.minPow)) /
            (Number(shot.max) - Number(shot.min))) *
            (actualDistance - Number(shot.min))
      );
      console.log("shotOBJ: ", { ...shotObj });
      swings.push({ ...shotObj });
    }
    console.log("swings: ", swings);
  }
  return swings;
};

export { getClub, getSwings };
