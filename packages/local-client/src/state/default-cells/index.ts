import { Cell } from "../cell";

export let defaultCell: Cell[] = [
  {
    content:
      "## CJNote\n\nThis is an interactive coding environment that enables you write Javascript code conveniently. You can also write documentation for the code using markdown. To use, note the following:\n\n1. Click on any cell to edit\n2.  Add new cells by hovering on the divider between each cell\n3.  Variables defined in a code cell can be referred to or used in another code cell\n4.  Use the built-in **show** function to display any React component, string, number, object etc\n5.  Re-order or delete cells by using the buttons on the top-left\n\nNote that all change made or edits get saved to the file that you opened CJNote with. For example, if you run ***npx cjnote serve test.js***, all the text and code will be saved to the **test.js** file.\n\n\n\n\n\n\n\n\n",
    type: "text",
    id: "9x3gr",
  },
  {
    content:
      "import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Click</button>\n      <h3>Count: {count} </h3>\n    </div>\n  );\n};\n\n// Display a variable or React Component by calling 'show'\nshow(<Counter/>);",
    type: "code",
    id: "sq7p2",
  },
];
