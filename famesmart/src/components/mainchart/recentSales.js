import React, {PropTypes} from 'react'
import {Table, Tag} from 'antd'
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

const status1 = {
    新建: {
        color: '#64ea91',
    },
    分发: {
        color: '#f8c82e',
    },
    处理中: {
        color: '#f69899',
    },
}

function RecentSales({data}) {
    const columns = [
        {
            title: '区域',
            dataIndex: 'area_code',
        }, {
            title: '等级',
            dataIndex: 'lvl',
            render: text => <Tag color={status[text].color}>{text}</Tag>,
        }, {
            title: '报警时间',
            dataIndex: 'time',
            // render: text => new Date(text).format('yyyy-MM-dd'),
        }, {
            title: '状态',
            dataIndex: 'status',
            render: text => <Tag color={status1[text].color}>{text}</Tag>,
            // render: (text) => <span style={status[text].color}>{text}</span>,
        }
    ]
    return (
        <div className={styles.recentsales}>
            <Table pagination={false} columns={columns} rowKey={(record, key) => key}
                   dataSource={data.filter((item, key) => key < 5)}/>
        </div>
    )
}

RecentSales.propTypes = {
    data: PropTypes.array,
}

export default RecentSales
