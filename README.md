## To-Do List Application
A command line application that allows user to:
1. Create a new task
2. View all the tasks
3. Mark tasks as completed
4. Delete tasks

## Installation and Setup Instructions
Clone down this repository. You will need node, npm and git installed globally on your machine.

`git clone <GITHUB_REPOSITORY_URL>` 

### Install dependencies
After cloning the repository open the directory and run the following command in your terminal

`npm install`

### Configure mysql database
Inside the config folder open the **config.json** file

1. In the development configuration, add your mysql username, password and a database name
    
    `

        "development": {
        "username": "root",
        "password": "<Mysql_Password>",
        "database": "<Database_Name>",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "logging": false
        }
        
    `
2. Run this command to create a database `npx sequelize db:create`
3. To run the migration use the command `npx sequelize db:migrate`

## Setup CLI
1. Run the command `npm link`
2. Open a Git Bash or command prompt window and type the command `todolist-cli --version` it will show 1.0.0

## Use CLI
1. To add a new Task run `todolist-cli add` or `todolist-cli a`
2. To list all the tasks run `todolist-cli list` or `todolist-cli l`
3. To mark a task as completed run `todolist-cli mark <TaskId>` or `todolist-cli m <Taskid>`
4. To update a task run `todolist-cli update <TaskId>` or `todolist-cli u <TaskId>`
5. To delete a task run `todolist-cli remove <TaskId>` or `todolist-cli r <TaskId>`
