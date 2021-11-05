const shots = [
  { key: 0, club: "60", min: 5, max: 25, minPow: 50 },
  { key: 1, club: "56", min: 26, max: 45, minPow: 50 },
  { key: 2, club: "52", min: 46, max: 80, minPow: 50 },
  { key: 3, club: "PW", min: 81, max: 139, minPow: 50 },
  { key: 4, club: "9i", min: 140, max: 159, minPow: 50 },
  { key: 5, club: "8i", min: 150, max: 164, minPow: 50 },
  { key: 6, club: "7i", min: 165, max: 179, minPow: 50 },
  { key: 7, club: "6i", min: 180, max: 200, minPow: 50 },
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
