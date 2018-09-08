var request = require("request");

function fetchPlantHistoryData() {

    var options = {
        url: 'http://example.duckdns.org:8123/api/states',
        headers: {
            'x-ha-access': 'configurationyamlpassword',
            'Content-Type': 'application/json'
        }
    };

    return new Promise(function(resolve, reject) {
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

module.exports = fetchPlantHistoryData;
