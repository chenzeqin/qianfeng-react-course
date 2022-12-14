import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getToken } from '../../utils/auth';
import { createContext } from "react";
import { AuthProviderValue } from "./auth.type";
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser, login } from '../../api/user';
import { message } from 'antd';
import { User } from '../../views/User/type';
import { getPermissionTree } from '../../api/permission';
import { Right } from '../../views/Permission/type';
import { useAppDispatch } from '../../store/hooks';
import { tokenAction } from '../../store/actions/useActions';
/* redux版本auth组件 */
const whiteList = ['/login', '/news',"/news-detail"]


export const AuthContext = createContext<AuthProviderValue>({
  token: '',
  handleLogin: () => { },
  handleLogout: () => { },
  user: { role: { rights: [] } },
  rightTree: [],
  loading: false
})

interface Props {
  children: React.ReactNode
}

export default function AuthProvider(props: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(getToken());
  const jsonStr = localStorage.getItem('user')
  let _user: Partial<User> = {
    id: 0,
    username: '',
    role: { rights: [] }
  }
  if (jsonStr) _user = JSON.parse(jsonStr)
  const [user, setUser] = useState<Partial<User>>(_user)
  const [rightTree, setRightTree] = useState<Right[]>([])


  // token 更新时重新获取用户信息
  useEffect(() => {
    if (whiteList.some(item => location.pathname.indexOf(item) > -1)) {
      return
    }

    // 路由拦截
    if (!token) {
      if (location.pathname !== '/login') {
        navigate('/login')
      }
      return
    }

    if (user.id && !loading && !rightTree.length) {
      setLoading(true)
      Promise.all([getUser(user.id), getPermissionTree()]).then(([user, rightTree]) => {
        console.log('userInfo', user)
        // 模拟网络延迟
        setTimeout(() => {
          setUser(user)
          setRightTree(rightTree)
          setLoading(false)
        }, 1 * 1000)
      }).catch(e => setLoading(false))
    }
  }, [token, user.id, location.pathname, loading, navigate, rightTree.length])


  const dispatch = useAppDispatch()

  const handleLogin = useCallback((username: string, password: string) => {
    login(username, password).then(res => {

      if (res.success) {
        // redux+持久化版本需要设置token
        dispatch(tokenAction('token-abcd'))


        setToken('token-xxx')
        localStorage.setItem('token', 'token-xxx')
        localStorage.setItem('user', JSON.stringify(res.user))
        setUser(res.user!)
        message.success('登陆成功')
        navigate('/')
      }
    })
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setToken('')
    setUser({
      id: 0
    })
    setRightTree([])
    localStorage.clear()
    navigate('/login')
  }, [navigate])

  const value = useMemo(() => {
    console.warn('AuthProvider')
    return {
      token,
      handleLogin,
      handleLogout,
      rightTree,
      user,
      loading
    }
  }, [token, handleLogin, handleLogout, rightTree, user, loading])

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
