import mongoose from "mongoose";
import dotenv from "dotenv";
import { genSampleProducts } from "./seeds.js"
dotenv.config();

export const connectToDB = async () => {
	try {
		mongoose.set("strictQuery", false);
		const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wldkdv7.mongodb.net/dennysFullStack`;
        await mongoose.connect(url);
		
		console.log(`Connection to DB established. 🌻`);

		/** SEEDING */
		genSampleProducts();
	} catch (error) {}
};
