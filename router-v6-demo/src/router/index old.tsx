import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Films from '../views/Films';
import Cinemas from '../views/Cinemas';
import Center from '../views/Center';
import MyRedirect from '../components/MyRedirect';
import NotFound from '../views/404';
import ComingSoon from '../views/Films/ComingSoon';
import NowPlaying from '../views/Films/NowPlaying';
import FilmDetail from '../views/Films/FilmDetail';
import FilmDetail2 from '../views/Films/FilmDetail2';
import Auth from '../components/Auth';
import Login from '../views/Login';
import { lazyLoad } from '../components/lazyLoad';

export default function MRouter() {
  // {/* 使用Routes替代v5 Switch */ }
  return (
    <Routes>
      <Route path='/login' element={<Login></Login>}></Route>
      {/* 使用element属性替代v5 component */}
      <Route path='/films' element={<Films></Films>}>
        {/* index 指定匹配不到路由，指定默认路由 */}
        <Route index element={<NowPlaying></NowPlaying>}></Route>
        {/* 相对路径写法(推荐) */}
        <Route path='NowPlaying' element={<NowPlaying></NowPlaying>}></Route>
        {/* 全路径写法 */}
        <Route path='/films/ComingSoon' element={<ComingSoon></ComingSoon>}></Route>
      </Route>
      <Route path="filmDetail/:id" element={<FilmDetail></FilmDetail>}></Route>
      <Route path="filmDetail" element={<FilmDetail2></FilmDetail2>}></Route>
      <Route path='/cinemas' element={lazyLoad('Cinemas/index')}></Route>
      <Route path='/center'
        element={
          <Auth>
            <Center></Center>
          </Auth>}>
      </Route>
      {/* 使用Navigate替代Redirect */}
      {/* 重定向方式1 */}
      {/* <Route path="/" element={<Navigate to="/films"></Navigate>}></Route> */}
      {/* 重定向方式2 自定义重定向组件 */}
      <Route path="/" element={<MyRedirect to="/films"></MyRedirect>}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  )
}
