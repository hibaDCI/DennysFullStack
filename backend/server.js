import express from "express";
import createError from "http-errors";
import { connectToDB } from "./utils/db.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from "./routers/user.router.js";
import productRouter from './routers/products.router.js';
const app = express();

/** DB CONNECTION */
connectToDB();

/** MIDDLEWARES */
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/** ROUTERS */
app.use("/api", authRouter);
app.use('/api/products', productRouter)

/** ERROR HANDLERS */
//404
app.use((req, res, next) => {
	next(createError(404, "Error 404: Route is not defined..🤨"));
});

//MAIN ERROR HANDLER
app.use((error, req, res, next) => {
	if (error) {
		res.status(error.status || 500).send({
			error: {
				status: error.status || 500,
				message: error.message,
				stack: error.stack,
			},
		});
	}

	next();
});

/** SET PORT NUMBER */
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is up on port ${port} 👻`));
