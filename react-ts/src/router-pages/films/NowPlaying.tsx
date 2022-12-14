import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Result, FilmItem } from '../type';
import { RouteComponentProps } from 'react-router-dom';
// import FilmListItem from './FilmListItem';
import { List, Image, InfiniteScroll } from 'antd-mobile';

// test:通过联合类型，添加属性
interface IProps {
  name?: string;
}
export default function NowPlaying(props: RouteComponentProps & IProps) {
  console.log('NowPlaying render');
  const [list, setList] = useState<FilmItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const pageNum = useRef(0)

  // 加载更多数据，默认触发一次
  async function loadMore() {
    setHasMore(false);
    pageNum.current ++
    axios
      .get<Result<Record<'films', FilmItem[]>>>(
        `https://m.maizuo.com/gateway?cityId=440300&pageNum=${pageNum.current}&pageSize=10&type=2&k=1178624`,
        {
          headers: {
            'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.0","e":"16592753012062937216778241","bc":"110100"}`,
            'X-Host': `mall.film-ticket.film.list`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        const newList = res.data.data.films;
        console.log(newList)
        setList((prevList) => [...prevList, ...newList]);
        setHasMore(newList.length > 0);
      });
  }

  // console.log(props.name); //test:通过联合类型，添加属性
  // useEffect(() => {
  //   axios
  //     .get<Result<Record<'films', FilmItem[]>>>(
  //       'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=1178624',
  //       {
  //         headers: {
  //           'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.0","e":"16592753012062937216778241","bc":"110100"}`,
  //           'X-Host': `mall.film-ticket.film.list`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       // console.log(res);
  //       setList(res.data.data.films);
  //     });
  // }, []);

  function handleClick(id: number) {
    console.log(id);
    // 1. 从match.params获取
    props.history.push(`/maizuo/detail/${id}`);
    // 2. 从location.search获取，通过qs等库转换
    // props.history.push({ pathname: `/detail?id=${id}` });
    // 3. 从location.query获取（存在内存中）
    // props.history.push({ pathname: `/detail`, query: { id } }); // TODO: 类型检查报错
    // 4. 从location.state获取（存在内存中）
    // props.history.push({ pathname: `/detail`, state: { id } });
  }

  return (
    <div>
      <List>
        {list.map((item) => (
          <List.Item
            onClick={() => handleClick(item.filmId)}
            key={item.name}
            prefix={
              <Image
                src={item.poster}
                style={{ borderRadius: 4 }}
                fit="cover"
                width={100}
              />
            }
            description={
              <div>
                <div> 观众评分：{item.grade}</div>
                <div> 主演：{item.actors.map((item) => item.name)}</div>
              </div>
            }
          >
            {item.name}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      {/* <ul className="">
        {list.map((item) => {
          return (
            // 1. 非路由组件，可通过父组件（路由组件传入）
            // <FilmListItem key={item.filmId} {...item} {...props}></FilmListItem>
            // 2. 或者通过withRouter转成路由组件
            <FilmListItem key={item.filmId} {...item}></FilmListItem>
          );
        })}
      </ul> */}
    </div>
  );
}
