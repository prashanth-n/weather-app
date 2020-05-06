const req = require('request');
const geoCode = (address, callback) => {
    const latLongUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiY3JhenlnZWVrIiwiYSI6ImNrOTl4Y3VtZDAyZ2MzZW84ZjBucTZ4MmsifQ.fDlFoArJsr7gb_BRBRSyDg&limit=1'
    req({ url: latLongUrl, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect the mapbox api services', undefined)
            console.log('Unable to connect the mapbox api services');
        } else if (body.features.length) {
            const data = body.features;
            callback(undefined, {
                lat: body.features[0].center[1],
                lng: body.features[0].center[0],
                placeName: body.features[0].place_name,
            })
        } else {
            callback('could not find the coordinates', undefined)
            console.log();
        }
    })
}

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7e2ef15133e34c37ca3960d67f9ef7f9&query=' + lat + ',' + lng + '&units=m';
    req({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('cannot reach weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body.current;
            callback(undefined, data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' out. It feels like ' + data.feelslike)
        }
    })
}
module.exports = {
    geoCode: geoCode,
    forecast: forecast
};