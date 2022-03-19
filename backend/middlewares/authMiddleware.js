import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (//如果存在token
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];//取出token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);//进行解码

      req.user = await User.findById(decoded.id).select('-password')//generateToken中传过来的id,'-password'表示不寻找password

      next()
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');//不存在token
  }
})

const admin = (req,res,next) => {
  if(req.user && req.user.isAdmin){
    next();
  }else{
    res.status(401);
    throw new Error('not admin')
  }
}

export { protect ,admin}