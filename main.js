const PlantCondition = require('./PlantCondition.js');
const fetchPlantHistoryData = require('./service.js');
var _ = require('lodash');

function fetchData() {
    var request = fetchPlantHistoryData();
    request.then(function (result) {
        console.log(result);

        _.forEach(result, function(subResult) {

            var friendlyName = _.get(subResult, 'attributes.friendly_name');
                if ( _.includes(friendlyName, "Conductivity") || _.includes(friendlyName, "Moisture") || _.includes(friendlyName, "Light intensity") 
                || _.includes(friendlyName, "Battery") || _.includes(friendlyName, "Temperature") ) {
                    var plant_name = '';
                    var property_name = '';

                    if ( _.includes(friendlyName, "Conductivity") ) {
                        property_name = "Conductivity";
                    } else if ( _.includes(friendlyName, "Moisture") ) {
                        property_name = "Moisture";
                    } else if ( _.includes(friendlyName, "Light") ) {
                        property_name = "Light";
                    } else if ( _.includes(friendlyName, "Battery") ) {
                        property_name = "Battery";
                    } else if ( _.includes(friendlyName, "Temperature") ) {
                        property_name = "Temperature";
                    }

                    if ( _.includes(friendlyName, "Silver") ) {
                        plant_name = "Silver Wattle";
                    } else if ( _.includes(friendlyName, "Norway") ) {
                        plant_name = "Norway Spruce";
                    } else if ( _.includes(friendlyName, "Hedge") ) {
                        plant_name = "Hedge Maple";
                    } else if ( _.includes(friendlyName, "Aleppo") ) {
                        plant_name = "Aleppo Pine";
                    }

                    var state = _.get(subResult,'state');
                    var plantCondition = new PlantCondition(plant_name, state, property_name);
                    plantCondition.save();
                }
        })

    }, function (err) {
        console.log(err);
    })
}

console.log("hello world");

fetchData();



