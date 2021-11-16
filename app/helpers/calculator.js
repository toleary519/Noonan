const getClub = (distance, shots) => {
  const execute = { club: "", power: "" };

  for (const shot of shots) {
    // because inputs in bag are text refactored this with Number()
    if (distance >= Number(shot.min) && distance <= Number(shot.max)) {
      execute.club = shot.club;
      execute.power = Math.round(
        Number(shot.minPow) +
          ((100 - Number(shot.minPow)) /
            (Number(shot.max) - Number(shot.min))) *
            (distance - Number(shot.min))
      );
    }
  }

  return execute;
};

export { getClub };
