import React, { useEffect, useState } from 'react'
import AuthRouter from './AuthRouter'
import MainRouter from './MainRouter'
import { addAuth, authSelector, AuthState } from '../reduxs/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { localDataNames } from '../constants/appInfos'
import { Spin } from 'antd'
import AdminScreen from '../screens/admin/AdminScreen'
import TeacherScreen from '../screens/TeacherScreen'
import AccountantScreen from '../screens/AccountantScreen'
import ChefScreen from '../screens/ChefScreen'
import MenuManage from '../screens/manage/MenuManage'

const Routers = () => {

  const [isLoading, setIsLoading] = useState(false);

  const auth: AuthState = useSelector(authSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = localStorage.getItem(localDataNames.authData);
    res && dispatch(addAuth(JSON.parse(res)));
  }

  return isLoading ? <Spin /> :
    !auth.access_token ? (
      // <AuthRouter />
      // <AdminScreen />
      <MenuManage />
    ) : (
      auth.role === 1 ? <AdminScreen /> :
        auth.role === 2 ? <TeacherScreen /> :
          auth.role === 3 ? <ChefScreen /> :
            <AccountantScreen />
    );
}

export default Routers