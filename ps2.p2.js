function* generator(str) {
  var index = 0;
  while (true){yield str[index++]}
}
var str = "All I know is something like a bird within her sang";
var spl_str = str.split(" ");
const gen = generator(spl_str);

var i;
for (i = 0; i < spl_str.length; i++) { 
  console.log(gen.next().value);
}