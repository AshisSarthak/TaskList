import { ToDoList, ToDoItem } from "../components/ToDoListContainer";
import { TaskStatus } from "../components/TaskList";
import { Task } from "../components/Task";

export interface ApplicationState {
    counter: number;
    toDos: ToDoList;
    isShowingAddPopup: boolean;
    pageViewMode: TaskStatus;
}

const initialState = {
    counter: 0,
    toDos: [],
    isShowingAddPopup: false,
    pageViewMode: TaskStatus.ALL,
}
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SHOW_ADD_TASK':
            return { ...state, isShowingAddPopup: action.isShowingAddPopup };
        case 'ADD_TODO_SUCCESS':
            let toDos = action.payload && action.payload.todos;
            return { ...state, toDos }
        case 'COMPLETE_TASK':
            let updatedTodos = state.toDos.map((val: ToDoItem, index: number) => {
                if (val.id === action.payload.id) {
                    val.status = action.payload.status;
                }
                return val;
            });
            return { ...state, toDos: updatedTodos };
        case 'DELETE_TASK':
            updatedTodos = state.toDos.filter((val: ToDoItem) => val.id !== action.payload.id);
            return { ...state, toDos: updatedTodos }
        case 'UPDATE_PAGE_VIEW':
            return { ...state, pageViewMode: action.payload.status }
        case 'UPDATE_TASKS':
            return { ...state, toDos: action.payload.toDos }
        case 'FETCH_TASKS_SUCCESS':
            toDos = action.payload && action.payload.todos;
            return { ...state, toDos }
        default:
            return state;
    }
};
export default reducer;