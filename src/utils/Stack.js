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
      let precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
      let stack = new Stack();
      let postfix = "";
      let ans = [];
      
      // 1 -> operand,  2 -> operator,  3 -> leftBracket,  4 -> rightBracket
      for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
  
        if (/[a-zA-Z]/.test(char)) {
          postfix += char; // Append operands to postfix expression
          ans.push([["text-green-500",`\' ${char} \' is operand : directly print operand`], postfix, stack.getStack(),i]);
        } else if (char === "(") {
          stack.push(char);
          ans.push([["text-blue-500",`\' ( \' is left bracket : Push into Stack`], postfix, stack.getStack(),i]);
        } else if (char === ")") {
          while (!stack.isEmpty() && stack.peek() !== "(") {
            postfix += stack.pop();
          }
          stack.pop(); // Remove '(' from the stack
          ans.push([["text-red-500",`\' ) \' is right bracket : Pop from stack and print until \'(\' is found`], postfix, stack.getStack(),i]);
        } else {
          while (
            !stack.isEmpty() &&
            precedence[char] <= precedence[stack.peek()]
          ) {
            postfix += stack.pop();
          }
          ans.push([["text-yellow-500",`\' ${char} \' is operator : Pop from stack and print until an operator with less precedence is found`], postfix, stack.getStack(),i]);
          stack.push(char);
          ans.push([["text-yellow-500",`Push \' ${char} \' into Stack`], postfix, stack.getStack(),i]);
        }
      }
  
      while (!stack.isEmpty()) {
        postfix += stack.pop();
      }
      ans.push([["text-blue-400",`No operator or operand has left : Pop from stack and print until stack empty`], postfix, stack.getStack(),expression.length]);
  
      return ans;
    }
    
  }
  
  
  
  
  export default Stack;