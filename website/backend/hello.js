var sleep = require("./sleep");

function hello() {
  sleep.sleep(2000);
  console.log('Hello Hello!');
  return "Hello Hello"
}
hello();
console.log(hello);