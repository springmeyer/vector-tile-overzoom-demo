var mapnik = require('mapnik');
var path = require('path')
mapnik.register_datasource(path.join(mapnik.settings.paths.input_plugins,'ogr.input'));


var input_vt = new mapnik.VectorTile(0,0,0);

// just for demo
// in reality:
// input_vt.setData( < uncompressed protobuf >);
var geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122,
          48
        ]
      },
      "properties": {
        "name": "geojson data"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122,
          -48
        ]
      },
      "properties": {
        "name": "geojson data"
      }
    }
  ]
};
input_vt.addGeoJSON(JSON.stringify(geojson),"bruno");
//input_vt.parse()
//console.log(JSON.stringify(input_vt.toGeoJSON(0),null,1));

var output_vt = new mapnik.VectorTile(1,0,0);

output_vt.composite([input_vt,input_vt]);
//console.log(output_vt.names())

console.log(JSON.stringify(output_vt.toGeoJSON('__all__'),null,1));
