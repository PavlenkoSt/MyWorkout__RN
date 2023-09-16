const flatten = (arr: any[]): any[] => {
  return arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
};

export default flatten;
