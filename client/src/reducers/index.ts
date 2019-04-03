
import { all, put, call, takeEvery, fork, delay, takeLatest } from 'redux-saga/effects'
import { TaskStatus } from '../components/TaskList';
import TaskAPI from '../api/taskApi';

function* showAddTask(action: any) {
   try {
      yield put({ type: "SHOW_ADD_TASK", isShowingAddPopup: action.payload.isShowingAddPopup });
   } catch (e) {
      yield put({ type: "USER_FETCH_FAILED", message: e.message });
   }
}

function* addToDo(action: any) {
   let payload = action.payload.toDoItem;
   const addTask = yield call(TaskAPI.add, payload);
   payload = { todos: addTask.data.todos || [] };
   try {
      yield put({ type: "ADD_TODO_SUCCESS", payload  });
   } catch (e) {
      yield put({ type: "USER_FETCH_FAILED", message: e.message });
   }
}

function* updateStatus(action: any) {
   const payload = { id: action.payload.id, status: action.payload.status };
   try {
      yield delay(1000);
      yield put({ type: "COMPLETE_TASK", payload });
   } catch (e) {
      yield put({ type: "USER_FETCH_FAILED", message: e.message });
   }
}

function* updatePageView(action: any) {
   const payload = { status: action.payload.status };
   try {
      yield put({ type: "UPDATE_PAGE_VIEW", payload });
   } catch (e) {
      yield put({ type: "USER_FETCH_FAILED", message: e.message });
   }
}

function* updateTasks(action: any) {
   const payload = { toDos: action.payload.toDos };
   try {
      yield put({ type: "UPDATE_TASKS", payload });
   } catch (e) {
      yield put({ type: "USER_FETCH_FAILED", message: e.message });
   }
}

function* fetchTasks(action: any) {
   let payload = {};
   const getTasks = yield call(TaskAPI.get);
   payload = { todos: getTasks.data.todos || [] };
   yield put({ type: 'FETCH_TASKS_SUCCESS', payload });
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* appSaga() {
   yield takeEvery("FETCH_TASKS", fetchTasks);
   yield takeEvery("SHOW_ADD_TASK", showAddTask);
   yield takeEvery("ADD_TODO", addToDo);
   yield takeEvery("COMPLETE_TASK", updateStatus);
   yield takeLatest("UPDATE_PAGE_VIEW", updatePageView);
   yield takeLatest("UPDATE_TASKS", updateTasks);
}

function* mySaga() {
   yield all([fork(appSaga)])
}

export default mySaga;