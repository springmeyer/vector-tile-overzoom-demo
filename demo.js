var mapnik = require('mapnik');
var path = require('path');
var assert = require('assert');
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
var output_vt = new mapnik.VectorTile(1,0,0);
output_vt.composite([input_vt]);
output_vt.parse();
var clipped_geojson = JSON.parse(output_vt.toGeoJSON(0));
// should just get the point in north america
assert.equal(clipped_geojson.features.length,1)
