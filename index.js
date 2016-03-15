var 
express = require('express'),
path = require('path'),
app = express();

if( app.get('env') === 'development' ) app.locals.pretty = true;
// app settings
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'src', 'views' ) );
// set static paths
app.use( '/pub', express.static( path.join(__dirname, 'pub') ));

if( app.get('env') === 'development' ) require('./gulp-tasks');

app.get('/', (req, res, next) => res.render('index'));

app.listen(process.env.PORT || 1337);

