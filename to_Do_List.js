// Custom error class for Invalid Tasks input by the user.
class InvalidTaskError extends Error{
    constructor(message = "Invalid Task Error"){
        super(message);
        this.name = 'InvalidTaskError';
    }
}


// Custom error class for Invalid Priority input by the user.
class InvalidPriorityError extends Error{
    constructor(message = "Invalid Priority Error"){
        super(message);
        this.name = "InvalidPriorityError";
    }
}

// Custom error class for Invalid date input by the user
class InvalidDateError extends Error{
    constructor(message = "Invalid Date Error"){
        super(message);
        this.name = "InvalidDateError";
    }
}

// To_Do_List class created here.
// module.exports = class To_Do_List {
class To_Do_List {

    constructor(){
        this.to_do = []; //new Array();
    }

    // method to test that dates are correct and formatted in the following way dd/mm/yyyy
    valid_date(date){
        if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)){
            return false;
        }
        let dateSplit = date.split("/");
        let d = parseInt(dateSplit[0], 10);
        let m = parseInt(dateSplit[1], 10);
        let y = parseInt(dateSplit[2], 10);

        if (m < 1 || m > 12){
            return false;
        }

        const days = [31,28,31,30,31,30,31,31,30,31,30,31];

        if (!(y % 400) || (y % 100 && !(y % 4))) {
            days[1] = 29;
        }

        if (d < 1 || d > days[m-1]){
            return false;
        }
        
        return true;

    }

    // method to append to the To-Do List
    append_to_list(task,date,priority,status="Incomplete"){
        try{
            if (!task) throw new InvalidTaskError(`New Task: "${task}" was not valid.  Please enter a task name that consists of text and nummbers.`);
            if (task.length <= 3) throw new InvalidTaskError(`New Task: "${task}" was not valid.  Please enter a longer description for this task.`);
            if (!["Low", "Medium", "Urgent"].includes(priority)) throw new InvalidPriorityError(`Priority: "${priority}" was not valid.  Please enter "Low", "Medium" or "Urgent".`)
            for (let i = 0; i < this.to_do.length; i++){
                if(this.to_do[i][0] == task){
                    throw new InvalidTaskError(`New Task: "${task}" was not valid.  This task is already in the list.`)                
                }
            }
            if (!this.valid_date(date)) throw new InvalidDateError(`New Date: "${date}" was not valid.  Please enter a valid date in the following format dd/mm/yyyy.`)
            
            this.to_do.push([task,date,priority,status]);

        }
        catch(error){
            console.error(`${error.name}: ${error.message}\n`);
        }

    }

    // method to print the list 
    get_list(){    
        if(!this.to_do.length){
            console.log('There are no tasks in this to-do list.');
        }
        else {        
            let ind = 1;
            console.log("\nTask".padEnd(60)+"Date Due".padEnd(16)+"Priority".padEnd(14)+"Status");
            console.log("-".repeat(99));
            for (let i = 0; i < this.to_do.length; i++){
                console.log(`${ind + '.' + this.to_do[i][0].padEnd(57)}`+ `${this.to_do[i][1].padEnd(16)}`+ 
                `${this.to_do[i][2].padEnd(14)}`+`${this.to_do[i][3]}`);
                ind ++;
            }
            console.log("-".repeat(99));
        }
    }
    
    // method to delete a list item
    delete_task(task){
        try{
            if(!this.to_do.flat(2).includes(task)) throw new InvalidTaskError(`Task: "${task}" not deleted. The task is not in the list.`)
            this.to_do.splice(this.to_do.indexOf(task));
        }
        catch(error){
            console.error(`${error.name}: ${error.message}\n`)
        }
    }

    // change the date of a list item
    change_date(task, new_date){
        try{     
            let task_index = -1
       
            for (let i = 0; i < this.to_do.length; i++){
                if(this.to_do[i][0] == task){
                    task_index = i;
                    break
                }

            }

            if(task_index == -1) throw new InvalidTaskError(`Task: "${task}" is not in the list.  Date not changed.`);
            if (!this.valid_date(new_date)) throw new InvalidDateError(`Date for Task: "${task}" not changed to "${new_date}".  Please enter a valid date using format dd/mm/yyyy.`);
     
            this.to_do[task_index][1] = new_date

        }
        catch (error){
            console.error(`${error.name}: ${error.message}`)
        }
    
    }  
    
    // change the priority of a list item
    change_priority(task,priority){
        let task_index = -1;
        try {
            if (!["Low", "Medium", "Urgent"].includes(priority)) throw new InvalidPriorityError(`Priority: "${priority}" was not valid.  Please enter "Low", "Medium" or "Urgent".`)
            for (let i = 0; i < this.to_do.length; i++){
                if(this.to_do[i][0] == task){
                    task_index = i;
                
                }

            }

            if(task_index == -1) throw new InvalidTaskError(`Task: "${task}" is not in the list.`)
            this.to_do[task_index][2] = priority;

        }
        catch (error){
            console.error(`${error.name}: ${error.message}`)
        }
    }

    // chhange the status of a list item
    complete(task){
        let task_index = -1;
        try {
            for (let i = 0; i < this.to_do.length; i++){
                if(this.to_do[i][0] == task){
                    task_index = i;                    
                }

            }

            if(task_index == -1) throw new InvalidTaskError(`Task: "${task}" is not in the list.`)
            this.to_do[task_index][3] = "Complete";

        }
        catch (error){
            console.error(`${error.name}: ${error.message}`);
        }
    }

    // search for a task
    search(task){
        try{
            if(!task) throw new InvalidTaskError(`Please enter a task.`)
            for (let i = 0; i < this.to_do.length; i++){
                if(this.to_do[i][0] == task){
                    return `"${task}" is in the list`;
                }
                else{
                    return `"${task}" is not in the list`
                }
            }
        }
        catch (error){
            console.error(`${error.name}: ${error.message}`)
        }
        
    }
    
    // reorder two list items.
    reorder_list(task_a,task_b){
        let index_taskA = -1;
        let index_taskB = -1;

        try {
            
            for (let i = 0; i < this.to_do.length; i++){
                if (this.to_do[i][0] == task_a){
                    index_taskA = i;
                }else if (this.to_do[i][0] == task_b){
                    index_taskB = i;
                }
            
            }
            
            if (index_taskA == -1 && index_taskB == -1) throw new InvalidTaskError(`Both tasks "${task_a}" and "${task_b}" are not in the To-Do list.`)
            if (index_taskA == -1) throw new InvalidTaskError(`The Task: "${task_a}" is not in the To-Do List.`)
            if (index_taskB == -1) throw new InvalidTaskError(`The Task: "${task_b}" is not in the To-Do List.`)
            
            const tempVal = this.to_do[index_taskA];
            this.to_do[index_taskA] = this.to_do[index_taskB];
            this.to_do[index_taskB] = tempVal

        }
        catch (error) {
            console.error(`${error.name}: ${error.message}`);
        }

    }
}

export {To_Do_List};

// const to_do_1 = new To_Do_List();
// to_do_1.append_to_list("Create a class", "12/02/2024", "Low");
// to_do_1.append_to_list("Instantiate an object", "08/02/2024", "Medium");
// to_do_1.append_to_list("Eat dinner","25/02/2024","Urgent")
// to_do_1.delete_task("hello");
// to_do_1.get_list();
// to_do_1.change_date("hello", "29/02/2024");
// to_do_1.get_list();
// to_do_1.change_priority("Create a class", "Low");
// to_do_1.get_list();
// to_do_1.complete("Create a class");
// to_do_1.get_list();
// console.log(to_do_1.search("Create a class"));
// to_do_1.reorder_list("Create a class", "Instantiate an object");
// to_do_1.get_list();
// to_do_1.reorder_list("Instantiate an object", "Eat dinner")
// to_do_1.get_list();
// to_do_1.reorder_list("Create a class","Eat dinner");
// to_do_1.get_list();





// Tasks to complete
// 0. Test the try statements that you have created after change_date() method.
// 2. Find a more concise way to write these try statements - specifically the throw statements ... very long!!!
// 3. Write the unit tests.

// Use of the array data structure
// The use of this array data structure is sufficient for something fairly straightforward like a to-do list, but I do
// not think that it would be sufficient for use in a large dataset when we are looking for a specific entry.  Iteration
// would take too long.  Maybe use a structure made up of objects with an id (potentially in this case the name of the task)
// with nested objects containing that objects particular characteristics, in this example those particular characteristics
// would be Date, Priority, Status. The structure would be as follows using the two examples used in the above code;
// let to_do = {
//         "Create the class" : {
//             'Date': "13/02/2024",
//             'Priority' : "Medium",
//             "Status": "Incomplete"
//         }
//         "Instantiate the object" : {
//             'Date': "13/02/2024",
//             'Priority' : "Medium",
//             "Status": "Incomplete"
//         }
// }
// Maybe consider using the forOf loop and usinf a map data structure.This is a new version of for loop. This loop requires 
// assigning a temporary name to each element of the array. It runs extremely fast in the case of small data sets. It is much more 
// readable in comparison to the traditional for loop. It performs an iteration over JavaScript’s in-built iterate objects like 
// String, Map, Set, and Array.


