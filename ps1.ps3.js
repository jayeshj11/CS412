const p1 = (param, func) => func(param);

let expression_1 = p1(
  'supercalifragilisticexpialidocious', 
  val => val.split(/(?=c)/g)
  );

let expression_2 = p1(
    'supercalifragilisticexpialidocious', 
    val => {
      let res = val.replace(/a/g, "A")
      let appear = val.match(/a/g).length
      let leng = val.length
      let values = {originalString : val, modifiedString: res, numberReplaced: appear, length: leng}
      return [values]
      }
    );

console.log(expression_1);
console.log(expression_2);