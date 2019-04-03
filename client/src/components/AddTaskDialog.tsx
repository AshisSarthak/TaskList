import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import './toDolist.scss';
import { ToDoItem } from './ToDoListContainer';
import { TaskStatus } from './TaskList';
import axios from 'axios';

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

interface AddTaskDialogProps {
    hideAddtaskPopup: () => void;
    addTaskToList?: (toDoItem: ToDoItem) => void;
}

class AddTaskDialog extends React.Component<AddTaskDialogProps> {
    state = {
        open: true,
        name: '',
        desc: ''
    };

    handleClose = () => {
        this.setState({ open: false, name: '', desc: '' });
        this.props.hideAddtaskPopup();
    };

    handleChange = (name: string) => (event: any) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    addTaskToDB = () => {
        const newTask = {
            name: this.state.name,
            desc: this.state.desc,
            status: TaskStatus.PENDING,
        }
        this.handleAddTask(newTask);
    }

    handleAddTask = (task: ToDoItem) => {
        this.props.addTaskToList &&
            this.props.addTaskToList(task);
        this.handleClose();

    }

    render() {
        return (
            <React.Fragment>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Add Task"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="outlined-name"
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            rowsMax="4"
                            value={this.state.desc}
                            onChange={this.handleChange('desc')}
                            margin="normal"
                            placeholder="Description"
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addTaskToDB} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default AddTaskDialog;