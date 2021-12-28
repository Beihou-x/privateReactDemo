import React, { useEffect, useState } from 'react';
import {
	Row,
	Col,
	Tree,
	List,
	Card,
	Input
} from 'antd';
import styles from './index.less'

type DeviceListProps = {
	services: (params: object) => Promise<any>;
	onChange?: (values: any) => void;
	values?: string[];
	active?: string;
	deviceServices: (params: object) => Promise<any>;
};

const DeivceList: React.FC<DeviceListProps> = ({
	services,
	onChange,
	values,
	active,
	deviceServices
}) => {
	const [tagList, setTag] = useState([]);

	useEffect(() => {
		handleCategorySearch({});
	}, []);

	const getTreeData = (data) => {
		return data.map(m => {
			if (m.childgroups) {
				return { title: <span>{active === '3' ? m.name : m.id}<span className={styles.color}>（设备数：{m.device_num || 0}）</span></span>, key: m.id, children: getTreeData(m.childgroups) }
			} else {
				return { title: <span>{active === '3' ? m.name : m.id}<span className={styles.color}>（设备数：{m.device_num || 0}）</span></span>, key: m.id }
			}
		})
	}

	const handleCategorySearch = async (params) => {
		try {
			const response = await services({
				...params
			});

			setTag(getTreeData(response || []));
		} catch (e) {
			console.error(e);
		}
	};

	//右侧设备列表展示
	const handleDeviceSearch = async (values) => {
		try {
			const dataIndex = active === '3' ? 'group_id' : 'source_id'
			const response = await deviceServices({
				[dataIndex]: values
			});
			onChange && onChange(response.items || [])
			console.log('====', response.items);
		} catch (e) {
			console.error(e);
		}
	};

	//左侧选择
	const handleCheck = (checkedKeys) => {
		if (checkedKeys && checkedKeys.length !== 0) {
			handleDeviceSearch(checkedKeys);
		}
	};

	const onChangeTree = e => {
		const { value } = e.target;
		handleCategorySearch({ id: value })
	};

	return (
		<Row>
			<div className={styles.source}>
				<Card style={{ width: 350, overflowY: 'auto' }} title={<div className={styles.title}><div>{active === '3' ? '标签信息' : '来源信息'}</div><div>已选设备：{values && values.length}</div></div>}>
					<Input style={{ marginBottom: 8 }} placeholder={active === '3' ? "请输入标签名称" : "请输入来源名称"} onChange={onChangeTree} />
					<Tree
						key={JSON.stringify(tagList)}
						treeData={tagList}
						checkable
						onCheck={handleCheck}
						defaultExpandAll
					/>
				</Card>
				<List
					className="demo-loadmore-list"
					itemLayout="horizontal"
					split={false}
					dataSource={values}
					style={{ width: 350, marginLeft: 10, overflowY: 'auto' }}
					header={<div>设备信息</div>}
					bordered
					renderItem={(item: any) => (
						<List.Item>
							{item.alias}
						</List.Item>
					)}
				/>
			</div>
		</Row>
	);
};

export default DeivceList;