import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, Model } from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb+srv://apchaudhary6695:anand8126@cluster0.m0uykuj.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: any) => console.error('Error connecting to MongoDB:', err)); // Specify error type as any

// Define a mongoose schema
const exampleSchema = new Schema({
  name: String,
  age: Number
});

// Define a mongoose model
interface IExample extends Document {
  name?: string;
  age?: number;
}

const ExampleModel: Model<IExample> = mongoose.model<IExample>('Example', exampleSchema);

// Express Middleware
app.use(express.json());

// Express Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// GET all examples
app.get('/examples', async (req: Request, res: Response) => {
  try {
    const examples = await ExampleModel.find();
    res.json(examples);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new example
// app.post('/examples', async (req: Request, res: Response) => {
// console.log(req.body);

//   try {
//     const { name, age } = req.body;
//     const newExample = new ExampleModel({ name, age });
//     const savedExample = await newExample.save();
//     res.status(201).json(savedExample);
//   } catch (err: any) {
//     res.status(400).json({ message: err.message });
//   }
// });

// POST a new example
app.post('/examples', async (req: Request, res: Response) => {
    try {
      const { name, age } = req.body;
      const newExample = new ExampleModel({ name, age });
      const savedExample = await newExample.save();
      res.status(201).json(savedExample);
    } catch (err: any) { // Specify the type of err as any
      res.status(400).json({ message: err.message });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
