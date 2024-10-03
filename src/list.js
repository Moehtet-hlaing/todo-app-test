import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

export const tasks = ["read books", "learn js", "write project"];

export const updateTaskTotal = () => {
  const lists = document.querySelectorAll(".list");
  taskTotal.innerText = lists.length;
};

export const updateDoneTaskTotal = () => {
  const doneLists = document.querySelectorAll(".list input:checked");
  doneTaskTotal.innerText = doneLists.length;
};

export const createNewList = (currentTask) => {
  const list = listTemplate.content.cloneNode(true);
  list.querySelector(".list").id = "list" + uuidv4();
  list.querySelector(".list-task").innerText = currentTask;
  // console.log(list);
  return list;
};

export const addList = (text) => {
  // console.log(taskInput.value);
  listGroup.append(createNewList(text));
  taskInput.value = null;
  // updateTaskTotal();
};

export const deleteList = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  // if (window.confirm("Are You Sure to Delete this Task?")) {
  //   currentList.classList.add("animate__animated", "animate__zoomOut");
  //   currentList.addEventListener("animationend", () => {
  //     currentList.remove();
  //     updateTaskTotal();
  //     updateDoneTaskTotal();
  //   });
  // }

Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  // confirmButtonColor: "#3085d6",
  // cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if(result.isConfirmed){
    currentList.classList.add("animate__animated", "animate__zoomOut");
    currentList.addEventListener("animationend", () => {
      currentList.remove();
      updateTaskTotal();
      updateDoneTaskTotal();
  });
  }
})
};

export const editList = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  const listDoneCheck = currentList.querySelector(".list-done-check");
  const listTask = currentList.querySelector(".list-task");
  const listEditBtn = currentList.querySelector(".list-edit-btn");
  const currentTask = listTask.innerText;
  const newTaskInput = document.createElement("input");
  newTaskInput.className =
    "border border-stone-950 font-mono px-2 py-1 width-[180px] focus-visible:outline-none ";
  listTask.after(newTaskInput);
  newTaskInput.focus();
  listTask.classList.add("hidden");
  newTaskInput.value = currentTask;
  listEditBtn.setAttribute("disabled", true);
  listDoneCheck.setAttribute("disabled", true);

  newTaskInput.addEventListener("blur", () => {
    listTask.innerText = newTaskInput.value;
    listTask.classList.remove("hidden");
    newTaskInput.remove();
    listEditBtn.removeAttribute("disabled", true);
    listDoneCheck.removeAttribute("disabled", true);
  });

  newTaskInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      listTask.innerText = newTaskInput.value;
      listTask.classList.remove("hidden");
      newTaskInput.remove();
      listEditBtn.removeAttribute("disabled", true);
      listDoneCheck.removeAttribute("disabled", true);
    }
  });
};

export const doneList = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  const listTask = currentList.querySelector(".list-task");
  const listEditBtn = currentList.querySelector(".list-edit-btn");
  const listDoneCheck = currentList.querySelector(".list-done-check");

  listTask.classList.toggle("line-through");
  currentList.classList.toggle("opacity-30");
  currentList.classList.toggle("scale-95");
  currentList.classList.add("duration-200");
  // updateDoneTaskTotal();
  if (listDoneCheck.checked) {
    listEditBtn.setAttribute("disabled", true);
  } else {
    listEditBtn.removeAttribute("disabled", true);
  }
};
