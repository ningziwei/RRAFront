import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const RetrList = ({idx_txt_hgh}) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (parseInt(count)<parseInt(idx_txt_hgh.length)) {
      setData([...data, ...idx_txt_hgh.slice(count,count+10)]);
      setCount(count+10);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadMoreData();
  }, []);
  
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 500,
        overflow: 'auto',
        margin: '10px 0',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < idx_txt_hgh.length}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.idx}>
              <List.Item.Meta
                title={item.idx}
                description={item.abstract}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default RetrList;