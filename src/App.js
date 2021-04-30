import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, notification, Modal, Button} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function App()  {
    const [posts, setPosts] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [userId,setUserId]=useState("");
    const [Id,setId]=useState("");
    const [body,setBody]=useState("");
  const [title, setTitle] = useState("");
  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  const [data, setData] = useState({
    posts: [],
    searchData: [],
    isModalVisible: false,
    userId: '',
    Id: '',
    body: '',
    title: '',
  });
    
    const showModal = () => {
       // setIsModalVisible(true);
      setData({ isModalVisible: true });
      console.log(data.isModalVisible)
    };
    const handleOk = () => {
      setData({ isModalVisible: false });
      const data = {
        body: body,
        id: Id,
        title: title,
        userId: userId
      }
      setPosts(posts.push(data))
      console.log('posts', posts)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
  
    useEffect(() => {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        fetch(url).then(resp => resp.json())
            .then(resp => {
                setPosts(resp);
              setSearchData(resp);
              // console.log('posts', posts)
              
            }).catch(() => notification.error({
                message: 'Failed to the data',
            }))
    }, []);
  
    const Column = [
        {
            title: 'UserId',
            dataIndex: 'userId',
        },
        {
            title: 'Id',
            dataIndex: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title'
        },
        {
            title: 'Body',
            dataIndex: 'body'
        }
    ];
    const inputChanges = (event) => {
        let { value, name } = event.target;
        if (name === 'userId') {
            setUserId(value);
        }
        if (name === 'Id') {
            setId(value);
        }
        if (name === 'body') {
            setBody(value);
        }
        if (name === 'title') {
            setTitle(value);
        }
    }
    const handleChange = (event) => {
        let { value } = event.target;
        value = value.toString().toLowerCase();
        if (!value) {
            setPosts(searchData);
        } else {
            const filteredData = searchData.filter((res) => 
                res['title'].toString().toLowerCase().includes(value))
            setPosts(filteredData);
        }
    }
    return (
        <div className="App">
                    <Button type="primary" onClick={showModal}>
                Open Modal
      </Button>
      <input type="text" placeholder="Search" onChange={handleChange} />
            <Table dataSource={posts} columns={Column} />
            <Modal title="Add Post" visible={data.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <input type="text" name="userId" placeholder="User ID" onChange = {inputChanges} /><br/>
               <input type="text" name="Id" placeholder="Id" onChange = {inputChanges} /><br/>
               <input type="text" name="title" placeholder="Title" onChange = {inputChanges}/><br/>
               <input type="text" name="body" placeholder="Content" onChange = {inputChanges} /><br/>
            </Modal>
        </div>
    )
}
export default App;





