### Theory of operation

The application is going to build a table-like structure using `AngularJS`.
The server will use `gulp` to build the UI, using `less` for css files, `jade` angular templates. Also, the css is built on top of `bootstrap`
The index page will just rendered by `express` on request, from a `jade` template as well.

#### Installation

Run `npm install` in your project path to get all the required modules
Make sure you have a webdriver installed for e2e tests
Run the app using `node index.js`


#### Application flow (`src/scripts`):
The main JS application will be using `RequireJS` as an AMD loader.
- setup `require` config - `config.js`
- load `main` module and configure routes, and boot up the angular app. - `main.js`
	- each route loads required modules asynchronously using an `on-demand`-like provider - `lib/angular/on-demand.js`
	  _the motivation behind this approach is that we can have separate modules bundled (in production mode for example)
	  so for big applications the user won't have to load a whole lot of code if he didn't ask for it._
- the first route will be automatically navigated to, and will load the home controller with table page - `ctrl/home.js`
- the home controller will be using a simple data service factory - `srv/data.js` 
- the purpose of the table directive used - `dir/table.js` - is to optimize
  - this is specifially usefull both on load and runtime of big data sets
  - when loading more than defined table-chunk size - `settings.js` - the set will be split in multiple tbodies,
  	the first one being rendered immediately and the next deferred
  - on runtime, i.e. scrolling through the table, tbodies can be shown or hidden deppending on scroll position
  	_yes, shown or hidden, because adding and removing DOM nodes is way more costly_
- the ideterminate directive - `dir/indeterminate.js` - is used to set the top header checkbox to indeterminate state
- the search filter, highlight, item selection count are achieved using standard angular stuff

#### Testing
Testing is done via dedicated `grunt` tasks
- Unit tests - run `grunt unit`
- E2E tests - open the selenium server `webdriver-manager start` and run `grunt e2e`

- - -

> # Practical application test
> 
> ### Data table
> 
> The final solution will look and work like this: [live demo](http://raulmatei.com/test)
> 
> The solution will be written with JavaScript/HTML/CSS. You have the freedom to work with whatever technology you like *(React / Angular / Ember / others)*. We will provide you with a mock JSON which contains all the necessary data to work with and can be found in the `src/resources` directory of this repository.
> 
> ### Specs (which you will also find in the demo)
> 
> - the data from the JSON file should be listed in a table like structure and initialy it should display only 20 rows.
> 
> #### Search & highlight feature
> 
> The table can be filtered via a search query string. The application should have an input where the user
> can search for any string contained in the table. As the user types (more than 3 chars for a string or 1 char for a number), every row not containing the typed string will be removed and only those containing it or a part of it will be displayed. Also, the typed query will be highlighted on the found string in the table.
> 
> #### Add/remove rows
> The top havigation has multiple buttons to load or remove all rows, those buttons should do what's written on their labels, and when selected it should have the label changed. Also when removing all rows, the remove button should be hidden.
> 
> #### Table interactions
> 
> - each row will have a checkbox associated with it
> - the user can select any row from the table when clicking it or by clicking the checkbox associated with that row
> - the user should be able to select all rows by clicking the top checkbox on the first table header
> - the header checkbox will have three states, unchecked, checked and indeterminate, the rules are very simple:
>     1. when nothing is selected, the header checkbox is in the unchecked state
>     2. when one or more rows are selected, but not all, the header checkbox is in the indeterminate state
>     3. when all rows are selected the header checkbox is in the checked state
> - when the header checkbox is in the indeterminate state, if clicked it deselects all rows
> - when the header checkbox is in the unchecked state, if clicked it selects all rows
> - there should be a counter indicating how may rows are selected
> 
> 
> ####  Design
> pretier
> Try to maintain the current design. Or if you can surprise us with something prettier we won't say no :)
> 
> #### Things you should have in mind
> 
>  - we want to see a well written solution
>  - we prefer if you will make a pull request with the final solution
>  - it's a plus if you follow an MVC/Flux approach
>  - it's a plus if you use a javascript framework
>  - it's a plus if you use a CSS preprocessor
>  - it's a huge plus if you can add a test suite
>  - it's a plus if you use a module system
>  - it's a plus if you write your code using ES2015
>  - it's a plus if you use some kind of development automatization tool (grunt/gulp/webpack)
> 
> 
> ### Questions
> 
> please address them to:
>  - [Raul Matei](mailto:raul.matei@evozon.com)
>  - [Andrei Cacio](mailto:andrei.cacio@evozon.com)
> 
> ### Happy coding!
> 
> 