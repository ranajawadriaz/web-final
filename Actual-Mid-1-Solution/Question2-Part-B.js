// using promises
f1()
  .then((result) => f2(result))
  .then((result) => f3(result))
  .then((result) => console.log(result));

// using async/await
async function run() {
  let r1 = await f1();
  let r2 = await f2(r1);
  let r3 = await f3(r2);

  console.log(r3);
}

run();
