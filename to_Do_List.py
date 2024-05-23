# Import datetime class to use and validate dates that the user enters
from datetime import datetime

# Base class for other exceptions
class Error(Exception):
    pass

# Create custom exception inheriting from Error Class.  That throws an exception if the user enter a blank ("") string for the task
# dictionary key
class BadKeyNameError(Error):
    pass

# Custom exception if the description of the task is too short to be sufficiently descriptive
class ShortKeyNameError(Error):
    pass

# Custom exception cheking if a task is in the To-Do list for reorder function
class TaskErrorA(Error):
    pass

# Second custom exception checking if a task is in the To-Do list for reorder function
class TaskErrorB(Error):
    pass

# Third custom exception checking if a task is in the To-Do list for reorder function.  This exception is used if both tasks are not present in the To-Do List
class TaskErrorC(Error):
    pass

# Create the T0_Do_List class
class To_Do_List:
    def __init__(self):
        self.to_do = {}

    def __iter__(self):
        return iter(self.to_do)
    
    def __getitem__(self,item):
        return self.to_do[item]
    
    # function to add a new item to the to do list dictionary
    def append_to_list(self,task,date,priority,status="Incomplete"):
        try:
            if task == "":
                raise BadKeyNameError
            if len(task) <= 3:
                raise ShortKeyNameError
            date = datetime.strptime(date, '%d/%m/%Y')
            date = date.strftime('%d/%m/%Y')
        except BadKeyNameError:
            return f'New task: "{task}" was not valid. Please enter a task name that consists of text and numbers.\n'
        except ShortKeyNameError:
            return f'New task: "{task}" was not valid. Please enter a longer description of the task.\n'
        except ValueError:
            return f'Date due: "{date}" for Task: "{task}" was not valid.  Please enter a valid date using the following format dd/mm/yyyy.\n'
        else:
            self.to_do[task] = [date,priority,status]
            return f'Task: "{task}" added with date: "{date}", priority: "{priority}", status: "{status}".\n'

                        
    # delete a task from the list
    def delete_task(self, task):
        try:
            self.to_do.pop(task)
        except KeyError:
            return f'Task: "{task}" not deleted. The task is not in the list.\n'
        else:
            return f'Task: "{task}" was deleted from the list.\n'
    
    # change the date due for a specific to do list task
    def change_date_due(self, task, new_date):
        try:
            date_obj = datetime.strptime(new_date,'%d/%m/%Y')
            self.to_do[task][0] = date_obj.strftime('%d/%m/%Y')
        except KeyError:
            return f'Date not changed to "{new_date}" as the Task: "{task}" is not in the list\n'
        except ValueError:
            return f'Date for Task: "{task}" not changed to "{new_date}". Please enter a valid date using format dd/mm/yyyy\n'
        else:
            return f'Date for Task: "{task}" changed to "{new_date}".\n'
    
    # change the priority for a specific to do list task
    def change_priority(self, task, priority):  
        try:
            self.to_do[task][1] = priority
        except KeyError:
            return f'Priority not changed as Task: "{task}" is not in the list.\n'
        else:
            return f'Priority for Task: "{task}" changed to "{priority}".\n'
    
    # change the status of the task to completed
    def complete(self,task):
        try:
            self.to_do[task][2] = "Complete"
        except KeyError:
            return f'Status not changed as Task: "{task}" is not in the list.\n'
        else:
            return f'Status of Task: "{task}" changed to "Complete".\n'
    
    # Search for a task in the list.  Return a True or False value if task is in the To-Do List.
    def search(self,task):
        try:
            if task not in self.to_do:
                raise KeyError
            return f'Task: "{task}" is in the To-Do list.\n'
        except KeyError:
            return f'Task: "{task}" is not in the To-Do list.\n'
        
    # Function to reorder two tasks
    def reorder_list(self,task_a,task_b):
        
        try:
            if task_a not in self.to_do and task_b not in self.to_do:
                raise TaskErrorC
            if task_a not in self.to_do:
                raise TaskErrorA
            elif task_b not in self.to_do:
                raise TaskErrorB


            self.to_do = list(self.to_do.items())

            index_taskA = 0
            index_taskB = 0
            
            for i in range(len(self.to_do)):
                if self.to_do[i][0] == task_a:
                    index_taskA += i
                if self.to_do[i][0] == task_b:
                    index_taskB += i
            
            self.to_do[index_taskA],self.to_do[index_taskB] = self.to_do[index_taskB],self.to_do[index_taskA]
            self.to_do = dict(self.to_do)
        except TaskErrorA:
            return f'The Task: "{task_a}" is not in the To-Do List so the tasks "{task_a}" and "{task_b}" were not swapped.\n'   
        except TaskErrorB:
            return f'The Task: "{task_b}" is not in the To-Do List so the tasks "{task_b}" and "{task_a}" were not swapped.\n'
        except TaskErrorC:
            return f'Both Tasks: "{task_a}" and "{task_b}" are not in the To-Do List.\n'
        else:
            return f'"{task_a}" and "{task_b}" were successfully swapped.\n'
        
    
    # function to return the to do list
    def get_list(self):
        print(f"{'Task Name':60} {'Date Due':12} {'Priority':10} Status")
        print("-" * 95)
        for i,(k,v) in enumerate(self.to_do.items(),1):
            print(f'{str(i)+". "+k:60} {v[0]:12} {v[1]:10} {v[2]}')
        print("-" * 95)
        # return("\n")

# to_do_1 = To_Do_List()
# print(to_do_1.append_to_list("Create a class", "23/01/2024", "Urgent"))
# print(to_do_1["Create a class"])
# print(to_do_1.change_date_due("Create a class", "02/02/2024"))
# print(to_do_1["Create a class"])
# print(to_do_1.append_to_list("","29/01/2024","Urgent"))
# to_do_1.append_to_list("Instantiate an Object", "24/01/2024", "Urgent")
# to_do_1.append_to_list("Eat Dinner", "hello", "Urgent")
# to_do_1.append_to_list("Drink a beer", "25/01/2024", "Urgent")
# to_do_1.get_list()
# print(to_do_1.reorder_list("Instantiate an Object","Create a class"))
# to_do_1.get_list()
# print(to_do_1["Create a class"] == ["23/01/2024", "Urgent", "Incomplete"])

# keys =([i for i in to_do_1])
# print(keys)
# print(to_do_1["Create a class"])
# print("Create a class" in to_do_1)
# to_do_1.reorder_list("Create a class", "Drink a beer")
# to_do_1.reorder_list("hello", "Drink a beer")
# to_do_1.reorder_list("Drink a beer", "hello")
# to_do_1.get_list()
# to_do_1.search("Drink a beer")
# to_do_1.search("Hello")
        

#### Tasks ####
# 1. Continue writing unit tests - change priority method
# 2. Write some exceptions to catch errors where the user does not enter all the parameters required for the methods.
# 3. for change_date method enter an exception where if the user enters the same date ie it's not changed message appears
#    informing the user that the date has not changed because the date entered was the same.
# 4. Write exceptions that ensure that the user enters a date as a string in the "dd/mm/yyyy" format for the methods where this is required.
# 5. 


  

