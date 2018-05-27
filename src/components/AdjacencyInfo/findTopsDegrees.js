const findTopsDegrees = (topsAmount, tops) => {
  const topsDegrees = {};
  for (let i = 1; i <= topsAmount; i++) {
    topsDegrees[i] = 0;
  }
  for (let i = 0; i < tops.length; i++) {
    const relation = tops[i];
    for (let j = 0; j < relation.length; j++) {
      topsDegrees[relation[j]] += 1;
    }
  }
  return topsDegrees;
};

export default findTopsDegrees;
