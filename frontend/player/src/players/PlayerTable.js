import './PlayerTable.css';
import React ,{
    useState,
    useEffect
} from "react";
import config from '../config';
import { Table } from 'antd';
import qs from 'query-string';
import { useLocalStorage } from 'react-use-storage';
import { getPreferencesUrlToStorage, getPreferencesToStorage, preferencesToStorage } from './utils/localStorage';


const PlayerTable = (props) => {

    const columns = [{
        title: "Name",
        dataIndex: "name",
        width: "20%",
        key:"name"
    },
{
    title: "LastName",
    dataIndex: "lastName",
    width: "20%"
}];

const fetchApi = (pageSize, current) => {
    const url =
    "/team/players?" +
    new URLSearchParams({
        limit: pageSize,
        skip: current -1
    });

    fetch(url , {
        headers: { Accept: "application/json" },
    })
    .then((response) => response.json())
    .then((response)=> {
        const { players = [], pagination} = response.players;
        const auth = response.auth;


        if(auth){
            setData({
                players,
                pagination: {
                    current: current || 1,
                    pageSize: pagination.pageSize || 10,
                    total: pagination.total || 5,
                },
            })

            setPreferencesToStorage({
                current: getCurrentPage()
            });
            setLoading(false);
        }
    })
};


useEffect(() => {
    fetchApi(data.pagination.pageSize, data.pagination.current);

    return () => 
        setData({
            players: [],
            pagination: {
                current:1,
                pageSize: 10,
            },
        });
}, []);

const handleTableChange = (pagination) => {
    fetchApi(pagination.pageSize, pagination.current);
};


   
    const [loading, setLoading] = useState(true);

    const preferences = getPreferencesUrlToStorage("table");
    const [preferencesStorage, setPreferencesToStorage] = useLocalStorage( preferences, {
        current: preferences[preferencesToStorage.PAGE_TABLE] || 1
    });
    const [data, setData] = useState({
            players: [],
            pagination: {
                current: getCurrentPage(),
                pageSize: getPageSize(),
                total: 0,
                preferencesStorage
            },
        });
    
     const {players, pagination} = data;

    function getCurrentPage(){
        const queryParams = qs.parse(props.url.search);
        const current = queryParams.current;
        return current ? Number(current) : 1;
    }

    function getPageSize(){
    const queryParams = qs.parse(props.url.search);
    const pageSize = queryParams.pageSize;
    return pageSize ? Number(pageSize) : 5;
    }

    

    return (
      <Table
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={players}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange} 
      />
    )

}

export default PlayerTable;