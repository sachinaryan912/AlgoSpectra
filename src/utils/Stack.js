class Stack {
    constructor() {
      this.stack = [];
      this.stackSize = 8;
    }
  
    push(element) {
      this.stack.push(element);
    }
  
    pop() {
      return this.stack.pop();
    }
  
    peek() {
      return this.stack[this.stack.length - 1];
    }
  
    isEmpty() {
      return this.stack.length === 0;
    }
  
    clear() {
      this.stack = [];
    }
  
    getStack() {
      return [...this.stack]; // Return a copy
    }
  
    getStackLength() {
      return this.stack.length; //return the current number of elements in the array
    }
  
    // Function to convert infix expression to postfix
static InfixToPostfix(expression) {
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
  const stack = new Stack();
  let postfix = "";
  const ans = [];

  // Helper function to add steps for clarity
  const addStep = (style, message, index) => {
    ans.push([[style, message], postfix, stack.getStack(), index]);
  };

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (/[a-zA-Z]/.test(char)) {
      postfix += char; // Append operands to postfix expression
      addStep("text-green-500", `'${char}' is an operand: directly append`, i);
    } else if (char === "(") {
      stack.push(char);
      addStep("text-blue-500", `'${char}' is a left bracket: push to stack`, i);
    } else if (char === ")") {
      while (!stack.isEmpty() && stack.peek() !== "(") {
        postfix += stack.pop();
      }
      stack.pop(); // Remove '(' from the stack
      addStep("text-red-500", `'${char}' is a right bracket: pop until '('`, i);
    } else {
      while (
        !stack.isEmpty() &&
        precedence[char] <= precedence[stack.peek()]
      ) {
        postfix += stack.pop();
      }
      addStep("text-yellow-500", `'${char}' is an operator: pop until lower precedence`, i);
      stack.push(char);
      addStep("text-yellow-500", `Push '${char}' to stack`, i);
    }
  }

  while (!stack.isEmpty()) {
    postfix += stack.pop();
  }
  addStep("text-blue-400", `Stack is empty: pop all remaining operators`, expression.length);

  return ans;
}
    
  }
  
  
  
  
  export default Stack;