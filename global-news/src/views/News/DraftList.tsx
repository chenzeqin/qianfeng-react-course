import { Button, message, Modal, Space, Switch, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Category, News } from './news.type';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import { getDraftList, deleteDraft, updateNews } from '../../api/news';
import { useAuth } from '../../components/Auth/hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';

const DraftList: React.FC = () => {
  // TODO: 优化 useMemo useCallback
  const columns: ColumnsType<News> = [
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render(value: string, row: News) {
        return <NavLink to={`/news-manage/preview/${row.id}`}>{value}</NavLink>
      }
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render(value: Category) {
        if (value) {
          return value.title
        }
        return '未知分类'
      }
    },
    {
      title: '操作',
      width: '30%',
      render(row: News) {
        return (
          <div>
            <Button
              type="primary"
              icon={<FormOutlined />}
              onClick={() => handleEdit(row)}>
              编辑
            </Button>

            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(row)}>
              删除
            </Button>
            <Button
              type="primary"
              icon={<FormOutlined />}
              onClick={() => handleAudit(row)}>
              提交审核
            </Button>
          </div>
        )
      }
    },
  ];


  const [list, setList] = useState<News[]>([])
  const { user } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    initList()
  }, [user.username])

  // 获取数据
  const initList = () => {
    if (!user.username) return
    getDraftList(user.username).then(res => {
      setList(res)
    })
  }

  const handleEdit = (row: News) => {
    navigate(`/news-manage/update/${row.id}`)
  }
  const handleAudit = (row: News) => {
    updateNews(row.id + '', {
      auditState: 1
    }).then(res => {
      message.success('已提交')
      initList()
    })
  }
  // 删除
  const handleDelete = (row: News) => {
    const { id } = row
    Modal.confirm({
      title: '是否确定删除',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteDraft(id).then(res => {
          initList()
        })
      }
    });
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={(row) => row.id}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default DraftList;