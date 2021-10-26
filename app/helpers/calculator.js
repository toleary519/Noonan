const shots = [
  { c: "9 Iron", min: 140, max: 159 },
  { c: "8 Iron", min: 150, max: 164 },
  { c: "7 Iron", min: 165, max: 179 },
  { c: "6 Iron", min: 180, max: 200 },
];

const getClub = (distance) => {
  const execute = { club: "", power: "" };

  for (const shot of shots) {
    if (distance >= shot.min && distance <= shot.max) {
      execute.club = shot.c;
      execute.power =
        parseFloat(
          50 + (100 / (shot.max - shot.min)) * (distance - shot.min)
        ).toFixed(2) + " %";
    }
  }

  return execute;
};

console.log(getClub(185));
