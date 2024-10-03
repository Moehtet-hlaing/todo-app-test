import { addList, tasks } from "./list.js";

 const initialRender = () => {
   //  console.log("render");
    tasks.forEach((task) => addList(task))
 };

 export default initialRender;