___QNA___ 
1) What is the difference between null and undefined?
__ans:__ Null is an intentional assignment representing no value, where as undefined means a variable is decleared but not initialed a value.
2) What is the use of the map() function in JavaScript? How is it different from forEach()?
__ans:__ the Key difference is map returns a result array, where foreach just executes, no return.
3) What is the difference between == and ===?
__ans:__ The difference is, === check for type of both side, where == doesn't, instead does type conversion depending on what are the compares.
4) What is the significance of async/await in fetching API data?
__ans:__ It makes asynchronous code look and behave like synchronous code.It pauses the execution of the function until the Promise resolves, making it easier to manage data that depends on previous API calls.
5) Explain the concept of Scope in JavaScript (Global, Function, Block).
__ans:__ Scope determines where variables are accessible in code.
Global Scope: Variables declared outside any function or block. Accessible everywhere.
Function Scope: Variables declared inside a function (using var, let, or const). Accessible only within that function.
Block Scope: Variables declared inside {} braces (like if statements or for loops) using let or const.
Note: Variables declared with var do not have block scope!