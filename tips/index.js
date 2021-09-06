exports.addPercentageToEach = (prices, percentage) => {
  return prices.map((total) => {
    console.log('Ruslan 1 ' + total);
    total = parseFloat(total); // Get float number, for example string -> number
    console.log('Ruslan 2 ' + total);
    console.log('Ruslan 3 ' + (total + (total * percentage)));
    return total + (total * percentage);
  });
};

exports.sum = (prices) => {
  console.log('Ruslan 4 ' + prices);
  return prices.reduce((currentSum, currentValue) => { // reduce - summ
    return parseFloat(currentSum) + parseFloat(currentValue); // convert values to numbers and make summ
  });
};

exports.percentFormat = (percentage) => {
  console.log('Ruslan 5 ' + percentage);
  return parseFloat(percentage) * 100 + '%';
};

exports.dollarFormat = (number) => {
  return `$${parseFloat(number).toFixed(2)}`;
};
