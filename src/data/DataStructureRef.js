export const dataStructureRef = {
    linkedlist: [
      {
        title: "📘 What is a Linked List?",
        type: "text",
        content:
          "A Linked List is a linear data structure where elements are stored in nodes, and each node points to the next node using a reference or pointer. Unlike arrays, linked lists do not require contiguous memory locations."
      },
      {
        title: "📌 Key Rules of Linked Lists",
        type: "list",
        content: [
          "Each node contains data and a pointer to the next node.",
          "Head points to the first node in the list.",
          "Tail is the last node, which usually points to null.",
          "Insertions and deletions are faster than arrays (especially at head).",
          "They do not allow random access like arrays (you must traverse)."
        ]
      },
      {
        title: "🎓 Study Resources",
        type: "list",
        content: [
          {
            text: "GeeksforGeeks: Linked List",
            url: "https://www.geeksforgeeks.org/data-structures/linked-list/"
          },
          {
            text: "YouTube: Linked Lists (by mycodeschool)",
            url: "https://www.youtube.com/watch?v=njTh_OwMljA"
          },
          {
            text: "LeetCode: Linked List Problems",
            url: "https://leetcode.com/tag/linked-list/"
          }
        ]
      }
    ],
    infixtopostfix: [
      {
        title: "📘 What is Infix & Postfix?",
        type: "text",
        content:
          "Infix expressions are the common form of expressions like A + B, where operators are placed between operands. Postfix (or Reverse Polish Notation) places the operator after the operands, like AB+. Postfix expressions eliminate the need for parentheses and make evaluation easier for computers using stacks."
      },
      {
        title: "📌 Key Rules of Conversion",
        type: "list",
        content: [
          "Use a stack to keep track of operators.",
          "Operands go directly to the output.",
          "Pop operators from the stack based on precedence and associativity.",
          "Parentheses are handled specially: push ( and pop until ) is found.",
          "After the expression is read, pop all remaining operators to the output."
        ]
      },
      {
        title: "🎓 Study Resources",
        type: "list",
        content: [
          {
            text: "GFG: Infix to Postfix",
            url: "https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/"
          },
          {
            text: "YouTube: Infix to Postfix (Stack Algorithm)",
            url: "https://www.youtube.com/watch?v=2kZz_1Y8cJw"
          },
          {
            text: "LeetCode: Expression Parsing",
            url: "https://leetcode.com/problems/basic-calculator/"
          }
        ]
      }
    ],
    stack: [
      {
        title: "📘 What is a Stack?",
        type: "text",
        content:
          "A Stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack."
      },
      {
        title: "📌 Key Rules of Stacks",
        type: "list",
        content: [
          "Push: Add an element to the top of the stack.",
          "Pop: Remove the top element from the stack.",
          "Peek: Get the value of the top element without removing it.",
          "Stacks are used in function calls, undo operations, and expression evaluation."
        ]
      },
      {
        title: "🎓 Study Resources",
        type: "list",
        content: [
          {
            text: "GeeksforGeeks: Stack Data Structure",
            url: "https://www.geeksforgeeks.org/stack-data-structure/"
          },
          {
            text: "YouTube: Stack (by mycodeschool)",
            url: "https://www.youtube.com/watch?v=wjI1WNp3U8M"
          },
          {
            text: "LeetCode: Stack Problems",
            url: "https://leetcode.com/tag/stack/"
          }
        ]
      }
    ],
    queue: [
      {
        title: "📘 What is a Queue?",
        type: "text",
        content:
          "A Queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added to the back (rear) and removed from the front of the queue."
      },
      {
        title: "📌 Key Rules of Queues",
        type: "list",
        content: [
          "Enqueue: Add an element to the back of the queue.",
          "Dequeue: Remove an element from the front of the queue.",
          "Queues are used in scheduling, breadth-first search (BFS), and CPU task management."
        ]
      },
      {
        title: "🎓 Study Resources",
        type: "list",
        content: [
          {
            text: "GeeksforGeeks: Queue Data Structure",
            url: "https://www.geeksforgeeks.org/queue-data-structure/"
          },
          {
            text: "YouTube: Queue (by mycodeschool)",
            url: "https://www.youtube.com/watch?v=Ko2o5nv6drw"
          },
          {
            text: "LeetCode: Queue Problems",
            url: "https://leetcode.com/tag/queue/"
          }
        ]
      }
    ],
    array: [
      {
        title: "📘 What is an Array?",
        type: "text",
        content:
          "An Array is a collection of elements identified by index or key. It is a fixed-size data structure that stores elements of the same data type in contiguous memory locations."
      },
      {
        title: "📌 Key Rules of Arrays",
        type: "list",
        content: [
          "Arrays are indexed from 0 in most programming languages.",
          "Elements in an array are stored in contiguous memory locations.",
          "Arrays allow random access to elements.",
          "Arrays have a fixed size, which means their size cannot change after initialization."
        ]
      },
      {
        title: "🎓 Study Resources",
        type: "list",
        content: [
          {
            text: "GeeksforGeeks: Array Data Structure",
            url: "https://www.geeksforgeeks.org/array-data-structure/"
          },
          {
            text: "YouTube: Arrays (by mycodeschool)",
            url: "https://www.youtube.com/watch?v=Kz1hu7pFHz8"
          },
          {
            text: "LeetCode: Array Problems",
            url: "https://leetcode.com/tag/array/"
          }
        ]
      }
    ]
  };
  