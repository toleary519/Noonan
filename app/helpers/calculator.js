const shots = [
  { club: "8 Iron", min: 150, max: 164, minPow: 50 },
  { club: "9 Iron", min: 140, max: 159, minPow: 50 },
  { club: "7 Iron", min: 165, max: 179, minPow: 50 },
  { club: "6 Iron", min: 180, max: 200, minPow: 50 },
];

const getClub = (distance) => {
  const execute = { club: "", power: "" };

  for (const shot of shots) {
    if (distance >= shot.min && distance <= shot.max) {
      execute.club = shot.club;
      execute.power =
        parseFloat(
          shot.minPow +
            ((100 - shot.minPow) / (shot.max - shot.min)) *
              (distance - shot.min)
        ).toFixed(2) + " %";
    }
  }

  return execute;
};

export { getClub };
