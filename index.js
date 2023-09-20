const {Task} = require('./models/index')

//Add task to database
const createTask = async (task) => {
    try {
        if(!task.title){
            console.info('Title can not be blank!!!')
            return;
        }
        if(!task.description){
            console.info('Description can not be blank!!!');
            return;
        }
        await Task.create(task);
        console.info('task added');
    } catch (error) {
        console.error('something went wrong',error);
    }
}

//update task and save to database
const updateTask = async (id,data) => {
    try {
        const task = await Task.findByPk(id);
        if(data.title){
            task.title = data.title;
        }
        if(data.description){
            task.description = data.description;
        }
        await task.save();
        console.info('Task Updated Successfully');
    } catch (error) {
        console.error('something went wrong',error);
    }
}

//Delete task from database
const removeTask = async(taskId) => {
    try {
        await Task.destroy({
            where: {
                id: taskId
            }
        })
        console.info('Task Deleted')
    } catch (error) {
        console.error('something went wrong',error);
    }
}

//Fetch all the task from the database
const listTasks = async() => {
    try {
        let tasks = await Task.findAll();
        tasks.map((task)=>{
            console.info(`TaskId: ${task.id}`)
            console.info(`Title: ${task.title}`)
            console.info(`Description: ${task.description}`)
            console.info(`Completed: ${task.completed}`)
            console.info('---------------------------------------------------------')
        })
        console.info(`${tasks.length} tasks`)
    } catch (error) {
        console.error('something went wrong',error);
    }
}

module.exports = {
    createTask,
    updateTask,
    removeTask,
    listTasks
}