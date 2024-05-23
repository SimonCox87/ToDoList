// Use below in conjunction with common js
// const To_Do_List = require("../to_Do_List_JS.js");

import {expect, jest, test} from'@jest/globals';
import {To_Do_List,InvalidTaskError,InvalidPriorityError,InvalidDateError} from '../to_Do_List.js'

const to_do_test = new To_Do_List();

    beforeEach(() =>{
        jest.clearAllMocks();
        jest.spyOn(console,'error').mockImplementation(jest.fn());
    });


describe("test interface", () => {
    // Test that the interface is working - the valid_date method is available - Research interfaces what are they and how are they defined.

    beforeEach(() =>{
        jest.clearAllMocks();
        jest.spyOn(console,'error').mockImplementation(jest.fn());
    });

    test("defines valid_date()", () => {
        expect(typeof to_do_test.valid_date).toBe("function");
    });

    // Test that append_to_list method is available.
    test("defines append_to_list()", () => {
        expect(typeof to_do_test.append_to_list).toBe("function");
    });

    // Test that get_list method is available.
    test("defines get_list()", () => {
        expect(typeof to_do_test.get_list).toBe("function");
    });

    // Test that delete_task method is available.
    test("defines delete_task()", () => {
        expect(typeof to_do_test.delete_task).toBe("function");
    });

    // Test that change_date method is available.
    test("defines change_date()", () => {
        expect(typeof to_do_test.change_date).toBe("function");
    });

    // Test that change_priority method is available.
    test("defines change_priority()", () => {
        expect(typeof to_do_test.change_priority).toBe("function");
    });

    // Test that complete method is available.
    test("defines complete()", () => {
        expect(typeof to_do_test.complete).toBe("function");
    });

    // Test that search method is available.
    test("defines search()", () => {
        expect(typeof to_do_test.search).toBe("function");
    });

    // Test that reorder_list method is available.
    test("defines reorder_list()", () => {
        expect(typeof to_do_test.reorder_list).toBe("function");
    });

});

describe("test validDates", () => {

    //Write tests for valid_date.  Use fixture

    // Test that valid_date returns true when these correct dates are passed to it.
    const validDates = [
        "01/01/2024","31/01/2024","28/02/2024","29/02/2024","29/02/2000",
        "29/02/2028", "31/07/2024","31/08/2024","15/11/2024", "31/12/2024",
        "1/01/2024","9/01/2024","01/1/2024","01/9/2024","1/1/2024",
        "9/9/2024"
    ]

    test.each(validDates)(
        "valid_Date() passes for validDates value %j",
        (fixture) => expect(to_do_test.valid_date(fixture)).toBe(true)
    );

    // Test that valid_date returns false when these incorrect dates are passed to it.
    const invalidDates = [
        "00/01/2024","32/01/2024","01/00/2024","29/02/2023","31/06/2024",
        "01/13/2024", "001/05/2023","01/005/2023","01/05/2","01/05/20",
        "01/05/202","01/05/20240","01052025","h1/02/2024","01/l2/2024",
        "01/02/hjke", "hello123", "", 
    ]

    test.each(invalidDates)(
        "valid_Date() passed for invalidDates value %j",
        (fixture) => expect(to_do_test.valid_date(fixture)).toBe(false)
    );

});

describe("test append_to_list", () => {

    // test that valid date is called when calling append_to_list class method.
    test("append_to_list() passed when new item('Create a class')", () => {
        const validDateSpy = jest.spyOn(to_do_test, "valid_date");
        
        // check that valid_date method is used when append_to_list is called
        expect(validDateSpy).toHaveBeenCalled(to_do_test.append_to_list("Create a class","20/02/2024","Urgent"));

        // check that the length of the list.  Should only be one array.
        expect(to_do_test.to_do.length).toBe(1);

        // check that the the append_to_list method has created a new array.
        expect(to_do_test["to_do"][0]).toBeInstanceOf(Array);

        // Check that the method has created a new array containing the correct values.
        expect(to_do_test["to_do"][0]).toEqual(["Create a class","20/02/2024","Urgent","Incomplete"]); 


    });

    // test that valid_date is called when calling append_to_list is called.  Adds second item to to-do list
    test("append_to_list() passed additional item added to the list ('Instantiate an object')", () => {
        const validDateSpy = jest.spyOn(to_do_test, "valid_date");
        
        expect(validDateSpy).toHaveBeenCalled(to_do_test.append_to_list("Instantiate a class","20/02/2024","Urgent"));
        expect(to_do_test.to_do.length).toBe(2);
        expect(to_do_test["to_do"][1]).toBeInstanceOf(Array);
        expect(to_do_test["to_do"][1]).toEqual(["Instantiate a class","20/02/2024","Urgent","Incomplete"]); 
        expect(to_do_test["to_do"]).toEqual([["Create a class","20/02/2024","Urgent","Incomplete"],["Instantiate a class","20/02/2024","Urgent","Incomplete"]])
        

        // Remove newly created array
        to_do_test['to_do'].splice(0);
    });


    // test that valid_date is called when calling append_to_list is called with an invalid date parameter.
    test("append_to_list() passes when invalid date used and error thrown", () => {
        const invalidDateSpy = jest.spyOn(to_do_test, "valid_date");

        expect(invalidDateSpy).toHaveBeenCalled(to_do_test.append_to_list("Create a class","hello","Urgent"));
        expect(to_do_test['to_do'].length).toBe(0);
        expect(to_do_test["to_do"][0]).toBeUndefined();
        expect(to_do_test["to_do"]).toEqual([]); 

        // test that the correct error is thrown and corresponding error message is returned.
        try {
            to_do_test.append_to_list("Create a class","hello","Urgent");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidDateError);
            expect(error.message).toBe('New Date: "hello" was not valid.  Please enter a valid date in the following format dd/mm/yyyy.');
        }

    });

    // test that error thrown when user does not enter a task in the append_to_list task parameter.
    test("append_to_list() passes when task not input by the user and error thrown", () => {
        const invalidDateSpy = jest.spyOn(to_do_test, "valid_date");

        // test that valid_date is not called by append_to_list as InvalidTaskError is thrown first.
        expect(invalidDateSpy).not.toHaveBeenCalled(to_do_test.append_to_list("","22/02/2024","Urgent"));
        expect(to_do_test['to_do'].length).toBe(0);
        expect(to_do_test["to_do"][0]).toBeUndefined();
        expect(to_do_test["to_do"]).toEqual([]);
        
        try {
            to_do_test.append_to_list("","22/02/2024","Urgent");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe('New Task: "" was not valid.  Please enter a task name that consists of text and nummbers.');
        }

    });

    // test that error thrown when user does not enters a task in the append_to_list task parameter consisting of three characters or less.
    test("append_to_list() passes when task name consists of three characters or less and error thrown", () => {
        const invalidDateSpy = jest.spyOn(to_do_test, "valid_date");

        expect(invalidDateSpy).not.toHaveBeenCalled(to_do_test.append_to_list("abc","22/02/2024","Urgent"));
        expect(to_do_test['to_do'].length).toBe(0);
        expect(to_do_test["to_do"][0]).toBeUndefined();
        expect(to_do_test["to_do"]).toEqual([]);
        
        try {
            to_do_test.append_to_list("abc","22/02/2024","Urgent");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe('New Task: "abc" was not valid.  Please enter a longer description for this task.');
        }

    });

    // test that error thrown when user enters an invalid priority value in append_to_list task.
    test("append_to_list() passes when invalid priority entered and error thrown", () => {
        const invalidDateSpy = jest.spyOn(to_do_test, "valid_date");

        expect(invalidDateSpy).not.toHaveBeenCalled(to_do_test.append_to_list("Create a class","22/02/2024","hello"));
        expect(to_do_test['to_do'].length).toBe(0);
        expect(to_do_test["to_do"][0]).toBeUndefined();
        expect(to_do_test["to_do"]).toEqual([]);
        
        try {
            to_do_test.append_to_list("Create a class","22/02/2024","hello");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidPriorityError);
            expect(error.message).toBe('Priority: "hello" was not valid.  Please enter "Low", "Medium" or "Urgent"." was not valid.  Please enter a longer description for this task.');
        }

        to_do_test['to_do'].splice(0);

    });

    // test that items are added to the to-do list with the valid priorities "Low","Medium" and "Urgent"
    test("append_to_list() passes when valid priorities ('Low','Medium','Urgent') are used", () => {
        to_do_test.append_to_list("Create a class","25/02/2024","Low");
        to_do_test.append_to_list("Instantiate an object","25/02/2024","Medium");
        to_do_test.append_to_list("Eat dinner","25/02/2024","Urgent");

        expect(to_do_test['to_do']).toEqual([
            ["Create a class","25/02/2024","Low","Incomplete"],
            ["Instantiate an object","25/02/2024","Medium","Incomplete"],
            ["Eat dinner","25/02/2024","Urgent","Incomplete"]     
        ]);
    });

    // test that error is thrown when a to-do list item is added to the list with the same task name as an item already added
    test("append_to_list() passes when user attempts to add a duplicate task (same task name)", () => {
        const invalidDateSpy = jest.spyOn(to_do_test, "valid_date");

        try {
            to_do_test.append_to_list("Create a class","25/02/2024","Urgent");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe("New Task: \"Create a class\" was not valid.  This task is already in the list.")
        }

        expect(invalidDateSpy).not.toHaveBeenCalled(to_do_test.append_to_list("Create a class","25/02/2024","Urgent"));
        expect(to_do_test['to_do'].length).toBe(3);
        expect(to_do_test["to_do"]).toEqual([
            ["Create a class","25/02/2024","Low","Incomplete"],
            ["Instantiate an object","25/02/2024","Medium","Incomplete"],
            ["Eat dinner","25/02/2024","Urgent","Incomplete"]     
        ]);
    });

});

describe("test delete_task", () => {
    
    // test that a valid to-do list item is deleted.
    test("delete_task() passes when user deletes an item", () => {
        to_do_test.delete_task("Eat dinner");

        expect(to_do_test['to_do'].length).toBe(2);
        expect(["Eat dinner","25/02/2024","Urgent","Incomplete"]).not.toContainEqual(to_do_test['to_do']);
    });

    // test that an error is thrown when trying to delete an item not present in the list.
    test("delete_task() passes when user attempts to delete invalid task", () => {
        try {
            to_do_test.delete_task("hello");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe("Task: \"hello\" not deleted. The task is not in the list.");
        }

        expect(to_do_test['to_do'].length).toBe(2);
        expect(to_do_test["to_do"]).toEqual([
            ["Create a class","25/02/2024","Low","Incomplete"],
            ["Instantiate an object","25/02/2024","Medium","Incomplete"]     
        ]);

    });

});

describe("test change_date", () => {

    // test that the the date changed using change_date.
    test("change_date() passes when valid task date is changed with valid date.", () => {
        const invalidDateSpy = jest.spyOn(to_do_test, "valid_date");

        expect(invalidDateSpy).toHaveBeenCalled(to_do_test.change_date("Create a class","29/02/2024"));
        expect(invalidDateSpy).toBeCalledTimes(1);
        expect(to_do_test['to_do'][0]).toEqual(["Create a class","29/02/2024","Low","Incomplete"]);

    });

    // test change_date when invalid task passed to the method.
    test("change_date() passes when invalid task value used", () => {
        const invalidDateSpy = jest.spyOn(to_do_test, "valid_date");

        expect(invalidDateSpy).not.toHaveBeenCalled(to_do_test.change_date("hello","29/02/2024"));
        expect(to_do_test["to_do"]).toEqual([
            ["Create a class","29/02/2024","Low","Incomplete"],
            ["Instantiate an object","25/02/2024","Medium","Incomplete"]
        ]);

        try {
            to_do_test.change_date("hello","29/02/2024");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe('Task: "hello" is not in the list.  Date not changed.');
        }

    });

    // test change_date when invalid date passed to the method.
    test("change_date() passes when invalid date value used", () => {
        const invalidDateSpy = jest.spyOn(to_do_test, "valid_date");

        expect(invalidDateSpy).toHaveBeenCalled(to_do_test.change_date("Create a class","30/02/2024"));
        expect(to_do_test["to_do"]).toEqual([
            ["Create a class","29/02/2024","Low","Incomplete"],
            ["Instantiate an object","25/02/2024","Medium","Incomplete"]
        ]);

        try {
            to_do_test.change_date("Create a class","30/02/2024");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidDateError);
            expect(error.message).toBe('Date for Task: "Create a class" not changed to "30/02/2024".  Please enter a valid date using format dd/mm/yyyy.');
        }

    });

});

describe("change_priority", () => {
    
    // test change_priority when correct priority values are passed.
    test("change_priority() passes when valid priority values used", () => {
        to_do_test.change_priority("Create a class","Medium");
        to_do_test.change_priority("Instantiate an object","Low");

        expect(to_do_test['to_do']).toEqual([
            ["Create a class","29/02/2024","Medium","Incomplete"],
            ["Instantiate an object","25/02/2024","Low","Incomplete"]
        ]);

        to_do_test.change_priority("Create a class","Urgent");
        to_do_test.change_priority("Instantiate an object","Urgent");

        expect(to_do_test['to_do']).toEqual([
            ["Create a class","29/02/2024","Urgent","Incomplete"],
            ["Instantiate an object","25/02/2024","Urgent","Incomplete"]
        ]);
    });

    // test change_priority when an incorrect priority value is passed.
    test("change_priority() passes when invalid priority value used", () => {
        try {
            to_do_test.change_priority("Create a class","hello");
        }
        catch (error){
            expect(error).toBeInstanceOf(InvalidPriorityError);
            expect(error.message).toBe('Priority: "hello" was not valid.  Please enter "Low", "Medium" or "Urgent"');
        }
    });

    // test that passes when user tries to alter priority for non-existent item
    test("change_priority() passes when invalid task value used", () => {
        try {
            to_do_test.change_priority("hello","Urgent");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe('Task: "hello" is not in the list.')
        }
    });

});

describe("test complete", () => {
    
    // test that list item is marked as complete
    test("complete() passes when valid task value used.", () => {
        to_do_test.complete("Create a class");

        expect(to_do_test['to_do'][0]).toEqual(["Create a class","29/02/2024","Urgent","Complete"]);
    });

    // test that passes when user tries too alter the status for a non-existent item
    test("complete() passes when invalid task value used.", () => {
        try {
            to_do_test.complete("hello");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe('Task: "hello" is not in the list.');
        }
    });

});

describe("test search", () => {
    
    const searchVals = [
        ["Create a class",'"Create a class" is in the list'],
        ["hello",'"hello" is not in the list']
    ];

    // test that passes when task present in list
    test.each(searchVals)(
        "search() passes for search value %j with result %j",
        (fixture,result) => expect(to_do_test.search(fixture)).toBe(result)
    );

    // test that passes when task is not passed
    test("search() passes when no value is passed for task.", () => {
        try {
            to_do_test.search("");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe('Please enter a task.');
        }
    });

});

describe("test reorder_list", () => {
    
    // to_do_test.append_to_list("Eat dinner","25/02/2024","Urgent");

    // test that items are reordered correctly
    test("reorder_list() passes when valid values are passed for task_a and task_b", () => {
        to_do_test.append_to_list("Eat dinner","27/02/2024","Urgent");
        to_do_test.change_date("Create a class","27/02/2024");
        to_do_test.change_date("Instantiate an object","27/02/2024");

        to_do_test.reorder_list("Create a class","Instantiate an object");

        expect(to_do_test['to_do']).toEqual[
            ["Instantiate an object","27/02/2024","Urgent","Incomplete"],
            ["Create a class","27/02/2024","Urgent","Incomplete"],
            ["Eat dinner","27/02/2024","Urgent","Incomplete"]
        ];

        to_do_test.reorder_list("Eat dinner","Create a class");

        expect(to_do_test['to_do']).toEqual[
            ["Instantiate an object","27/02/2024","Urgent","Incomplete"],
            ["Eat dinner","27/02/2024","Urgent","Incomplete"],
            ["Create a class","27/02/2024","Urgent","Incomplete"]
            
        ];

        to_do_test.reorder_list("Instantiate an object","Create a class");

        expect(to_do_test['to_do']).toEqual[
            ["Create a class","27/02/2024","Urgent","Incomplete"]
            ["Eat dinner","27/02/2024","Urgent","Incomplete"],
            ["Instantiate an object","27/02/2024","Urgent","Incomplete"]          
            
        ];

    });

    // test that InvalidTask error thrown if task_a and task_b not present in list
    test("reorder_list() passes when invalid values are entered for task_a and task_b", () => {
        try {
            to_do_test.reorder_list("hello","goodbye");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe('Both tasks "hello" and "goodbye" are not in the To-Do list.');
        }
    });

    // test that InvalidTask error thrown if task_a not present in the list
    test("reorder_list() passes when invalid values are entered for task_a", () => {
        try {
            to_do_test.reorder_list("hello","Create a class");
        }
        catch (error){
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe('The Task: "hello" is not in the To-Do List.');
        }
    });

    // test that InvalidTask error thrown if task_b is not present in the list
    test("reorder_list() passes when invalid values are entered for task_b.", () => {
        try {
            to_do_test.reorder_list("Create a class","hello");
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidTaskError);
            expect(error.message).toBe('The Task: "hello" is not in the To-Do List.');
        }
    });


});
