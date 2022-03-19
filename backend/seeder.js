import mongoose from 'mongoose';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors'; 

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();//清空
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {//指定一个user
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)
        console.log('Data Imported'.green.inverse);//插入成功
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);//插入失败
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {//有-d参数就删除，否则导入
    destroyData();
} else {
    importData();
} 