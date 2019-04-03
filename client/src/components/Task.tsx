import React from 'react';
import { ToDoItem } from './ToDoListContainer';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { TaskStatus } from './TaskList';
import IconButton from '@material-ui/core/IconButton';
import './toDolist.scss';


export interface TaskItemProps {
    toDo: ToDoItem;
    completeTask?: (id: number) => void;
    deleteTask?: (id: number) => void;
}

export class Task extends React.Component<TaskItemProps> {

    constructor(props: TaskItemProps) {
        super(props);
    }

    shouldComponentUpdate() {
        return true;
    }

    handleCompleteTask = (id: number) => {
        this.props.completeTask && this.props.completeTask(id);
    }

    handleDeleteTask = (id: number) => {
        this.props.deleteTask && this.props.deleteTask(id);
    }

    render() {
        return (
            <Card className="taskCard">
                <CardHeader 
                    title={this.props.toDo.name}
                    action={
                        (this.props.toDo.status === TaskStatus.COMPLETED) &&
                        <IconButton disabled className="success">
                          <DoneIcon />
                        </IconButton>
                      }
                >
                </CardHeader>
                <CardContent>
                    {
                        this.props.toDo.desc
                    }
                </CardContent>
                <CardActions>
                    <Fab aria-label="Delete" color="secondary" onClick={() => this.handleDeleteTask(this.props.toDo.id as number)}>
                        <DeleteIcon />
                    </Fab>
                    {
                        (this.props.toDo.status === TaskStatus.PENDING) &&
                        <Fab aria-label="Mark As Complete" color="primary" onClick={() => this.handleCompleteTask(this.props.toDo.id as number)}>
                            <DoneIcon />
                        </Fab>
                    }
                </CardActions>
            </Card>
        );
    }

}