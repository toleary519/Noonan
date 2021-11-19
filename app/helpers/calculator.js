const getClub = (actualDistance, shots) => {
  const execute = { message: "", club: "", power: "" };
  let bagMax = 0;
  let bagMin = shots[0].min;

  for (const shot of shots) {
    if (Number(shot.min) < bagMin) {
      bagMin = shot.min;
    }
    if (Number(shot.max) > bagMax) {
      bagMax = shot.max;
    }
  }

  for (const shot of shots) {
    // check for shots above or below players range
    if (actualDistance > bagMax) {
      execute.message = "Out of range";

      return execute;
    }
    if (actualDistance < bagMin) {
      execute.message = "You're in close.";
      return execute;
    }
    if (
      actualDistance >= Number(shot.min) &&
      actualDistance <= Number(shot.max)
    ) {
      // because inputs in bag are text refactored this with Number()
      execute.club = shot.club;
      execute.power = Math.round(
        Number(shot.minPow) +
          ((100 - Number(shot.minPow)) /
            (Number(shot.max) - Number(shot.min))) *
            (actualDistance - Number(shot.min))
      );
    }
  }

  return execute;
};

export { getClub };
