import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  geoname_id: String,
  name: String,
  ascii_name: String,
  alternate_names: [String],
  latitude: String,
  longitude: String,
  feature_class: String,
  feature_code: String,
  country_code: String,
  country_code_2: String,
  admin1_code: String,
  admin2_code: String,
  admin3_code: String,
  admin4_code: String,
  population: Number,
  elevation: Number,
  dem: Number,
  timezone: String,
  modification_date: Date,
  country: String,
  coordinates: {
    lon: Number,
    lat: Number
  },
});

const City = mongoose.model('City', citySchema);

export default City;
