import React, { PropTypes } from 'react'
import { Table, Tag } from 'antd'
import styles from './browser.less'

const status = {
  1: {
    color: '#64ea91',
  },
  2: {
    color: '#f69899',
  },
  3: {
    color: '#8fc9fb',
  },
  4: {
    color: '#f8c82e',
  },
}



function Browser ({ data }) {
  const columns = [
    {
      title: '报警位置',
      dataIndex: 'area_code',
      render: (text) =>
        <p className={styles.content}>{text}未处理事件</p>,
    }, {
      title: '五违报警数量',
      dataIndex: 'count',
      render: (text, it) => <Tag color={status[it.status].color}>{text}</Tag>,
    },{
          title: '文明报警数量',
          dataIndex: 'civcount',
          render:(text,it) => {
          	let test = '#8fc9fb'
          	if(text > 10 ) {
                test = '#f69899'
            }else if((text >=5 ) &&( text < 10)){
                test = '#f8c82e'
            }
          	return <Tag color={test}>{text}</Tag>
          }
      },
  ]
  return (
        <Table pagination={false} showHeader={true} columns={columns} rowKey={(record, key) => key} dataSource={data} />
      )
}

Browser.propTypes = {
  data: PropTypes.array,
}

export default Browser
