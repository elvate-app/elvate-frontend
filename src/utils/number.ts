export const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

export const getDecimals = (value: number, precision: number) => {
  const str = value.toString().split(".")[1] || "";
  const reg = str.match(/^(0)\1*/g) || [""];
  const decimals =
    Number(value.toFixed(reg[0].length + precision))
      .toString()
      .split(".")[1] || "";
  return decimals.length;
};
