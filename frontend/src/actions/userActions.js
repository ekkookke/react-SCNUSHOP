import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from '../constants/userConstants';

// 登录
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })//dispatch作用是令reducer内容发生变化，也就是action的作用

        const config = {//头信息，登陆时用于接收json的数据
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config);//此处进行前后端连接

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data));//持久化登陆状态

        alert('登录成功!');

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


//登出
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/login'//登出时自动跳回登陆页面

    alert('您已退出登录!');
}


//注册
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })//dispatch作用是令reducer内容发生变化，也就是action的作用

        const config = {//头信息，注册时用于接收json的数据
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name, email, password }, config);//此处进行前后端连接

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))

        alert('注册成功!');
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
}


//获取用户信息
export const getUserDetails = (id) => async (dispatch, getState) => {//getState作用是取出store内容
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
}

//用户列表
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/users`, config)

        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

//管理员删除用户
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.delete(`/api/users/${id}`, config)

        dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

//管理员更新用户
export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(`/api/users/${user._id}`,user,config)

        dispatch({ type: USER_UPDATE_SUCCESS })

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

//修改用户信息
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.put(`/api/users/profile`, user, config)

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))

        alert('信息修改成功!');
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
}
