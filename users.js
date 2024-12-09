import readline from "readline-sync";
import fs from "fs/promises";

async function register() {
  let db = await fs.readFile("db.json", "utf-8");

  let convertDB = JSON.parse(db);

  let usernameInput = readline.question("Enter username:");
  let passwordInput = readline.question("Enter password:");

  let check = convertDB.users.some((x) => x.username === usernameInput);

  if (check) {
    console.log("Username already exists... Choose a different one ❌");
    return;
  } else {
    console.log("User Registered Succesfully!! 💻😊");
  }

  let obj = { username: usernameInput, password: passwordInput, tasks: [] };

  convertDB.users.push(obj);

  let convertBack = JSON.stringify(convertDB);

  await fs.writeFile("db.json", convertBack);
}

async function login() {
  let db = await fs.readFile("db.json", "utf-8");
  let convertDB = JSON.parse(db);

  let usernameInput = readline.question("Enter username:");
  let passwordInput = readline.question("Enter password:");

  let check = convertDB.users.find(
    (x) => x.username === usernameInput && x.password === passwordInput
  );

  if (check) {
    console.log("Login Succesful... Welcome to To-do App 🫡");
    return check;
  } else {
    console.log("Invalid credentials.. Try again 😞");
    return;
  }
}

async function addTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("Please Make Sure You Log-in First 🙂");
    return;
  }

  let db = await fs.readFile("db.json", "utf-8");
  let convertDB = JSON.parse(db);

  let titleInput = readline.question("Enter Title:");
  let descInput = readline.question("Enter Description:");

  let check = convertDB.users.find((x) => x.username === loggedInUser.username);

  let obj = { id: Date.now(), Title: titleInput, Description: descInput };

  check.tasks.push(obj);

  let convertBack = JSON.stringify(convertDB);

  await fs.writeFile("db.json", convertBack);

  console.log("Task Added Succesfully ‼️✅");
}

async function editTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("Please Make Sure You Log-in First 🙂");
    return;
  }

  let db = await fs.readFile("db.json", "utf-8");
  let convertDB = JSON.parse(db);

  let check = convertDB.users.find((x) => x.username === loggedInUser.username);

  if (check.tasks.length === 0) {
    console.log("You dont have any tasks to edit... 😒");
    return;
  }

  console.log("Your tasks:");
  check.tasks.map((x) => console.log(`${x.id} ${x.Title} ${x.Description} `));

  let userIDInput = readline.questionInt("Enter ID: ");
  let checkID = check.tasks.find((x) => x.id === userIDInput);

  if (checkID) {
    let newTitle = readline.question("Enter Your New Title:");
    let newDesc = readline.question("Enter Your New Description:");

    checkID.Title = newTitle || checkID.Title;
    checkID.Description = newDesc || checkID.Description;

    let convertBack = JSON.stringify(convertDB);
    await fs.writeFile("db.json", convertBack);

    console.log("Task Edited Succesfully ‼️✅");
  } else {
    console.log("Invalid ID.");
  }
}

async function deleteTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("Go and log in.");
    return;
  }

  const db = await fs.readFile("db.json", "utf-8");

  const convertDB = JSON.parse(db);

  let check = convertDB.users.find((x) => x.username === loggedInUser.username);

  if (check.tasks.length === 0) {
    console.log("No tasks to delete");
    return;
  }

  console.log("Your tasks:");

  check.tasks.map((x) => console.log(`${x.id} ${x.Title} ${x.Description}`));

  let TaskInput = readline.questionInt("Enter ID of task you want to delete:");

  let checkID = check.tasks.findIndex((x) => x.id === TaskInput);

  if (checkID > -1) {
    check.tasks.splice(checkID, 1);
    let convertBack = JSON.stringify(convertDB);
    await fs.writeFile("db.json", convertBack);
    console.log("Task Deleted Succesfully!");
  } else {
    console.log("Invalid Id");
  }
}

export { register, login, addTask, editTask, deleteTask };
