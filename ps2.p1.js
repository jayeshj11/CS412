function* generator() {
  var index = 0;
  var index1 = 1;
  while (true){
    yield index;
    [index, index1] = [index1, index+index1]
    }
}

function* generator2() {
  while (true){
    var val = gen.next().value;
    if (val%2 === 0){yield val}
    }
}

const gen = generator();
const gen2 = generator2();

var i;
for (i = 0; i < 6; i++) { 
  console.log(gen2.next().value);
}