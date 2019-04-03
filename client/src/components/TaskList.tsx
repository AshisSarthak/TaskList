import React from 'react';
import { ToDoItem } from './ToDoListContainer';
import { Task } from './Task';
import { connect } from 'react-redux';
import { store } from '..';
import { GridList } from '@material-ui/core';
import axios from 'axios';

export enum TaskStatus {
    ALL,
    PENDING,
    COMPLETED
};

interface TaskPageState {
    toDos: ToDoItem[];
}

interface TaskPageProps {
    toDos: ToDoItem[];
    status?: TaskStatus;
    deleteTask?: () => {};
    completeTask?: (id: number) => void;
}

export class TaskPage extends React.Component<TaskPageProps, TaskPageState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const filteredToDo = this.props.toDos;
        return (
            <React.Fragment>
                <section className="taskCards">
                    <GridList cellHeight={160} cols={5}>
                        {
                            Object.entries(filteredToDo).map((todo: [string, ToDoItem], index: any) => {
                                return (
                                    <Task
                                        key={index}
                                        toDo={todo[1]}
                                        completeTask={this.props.completeTask}
                                        deleteTask={this.props.deleteTask}
                                    />
                                )
                            })
                        }
                    </GridList>
                </section>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = () => {
    return ({
        completeTask: (id: number) => {
            store.dispatch({ type: 'COMPLETE_TASK', payload: { id: id, status: TaskStatus.COMPLETED } });
        },
        deleteTask: (id: number) => {
            store.dispatch({ type: 'DELETE_TASK', payload: { id: id } });
        }
    })
};
const mapStateToProps = (state: any) => ({
    toDos: state.toDos || [],
    status: state.pageViewMode
});

const TaskContainer = connect(mapStateToProps, mapDispatchToProps)(TaskPage)

export default TaskContainer;