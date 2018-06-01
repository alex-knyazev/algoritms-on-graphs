/**
 * Приводит граф к простому - удаляет петли,
 * для кратных ребер оставляет только одно ребро
 * @param {array} relations - отношения в графе
 */
const makeGraphSimple = (relations) => {
  const relationsWithSortedElements = relations.map(relation => relation.sort((a, b) => a - b));
  const voc = {};
  const simpleRelations = relationsWithSortedElements.filter((item, index) => {
    const isValid = voc[`${item[0]}-${item[1]}`] === undefined && item[0] !== item[1];
    voc[`${item[0]}-${item[1]}`] = true;
    if (isValid) return true;
    return false;
  });

  return simpleRelations;
};

export default makeGraphSimple;
