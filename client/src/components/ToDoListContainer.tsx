import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import './toDolist.scss';
import { store } from '..';
import AddTaskDialog from './AddTaskDialog';
import TaskContainer, { TaskStatus } from './TaskList';
import { Divider } from '@material-ui/core';

export interface ToDoItem {
    id?: number;
    name: string;
    desc: string;
    status: TaskStatus;
}

export interface ToDoList {
    toDos: ToDoItem[];
}
interface ToDoProps {
    toDos: ToDoItem[];
    isShowingAddPopup?: boolean;
    showAddTask?: (isShowingAddPopup: boolean) => void;
    addToDoTask?: (toDoItem: ToDoItem) => void;
    fetchTasks?: () => void;
}
interface ToDoState {
    toDos: ToDoItem[];
    isShowingAddPopup?: boolean;
}

class ToDo extends React.PureComponent<ToDoProps, ToDoState> {

    constructor(props: ToDoProps) {
        super(props);
        this.state = {
            toDos: [],
            isShowingAddPopup: false,
        }
        this.showAddTaskPopup = this.showAddTaskPopup.bind(this);
    }

    componentDidMount(){
        this.props.fetchTasks && this.props.fetchTasks();
    }

    showNoTodos = () => {
        return (
            <div className="noTask">
                Hurray!! You have no pending tasks
            </div>
        )
    }

    showAddTaskPopup = () => {
        this.props.showAddTask && this.props.showAddTask(true);
    }

    hideAddTaskPopup = () => {
        this.props.showAddTask && this.props.showAddTask(false);
    }

    addTaskToList = (task: ToDoItem) => {
        this.props.addToDoTask && this.props.addToDoTask(task);
    }

    showToDoList = () => {
        return (<TaskContainer />);
    }

    render() {
        const props = this.props;
        return (
            <React.Fragment>
                <Paper elevation={1} className='cont'>
                    <section className='headerSection'>
                        <h2>
                            TO-DO List
                        </h2>
                        <Tooltip title="Add a task">
                            <Fab color="primary" aria-label="Add" className="addBtn" onClick={this.showAddTaskPopup}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </section>

                    <Divider className='divider' />
                    <section className='contentSection'>
                        {
                            !props.toDos.length && this.showNoTodos()
                        }
                        {
                            props.toDos.length > 0 && this.showToDoList()
                        }
                    </section>
                    {
                        props.isShowingAddPopup &&
                        <AddTaskDialog
                            hideAddtaskPopup={this.hideAddTaskPopup}
                            addTaskToList={this.addTaskToList}
                        />
                    }
                </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: ToDoState) => ({
    toDos: state.toDos || [],
    isShowingAddPopup: state.isShowingAddPopup
});

const mapDispatchToProps = (dispatch: any) => {
    return ({
        showAddTask: (isShowingAddPopup: boolean) => {
            store.dispatch({ type: 'SHOW_ADD_TASK', payload: { isShowingAddPopup } });
        },
        addToDoTask: (toDoItem: ToDoItem) => {
            store.dispatch({ type: 'ADD_TODO', payload: { toDoItem } });
        },
        fetchTasks: () => {
            store.dispatch({ type: 'FETCH_TASKS' });
        }
    })
};
const ToDoContainer = connect(mapStateToProps, mapDispatchToProps)(ToDo)

export default ToDoContainer;
