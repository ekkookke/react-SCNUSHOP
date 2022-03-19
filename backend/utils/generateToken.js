import jwt from 'jsonwebtoken';

const generateToken = (id) => {//此处可以存放密码之外的常规数据
  return jwt.sign({ id }, process.env.JWT_SECRET, {//加密payload
    expiresIn: '30d'//token过期时间30天
  })
}

export default generateToken;