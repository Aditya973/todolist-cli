#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import { createTask,updateTask,removeTask,listTasks } from "./index.js";
import db from './models/index.js'

const program = new Command();

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Task Title:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Task Description:'
    }
]

program
    .version('1.0.0')
    .description('Command Line Todo List Application')


//ADD COMMAND
program
    .command('add')
    .alias('a')
    .description('Add Task')
    .action(()=>{
        inquirer.prompt(questions).then(async(answer) => await createTask(answer));
    })

//UPDATE COMMAND
program
    .command('update <_id>')
    .alias('u')
    .description('Update a Task')
    .action(async (_id) => {
        const task = await db.Task.findByPk(_id);
        if(!task){
            console.error('Invalid Id!!! The task does not exist!!!');
            return;
        }
      inquirer.prompt(questions).then(async (answers) => await updateTask(_id, answers));
    });

//COMMAND TO MARK TASK COMPLETE
program
    .command('mark <_id>')
    .alias('m')
    .description('Mark a task Completed')
    .action(async(_id) =>{
        try {
            const task = await db.Task.findByPk(_id);
            if(!task){
                console.info('Invalid Id!!! The task does not exist.');
                return;
            }
            if(task.completed === 'Yes'){
                console.info('The task is already marked Completed');
                return;
            }
            task.completed = 'Yes';
            await task.save();
            console.info('Task marked completed')
        } catch (error) {
            console.error('something went wrong',error)
        }
    });

//DELETE COMMAND
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a Task')
    .action(async(_id) => {
        try {
            const task = await db.Task.findByPk(_id);
            if(!task){
                console.error('Invalid Id!!! The Task does not exist.')
                return;
            }
            await removeTask(_id);
        } catch (error) {
            console.error('something went wrong',error)
        }
    });

//LIST ALL TASKS COMMAND
program
    .command('list')
    .alias('l')
    .description('List all Tasks')
    .action(async() => await listTasks());


program.parse(process.argv)