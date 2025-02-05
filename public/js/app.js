import express from 'express';
import cors from 'cors';

import userRouter from '../../Api/Routers/userRouter.js';
import tokenRouter from '../../Api/Routers/tokenRouter.js';
import accountRouter from '../../Api/Routers/accountRouter.js';

// MIDDLEWARE
const app = express();
app.use(express.json({ limit: '100kb' }));

app.use(cors());
app.options('*', cors());

// 3) ROUTES
app.use('/api/v1/user', userRouter);
app.use('/api/v1/tokens', tokenRouter);
app.use('/api/v1/account', accountRouter);

export default app;
