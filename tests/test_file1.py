import unittest
from to_Do_List import To_Do_List

class TestToDo(unittest.TestCase):

    # Create unittest which shows the object has been created result = (task,[date,priority,status])

    def setUp(self):
        self.test = To_Do_List()
        self.test.append_to_list("Create a class","29/01/2024","Urgent")

    def test_append_to_list_output_message(self): # Create a new to-do list task and test output message informing the user of success.
        result = self.test.append_to_list("Create a class","29/01/2024","Urgent")
        self.assertEqual(result, 'Task: "Create a class" added with date: "29/01/2024", priority: "Urgent", status: "Incomplete".\n')

    def test_append_to_list_key_in_list(self): # Check that the new To-Do list task that has been created in setup creates the new key(task name)
        self.assertIn("Create a class", self.test)
    
    def test_append_to_list_value_in_list(self): # Ensure that the to-do list values have been added to the to-do list task
        self.assertEqual(self.test["Create a class"],["29/01/2024", "Urgent", "Incomplete"])

    def test_append_to_list_incorrect_task_not_in_list(self): # Ensure that there are no other keys in the list with a different name - Revisit this possibly not sure I see the value in this test.
        self.assertNotIn("Hello", self.test)
    
    def test_append_to_list_exception_BadKeyError(self): # Checks that error message is thrown when user tries to enter a "blank" task for the task name
        result = self.test.append_to_list("","29/01/2024","Urgent")
        self.assertEqual(result, 'New task: "" was not valid. Please enter a task name that consists of text and numbers.\n')

    def test_append_to_list_exception_ShortKeyNameError(self): # Checks error thrown if the user tries to enter a task name with too few characters
        result = self.test.append_to_list("abc","29/01/2024","Urgent")
        self.assertEqual(result, 'New task: "abc" was not valid. Please enter a longer description of the task.\n')
    
    def test_append_to_list_exception_ValueError1(self): # String "hello" entered in the date parameter
        result = self.test.append_to_list("Create a class","hello","Urgent")
        self.assertEqual(result, 'Date due: "hello" for Task: "Create a class" was not valid.  Please enter a valid date using the following format dd/mm/yyyy.\n')

    def test_append_to_list_exception_ValueError2(self): # Invalid date used
        result = self.test.append_to_list("Create a class","32/01/2024","Urgent")
        self.assertEqual(result, 'Date due: "32/01/2024" for Task: "Create a class" was not valid.  Please enter a valid date using the following format dd/mm/yyyy.\n')

    def test_append_to_list_exception_ValueError3(self): # Testing a leap year
        result = self.test.append_to_list("Create a class","29/02/2024","Urgent")
        self.assertNotEqual(result, 'Date due: "29/02/2024" for Task: "Create a class" was not valid.  Please enter a valid date using the following format dd/mm/yyyy.\n')
    
    # Write a test for append to list where the user enters the date 29 Feb but for a year that is not a leap year.
        
    def test_delete_task_output_message(self): # Checks that output message is output when the user deletes a to-do list item present in the object
        result = self.test.delete_task("Create a class")
        self.assertEqual(result, 'Task: "Create a class" was deleted from the list.\n')   
    
    def test_delete_task_output_task_deleted(self): # Checks that the item has actually been deleted by checking that the item name is no longer in contained as a key in the object
        self.test.delete_task("Create a class")
        self.assertNotIn("Create a class", self.test)
    
    def test_change_date_due_output_message(self): # Tests that the correct output message ouput when the user successfully changes the date item of the to-do list
        result = self.test.change_date_due("Create a class", "02/02/2024")
        self.assertEqual(result, 'Date for Task: "Create a class" changed to "02/02/2024".\n')
    
    def test_change_date_due_changed_date_in_list(self): # Test that the date value has actually been changed.
        self.test.change_date_due("Create a class", "02/02/2024")
        self.assertEqual(self.test["Create a class"][0], "02/02/2024")
    
    def test_change_date_due_changed_date_in_list_leapyear(self): # Test that if it is a leapyear 29 Feb is a valid date.
        self.test.change_date_due("Create a class", "29/02/2024")
        self.assertEqual(self.test["Create a class"][0], "29/02/2024")
    
    def test_change_date_due_changed_date_and_priority_and_status_in_list(self): # Test that a change in date leaves the other items unaffected whilst the date changes
        self.test.change_date_due("Create a class", "02/02/2024")
        self.assertEqual(self.test["Create a class"], ["02/02/2024","Urgent","Incomplete"])
    
    def test_change_date_due_old_date_not_in_list(self): # Check that the old date is no longer in the list
        self.test.change_date_due("Create a class", "02/02/2024")
        self.assertNotEqual(self.test["Create a class"][0], "29/01/2024")
    
    def test_change_date_due_exception_KeyError(self): # Test that the user cannot change the date for a to-do list item that is not already present in the test object
        result = self.test.change_date_due("hello", "02/02/2024")
        self.assertEqual(result, 'Date not changed to "02/02/2024" as the Task: "hello" is not in the list\n')
    
    def test_change_date_due_exception_ValueError1_output_message(self): # Check that the user cannot enter an erroneous argument for date due and that the correct error message is thrown.
        result = self.test.change_date_due("Create a class", "hello")
        self.assertEqual(result, 'Date for Task: "Create a class" not changed to "hello". Please enter a valid date using format dd/mm/yyyy\n')
    
    def test_change_date_due_exception_ValueError2_output_message(self): # Check that an erroneous date cannot be entered as a date argument and that the correct error message is thrown.
        result = self.test.change_date_due("Create a class", "32/01/2024")
        self.assertEqual(result,'Date for Task: "Create a class" not changed to "32/01/2024". Please enter a valid date using format dd/mm/yyyy\n')

    def test_change_date_due_exception_ValueError3_output_message(self): # Check that a valid leap year date does not throw an error message.
        result = self.test.change_date_due("Create a class", "29/02/2024")
        self.assertNotEqual(result,'Date for Task: "Create a class" not changed to "32/01/2024". Please enter a valid date using format dd/mm/yyyy\n')
    
    def test_change_priority_output_message(self): # Check that the output message is generated when the user successfully changes the priority
        result = self.test.change_priority("Create a class","Medium")
        self.assertEqual(result, "Priority for Task: \"Create a class\" changed to \"Medium\".\n")
    
    def test_change_priority_priority_in_list(self): # Check that the new priority is actually present in the list.
        self.test.change_priority("Create a class","Medium")
        self.assertEqual(self.test["Create a class"][1], "Medium")
    
    def test_change_priority_changed_priority_and_date_and_status_in_list(self): # Check that the changed priority is in the list, but the other data remains unaffected.
        self.test.change_priority("Create a class", "Medium")
        self.assertEqual(self.test["Create a class"], ["29/01/2024", "Medium", "Incomplete"])
    
    def test_change_priority_old_priority_not_in_list(self): # Check that the priority has in fact been changed and that the old value is no longer present.
        self.test.change_priority("Create a class","Medium")
        self.assertNotEqual(self.test["Create a class"][1], "Urgent")

    def test_change_priority_exception_KeyError_ouput_message(self): # Check that the output message is output when an incorrect task name is input.
        result = self.test.change_priority("hello","Medium")
        self.assertEqual(result,'Priority not changed as Task: "hello" is not in the list.\n')

    def test_complete_ouput_message(self): # Checks that the correct output message is ouput when the user successffully changes the status of the task to complete
        result = self.test.complete("Create a class")
        self.assertEqual(result,'Status of Task: "Create a class" changed to "Complete".\n')   

    def test_complete_status_in_list(self): # Checks that the status has been changed and present
        self.test.complete("Create a class")
        self.assertEqual(self.test["Create a class"][2], "Complete")

    def test_complete_changed_status_date_priority_in_list(self): # Tests that although the status of the task has changed the other task data remains unchanged and present
        self.test.complete("Create a class")
        self.assertEqual(self.test["Create a class"],["29/01/2024","Urgent","Complete"])
    
    def test_complete_exception_KeyError_ouput_message(self): # Tests that correct error output message is displayed when user input a task that is not present.
        result = self.test.complete("hello")
        self.assertEqual(result, 'Status not changed as Task: "hello" is not in the list.\n')
    
    def test_search_output_message(self): # Tests if task is in the To-Do list
        result = self.test.search("Create a class")
        self.assertEqual(result, 'Task: "Create a class" is in the To-Do list.\n')
    
    def test_search_exception_KeyError_output_message(self): # Tests that the task is not in the To-Do List
        result = self.test.search("hello")
        self.assertEqual(result, 'Task: "hello" is not in the To-Do list.\n')

    def test_reorder_list_output_message(self): # Tests that the correct output is produced if the two list items are successfully swapped.
        self.test.append_to_list("Instantiate an object","29/01/2024","Urgent")
        result = self.test.reorder_list("Create a class","Instantiate an object")
        self.assertEqual(result,'"Create a class" and "Instantiate an object" were successfully swapped.\n')
    
    def test_reorder_list_output_message(self): # Tests that the correct output is produced if the two list items are successfully swapped.
        self.test.append_to_list("Instantiate an object","29/01/2024","Urgent")
        self.test.reorder_list("Create a class","Instantiate an object")
        self.assertEqual([i for i in self.test],["Instantiate an object","Create a class"])
    
    def test_reorder_list_output_message_bAndaSwapped(self): # Test that the correct ouput is produced if the two list istems are successfully swapped.  The order of the two items is reversed in comparison to the previous test
        self.test.append_to_list("Instantiate an object","29/01/2024","Urgent")
        self.test.reorder_list("Instantiate an object","Create a class")
        self.assertEqual([i for i in self.test],["Instantiate an object","Create a class"])
    
    def test_reorder_list_exception_TaskErrorC_output_message(self): # Test that TaskErrorC error message is ouput if both the tasks input by user are not in the list.
        self.test.append_to_list("Instantiate an object","29/01/2024","Urgent")
        result = self.test.reorder_list("hello","hi")
        self.assertEqual(result, 'Both Tasks: "hello" and "hi" are not in the To-Do List.\n')
    
    def test_reorder_list_exception_TaskErrorA_output_message(self): # Test that TaskErrorA error message is output if task_a is not present in the list.
        self.test.append_to_list("Instantiate an object","29/01/2024","Urgent")
        result = self.test.reorder_list("hello","Instantiate an object")
        self.assertEqual(result, 'The Task: "hello" is not in the To-Do List so the tasks "hello" and "Instantiate an object" were not swapped.\n')

    def test_reorder_list_exception_TaskErrorB_output_message(self): # Test that TaskErrorB error message is output if task_b is not present in the list.
        self.test.append_to_list("Instantiate an object","29/01/2024","Urgent")
        result = self.test.reorder_list("Create a class","hello")
        self.assertEqual(result, 'The Task: "hello" is not in the To-Do List so the tasks "hello" and "Create a class" were not swapped.\n')
    
     
if __name__ == '__main__':
    unittest.main()