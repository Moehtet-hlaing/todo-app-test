import initialRender from "./initialRender.js";
import listener from "./listener.js";
import observer from "./observer.js";

class Todo {
    init(){
        observer();
        listener();
        initialRender();
    }
};

export default Todo;