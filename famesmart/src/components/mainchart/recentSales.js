import React, { PropTypes } from 'react'
import { Table, Tag } from 'antd'
import styles from './recentSales.less'

const status = {
  低: {
    color: '#64ea91',
  },
  中: {
    color: '#f8c82e',
  },
  高: {
    color: '#f69899',
  },
}

function RecentSales ({ data }) {
  const columns = [
    {
      title: '区域',
      dataIndex: 'area_code',
    }, {
      title: '等级',
      dataIndex: 'status',
      render: text => <Tag color={status[text].color}>{text}</Tag>,
    }, {
      title: '报警时间',
      dataIndex: 'date',
      // render: text => new Date(text).format('yyyy-MM-dd'),
    }, {
      title: '状态',
      dataIndex: 'count',
      render: (text, it) => <span style={{ color: status[it.status].color }}>{text}</span>,
    },
  ]
  return (
    <div className={styles.recentsales}>
      <Table pagination={false} columns={columns} rowKey={(record, key) => key} dataSource={data.filter((item, key) => key < 5)} />
      <div style={{ width: '100%', paddingTop: '20px', textAlign: 'right' }} >
        <a>..更多</a>
      </div>
    </div>
  )
}

RecentSales.propTypes = {
  data: PropTypes.array,
}

export default RecentSales
