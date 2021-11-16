// const shots = [
//   { key: 0, club: "60", min: 5, max: 25, minPow: 50 },
//   { key: 1, club: "56", min: 26, max: 45, minPow: 50 },
//   { key: 2, club: "52", min: 46, max: 80, minPow: 50 },
//   { key: 3, club: "PW", min: 81, max: 139, minPow: 50 },
//   { key: 4, club: "9i", min: 140, max: 159, minPow: 50 },
//   { key: 5, club: "8i", min: 150, max: 164, minPow: 50 },
//   { key: 6, club: "7i", min: 165, max: 179, minPow: 50 },
//   { key: 7, club: "6i", min: 180, max: 200, minPow: 50 },
// ];

// {
//   /* <NEEDS TO GO TO STORAGE ^^^^^^^^^^^^^^> */
// }

const getClub = (distance, shots) => {
  const execute = { club: "", power: "" };

  for (const shot of shots) {
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
