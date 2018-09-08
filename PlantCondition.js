function PlantCondition(plant_name, state, property_name) {
    this.plant_name = plant_name;
    this.state = state;
    this.property_name = property_name;
  }

function save(pc) {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
      host: 'localhost',
      user: 'plant',
      password: 'password',
      database: 'databasename'
  });

  connection.connect(function (err) {
      if (err) {
          console.error('error connecting: ' + err.stack);
          return;
      }

      console.log('connected as id ' + connection.threadId);

      var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
      connection.query('INSERT INTO plant_data SET ?', {
          plant_name: pc.plant_name, state: pc.state, property_name: pc.property_name, timestamp: CURRENT_TIMESTAMP
      },
          function (error, results, fields) {
              if (error) throw error;
              console.log(results.insertId);
              connection.destroy();
          });

  });
}

  PlantCondition.prototype.save = function() {
      console.log("Saving");
      console.log(this);
      save(this);
  };

  module.exports = PlantCondition;
