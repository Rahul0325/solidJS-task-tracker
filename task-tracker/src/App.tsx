import { Component, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

const App: Component = () => {
  type Task = {
    id: string;
    text: string;
    completed: boolean;
  };

  const [taskList, setTaskList] = createStore([] as Task[]);

  const addTask = (e: Event) => {
    console.log("adding new task: ");
    e.preventDefault();

    const taskInput = document.querySelector("#taskInput") as HTMLInputElement;

    const newTask = {
      id: Math.random().toString(36).substring(2),
      text: taskInput.value,
      completed: false,
    };

    setTaskList([newTask, ...taskList]);
    taskInput.value = "";
    console.log(taskList);
  };

  const deleteTask = (taskId: string) => {
    const newTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(newTaskList);
  };

  // BUG WHY DOES THIS NOT WORK and the other method works?!?!?
  // const toggleStatus = (taskId: string) => {
  //   const newTaskList: Task[] = taskList().map((task: Task) => {
  //     if (task.id === taskId) {
  //       task.completed = !task.completed;
  //       return task;
  //     }
  //     return task;
  //   });
  //   setTaskList(newTaskList);
  //   console.log(taskList());
  // };

  // const toggleStatus = (taskId: string) => {
  //   const newTaskList = taskList.map((task) => {
  //     if (task.id === taskId) {
  //       return { ...task, completed: !task.completed };
  //     }
  //     return task;
  //   });
  //   setTaskList(newTaskList);
  // };

  const toggleStatus = (taskId: string) => {
    setTaskList(
      (task) => task.id === taskId,
      "completed",
      (completed) => !completed
    );
  };

  return (
    <div class="container mt-5 text-center">
      <h1 class="mb-4">Whattodo!</h1>

      <form
        class="mb-5 row row-cols-2 justify-content-center"
        onsubmit={(e) => addTask(e)}
      >
        <input
          type="text"
          class="input-group-text p-1 w-1"
          placeholder="Add task here..."
          id="taskInput"
          required
        />

        <button class="btn btn-primary ms-3 w-auto" type="submit">
          Add task
        </button>
      </form>

      {/* heading for the Tasks list */}
      <div>
        <h4 class="text-muted mb-4">Tasks</h4>
      </div>

      {/* Render the list of tasks */}
      <div>
        <For each={taskList}>
          {(task: Task) => (
            <div class="row row-cols-3 mb-3 justify-content-center">
              <button
                class="btn btn-danger w-auto"
                onClick={() => deleteTask(task.id)}
              >
                X
              </button>
              <div
                class={`bg-light p-2 mx-2 ${
                  task.completed && `text-decoration-line-through text-success`
                }`}
              >
                {task.text}
              </div>
              <input
                type="checkbox"
                checked={task.completed}
                role="button"
                class="form-check-input h-auto px-3"
                onClick={() => toggleStatus(task.id)}
              />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
export default App;
