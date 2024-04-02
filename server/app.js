var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importa el middleware cors

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var turnoRoutes = require('./routes/turnoRoutes');
var sedeRoutes = require('./routes/sedeRoutes'); // Rutas para sedes
var areaRoutes = require('./routes/areaRoutes'); // Importa las rutas de áreas
var administradorRoutes = require('./routes/administradorRoutes'); // Importa las rutas de administrador
var contratoRoutes = require('./routes/contratoRoutes');
var horarioRoutes = require('./routes/horarioRoutes');
var actividadRoutes = require('./routes/actividadRoutes'); // Importa las rutas de actividades
var app = express();

let dotenv = require('dotenv');
dotenv.config();

let mongo = require('./config/dbconfig');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors()); // Usa el middleware cors una vez
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para deshabilitar el almacenamiento en caché
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/turnos', turnoRoutes);
app.use('/sedes', sedeRoutes); // Usa las rutas para sedes
app.use('/areas', areaRoutes);
app.use('/administrador', administradorRoutes);
app.use('/contratos', contratoRoutes);
app.use('/horario', horarioRoutes);
app.use('/actividades', actividadRoutes); // Usa las rutas de actividades

// Captura el error 404 y reenvía al gestor de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Gestor de errores
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
