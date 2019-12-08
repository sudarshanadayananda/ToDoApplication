import React, { Component } from 'react';

import CategoryType from '../../static/CategoryType';
import TaskStatus from '../../static/TaskStatus';
import NotificationType from '../../static/NotificationType';
import axios from '../../axios-orders';

import classes from './HomeBody.module.css';
import CategoryItems from '../CategoryItems/CategoryItems';
import Input from '../UI/Input/Input';
import ToDoItem from '../ToDoItem/ToDoItem';
import ToggleButtons from '../UI/ToggleButtons/ToggleButtons';
import Notification from '../Notification/Notification';

class HomeBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCategoryType: CategoryType.ALL,
            todoItem: null,
            todoItems: [],
            toggleAllStatus: TaskStatus.TODO
        };
        this.notification = React.createRef();
    }

    componentDidMount() {
        axios.get('/api/task')
            .then(res => {
                if (res.status === 200) {

                    const items = res.data.data;
                    const todos = [];
                    const actives = [];
                    const completed = [];
                    let toggleAllStatus = TaskStatus.TODO;
                    if (items.length > 0) {
                        items.forEach(item => {
                            if (item.status === TaskStatus.TODO)
                                todos.push(item);
                            if (item.status === TaskStatus.ACTIVE)
                                actives.push(item);
                            if (item.status === TaskStatus.COMPLETED)
                                completed.push(item);
                        });
                        if (todos.length === 0 && completed.length === 0)
                            toggleAllStatus = TaskStatus.ACTIVE;
                        if (todos.length === 0 && actives.length === 0)
                            toggleAllStatus = TaskStatus.COMPLETED;
                        this.props.activeCountChanged(actives.length);
                    }
                    this.setState({ todoItems: items, toggleAllStatus: toggleAllStatus });
                }
            })
            .catch(error => {
                this.notification.current.showNotification(NotificationType.ERROR, 'Failed to get tasks.');
            });
    }

    onCategoryItemClickHandler = (categoryType) => {
        this.setState({ currentCategoryType: categoryType });
    }

    keyDownHandler = (e) => {
        if (e.key === 'Enter' && this.state.todoItem) {
            this.createToDoItem();
        }
    }

    onInputChangeHandler = (event) => {
        this.setState({ todoItem: event.target.value });
    }

    toggleChangedHandler = (event, status) => {

        const currentItemId = event.currentTarget.parentNode.getAttribute("id");
        const index = this.state.todoItems.findIndex(item => item._id === currentItemId);
        const currentItem = index > -1 ? this.state.todoItems[index]: null;
        
        if (currentItem) {
            if (currentItem.status === TaskStatus.COMPLETED && status === TaskStatus.COMPLETED) {
                return;
            }
            if (currentItem.status === TaskStatus.ACTIVE && status === TaskStatus.ACTIVE) {
                return;
            }
            if (currentItem.status === TaskStatus.COMPLETED && status === TaskStatus.ACTIVE) {
                this.notification.current.showNotification(NotificationType.WARN, 'Compeleted tasks cannot active again.');
                return;
            }
            if (currentItem.status === TaskStatus.TODO && status === TaskStatus.COMPLETED) {
                this.notification.current.showNotification(NotificationType.INFO, 'Put task to active before complete.');
                return;
            }
            const data = { id: currentItemId, status: status };
            axios.put('/api/task', data)
                .then(res => {
                    if (res.status === 200) {
                        const updated = res.data.data;
                        const oldItems = [...this.state.todoItems];
                        const index = oldItems.findIndex(item => item._id === updated._id);
                        if (index > -1) {
                            oldItems[index].status = updated.status;
                            this.setState({ todoItems: oldItems});
                            const activeCount = oldItems.filter(item => item.status === TaskStatus.ACTIVE).length;
                            this.props.activeCountChanged(activeCount);
                        }
                    }
                })
                .catch(error => this.notification.current.showNotification(NotificationType.ERROR, 'Failed to update item.'));
        }
    }

    toggleAllChangeHandler = (event, status) => {

        let data = null;
        if (this.state.toggleAllStatus === status)
            return;
        if (status === TaskStatus.ACTIVE)
            data = { currentStatus: TaskStatus.TODO, newStatus: TaskStatus.ACTIVE };
        if (status === TaskStatus.COMPLETED)
            data = { currentStatus: TaskStatus.ACTIVE, newStatus: TaskStatus.COMPLETED };
        axios.put('/api/task/many', data)
            .then(res => {
                if (res.status === 200) {
                    const oldItems = [...this.state.todoItems];
                    const updated = res.data.data;
                    if (updated.ok === 1) {
                        if (status === TaskStatus.ACTIVE) {
                            oldItems.map(item => {
                                return (item.status === TaskStatus.TODO) ?  item.status = TaskStatus.ACTIVE: item;
                            });
                        }
                        if (status === TaskStatus.COMPLETED) {
                            oldItems.map(item => {
                                return (item.status === TaskStatus.ACTIVE) ?  item.status = TaskStatus.COMPLETED: item;
                            });
                        }
                        const activesCount = oldItems.filter(item => item.status === TaskStatus.ACTIVE).length;
                        const completedCount = oldItems.filter(item => item.status === TaskStatus.COMPLETED).length;
                        const allTaskCount = oldItems.length;
                        let toggleAllStatus = TaskStatus.TODO;
                        if (activesCount === allTaskCount)
                            toggleAllStatus = TaskStatus.ACTIVE;
                        if (completedCount === allTaskCount)
                            toggleAllStatus = TaskStatus.COMPLETED;
                        this.props.activeCountChanged(activesCount);  
                        this.setState({todoItems: oldItems, toggleAllStatus: toggleAllStatus });
                    }
                    
                }
            })
            .catch(error => this.notification.current.showNotification(NotificationType.ERROR, 'Failed to update item.'));
    }

    createToDoItem = () => {
        const data = { name: this.state.todoItem, status: TaskStatus.TODO };

        axios.post('/api/task', data)
            .then(res => {

                if (res.status === 200) {
                    const newTodoItem = res.data.data;
                    const oldItems = [...this.state.todoItems];
                    oldItems.push(newTodoItem);
                    this.setState({todoItems: oldItems, todoItem: null });
                    this.notification.current.showNotification(NotificationType.SUCCESS, 'Item added successfully.');
                }
            }).catch(error => {
            
                this.notification.current.showNotification(NotificationType.ERROR, 'Failed to add item.');
            });
    }

    render() {
        
        const todoItems = (this.state.todoItems.length > 0) ? [...this.state.todoItems] : null;
        let viewTodoItems = null;
        if (todoItems) {
            if (this.state.currentCategoryType === CategoryType.ACTIVE)
                viewTodoItems = todoItems.filter(item => item.status === TaskStatus.ACTIVE);
            else if (this.state.currentCategoryType === CategoryType.COMPLETED)
                viewTodoItems = todoItems.filter(item => item.status === TaskStatus.COMPLETED);
            else viewTodoItems = todoItems;
        }
        return (
            <div className={classes.HomeBody}>

                <div className={classes.Input}>
                    <Input
                        type='text'
                        placeholder='Add new todo item'
                        keyDown={this.keyDownHandler}
                        onChange={(e) => this.onInputChangeHandler(e)}></Input>
                </div>
                
                <div className={classes.ToDoItems}>
                    <ToggleButtons 
                        toggleChanged={this.toggleAllChangeHandler} 
                        status={this.state.toggleAllStatus} /><h6>TASK</h6>
                    <ul>
                        {this.state && this.state.todoItems.length > 0 && 
                            viewTodoItems.map((item) => <ToDoItem 
                                                        item={item} 
                                                        key={item._id}
                                                        id={item._id}
                                                        toggleChanged={this.toggleChangedHandler} /> )}
                    </ul>
                </div>

                <div className={classes.CategoryItems}>
                    <nav>
                        <CategoryItems
                            selected={this.state.currentCategoryType}
                            catItemClicked={this.onCategoryItemClickHandler}></CategoryItems>
                    </nav>
                </div>
                <Notification ref={this.notification} />
            </div>
        )
    }
}

export default HomeBody;