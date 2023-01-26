
import { model, Schema } from 'mongoose';

const recordsSchema = new Schema({
atist: {
    type: String,
    required: [true, "Please provide a value as name of the artist"],
  },

  album_name: {
    type: String,
    required: [true, "Please provide album name"],
    unique: [true, "This album name is already in use"],
    
  },

  
release_year: {
    type: Number,
  },

  description: {
    type: String,
  },

  sales: {
    type: String,
    
    },

    album_cover_image: String,
  
});

    export const Records = model( 'Records', recordSchema);
