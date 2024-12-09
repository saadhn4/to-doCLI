import readline from "readline-sync";
import { register, login, addTask, editTask, deleteTask } from "./users.js";

async function main() {
  let loggedInUser = null;
  while (true) {
    console.clear();
    console.log("-------------");
    console.log("   To-do");
    console.log("-------------");
    const options = [
      "Exit",
      "Register",
      "Login",
      "Add Task",
      "Edit Task",
      "Delete Task",
      "Delete User",
    ];

    options.forEach((x, y) => console.log(`${y}. ${x}`));

    let userInput = readline.questionInt("Select your option:");

    switch (userInput) {
      case 0:
        console.log("Exiting... bye 👋");
        process.exit(0);
      case 1:
        // console.log("Register");
        await register();
        break;
      case 2:
        // console.log("Login");
        loggedInUser = await login();
        break;
      case 3:
        // console.log("Add Task");
        await addTask(loggedInUser);
        break;
      case 4:
        // console.log("Edit Task");
        await editTask(loggedInUser);
        break;
      case 5:
        // console.log("Delete Task");
        await deleteTask(loggedInUser);
        break;
      case 6:
        console.log("Delete User");
        break;
      default:
        console.log("Invalid Option... ❌");
    }
    readline.question("Press Enter to continue.");
  }
}
main();
