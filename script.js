function loadJavascript() {
    console.log({
        message: 'load javascript'
    });
}

document.addEventListener('DOMContentLoaded', loadJavascript);


function makeFunc() {
    const name = "Mozilla";
    function displayName() {
        console.log(name);
    }
    return displayName;
}

const myFunc = makeFunc();
myFunc();

// In essence makeAdder is a function factory. 
// It creates functions that can add a specific value to their argument.
function makeAdder(x) {
    return function(y) {
        return x + y;
    }
}
// Both add5 and add10 form closures. They share the same function body definition, but store different lexical environments. 
// In add5's lexical environment, x is 5 , while in the lexical environment for add10, x is 10.
const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2));


// Practical closures
// Closures are useful because they let you associate data (the lexical environment) with function that operates on that data.
// This has obvious parallels to object-oriented programming, where objects allow you to associate (the object's properties) with one or more methods.

//Emulating private methods with closures

const counter = (function () {
    let privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
  
    return {
      increment() {
        changeBy(1);
      },
  
      decrement() {
        changeBy(-1);
      },
  
      value() {
        return privateCounter;
      },
    };
  })();
  
  console.log(counter.value()); // 0.
  
  counter.increment();
  counter.increment();
  console.log(counter.value()); // 2.
  
  counter.decrement();
  console.log(counter.value()); // 1.

  // Those three public functions form closures that share the same lexical environment. Thanks to JavaScript's lexical scoping, they each have access to the privateCounter variable and the changeBy function.
  

  const makeCounter = function () {
    let privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
    return {
      increment() {
        changeBy(1);
      },
  
      decrement() {
        changeBy(-1);
      },
  
      value() {
        return privateCounter;
      },
    };
  };
  
  const counter1 = makeCounter();
  const counter2 = makeCounter();
  
  console.log(counter1.value()); // 0.
  
  counter1.increment();
  counter1.increment();
  console.log(counter1.value()); // 2.
  
  counter1.decrement();
  console.log(counter1.value()); // 1.
  console.log(counter2.value()); // 0.

  // ^^ Note: Using closures in this way provides benefits that are normally associated with object-oriented programming. In particular, data hiding and encapsulation.
  