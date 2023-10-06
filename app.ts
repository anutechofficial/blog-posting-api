
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import blogRouter from "./routes/blogPost";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json'; 
import S3Upload from "./routes/upload";
import down from "./routes/downl";
import Chat from "./routes/chat";
// import msg from "./routes/chat";
// import multer from 'multer';


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/auth', authRoutes,swaggerUi.serve, swaggerUi.setup(swaggerFile));                    
app.use('/post', blogRouter);
app.use('/upload', S3Upload);
app.use('/file',down); 
app.use('/message', Chat);
// app.use('/message', msg,swaggerUi.serve, swaggerUi.setup(swaggerFile) );    

mongoose.connect('mongodb://127.0.0.1:27017/databaseUser')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
