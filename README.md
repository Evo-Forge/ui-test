# Practical application test

### Data table

The solution will be written with JavaScript/HTML/CSS. You have the freedom to work with whatever technology you like *(React / Angular / Ember / others)*. We will provide you with a mock JSON which contains all the necessary data to work with and can be found in the `src/resources` directory of this repository.

### Specs (which you will also find in the demo)

- the data from the JSON file should be listed in a table like structure and initialy it should display only 20 rows.

#### Search & highlight feature

The table can be filtered via a search query string. The application should have an input where the user
can search for any string contained in the table. As the user types (more than 3 chars for a string or 1 char for a number), every row not containing the typed string will be removed and only those containing it or a part of it will be displayed. Also, the typed query will be highlighted on the found string in the table.

#### Add/remove rows
The top havigation has multiple buttons to load or remove all rows, those buttons should do what's written on their labels, and when selected it should have the label changed. Also when removing all rows, the remove button should be hidden.

#### Table interactions

- each row will have a checkbox associated with it
- the user can select any row from the table when clicking it or by clicking the checkbox associated with that row
- the user should be able to select all rows by clicking the top checkbox on the first table header
- the header checkbox will have three states, unchecked, checked and indeterminate, the rules are very simple:
    1. when nothing is selected, the header checkbox is in the unchecked state
    2. when one or more rows are selected, but not all, the header checkbox is in the indeterminate state
    3. when all rows are selected the header checkbox is in the checked state
- when the header checkbox is in the indeterminate state, if clicked it deselects all rows
- when the header checkbox is in the unchecked state, if clicked it selects all rows
- there should be a counter indicating how may rows are selected
- when the table row is clicked the user will navigate to a new page /edit/:id. The page contains a form with the row data, an edit button and SAVE/CANCEL buttons. If the user clicks CANCEL he will navigate back to the table preserving the filters and selections previously applied. Initially the inputs are in a read-only state. When the user clicks the EDIT button the inputs become editable and the user can change the information and SAVE it(it's a plus if you add validations before saving the information). 


####  Design
Try to maintain the current design. Or if you can surprise us with something prettier we won't say no :)

#### Things you should have in mind

 - we want to see a well written solution
 - we prefer if you will make a pull request with the final solution
 - it's a plus if you follow an MVC/Flux approach
 - it's a plus if you use a javascript framework
 - it's a plus if you use a CSS preprocessor
 - it's a huge plus if you can add a test suite
 - it's a plus if you use a module system
 - it's a plus if you write your code using ES2015
 - it's a plus if you use some kind of development automatization tool (grunt/gulp/webpack)

### Happy coding!

