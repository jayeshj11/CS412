let left, right, opr, len, half_len;

let evaluate = expression => {
  len = Math.floor(expression.length);
  half_len = Math.floor(expression.length/2);
  left = parseInt(expression.slice(0, half_len));
  opr = expression.slice(half_len, half_len+1);
  right = parseInt(expression.slice(Math.floor(half_len+1,len)));
  return [left, opr, right];
}

let operation = expr => {
  let expr_1 = evaluate(expr);
  let x = expr_1[0]
  let opr_n = expr_1[1]
  let y = expr_1[2]
  console.log(x, opr_n, y);
  if (opr_n === "+") {
    return  x+y;
  } else if (opr_n === "-") {
    return  x-y;
  } else if (opr_n === "/") {
    return  x/y;
  } else if (opr_n === "*") {
    return  x*y;
  } else if (opr_n === "%") {
    return  x%y;
  } else if (opr_n === "^") {
    return  Math.pow(x,y);
  } else if (opr_n === "%") {
    return  x%y;
  };
}

let expressions = ['8*3', '9^5', '8%3', '123*456', '90000/10000', '65366-65363', '1287879231+1287167231']
var i;
for (i = 0; i < expressions.length; i++) { 
  console.log(`${expressions[i]}: ${operation(expressions[i])}`);
}