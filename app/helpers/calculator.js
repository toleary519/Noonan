const shots = [
  { club: "9 Iron", min: 140, max: 159 },
  { club: "8 Iron", min: 150, max: 164 },
  { club: "7 Iron", min: 165, max: 179 },
  { club: "6 Iron", min: 180, max: 200 },
];

const getClub = (distance) => {
  const execute = { club: "", power: "" };

  for (const shot of shots) {
    if (distance >= shot.min && distance <= shot.max) {
      execute.club = shot.club;
      execute.power =
        parseFloat(
          50 + (100 / (shot.max - shot.min)) * (distance - shot.min)
        ).toFixed(2) + " %";
    }
  }

  return execute;
};
