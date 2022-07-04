import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const RetrList = ({parent, idx_txt_hgh}) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (parseInt(count)<parseInt(idx_txt_hgh.length)) {
      let ITH_10 = [...idx_txt_hgh.slice(count,count+10)];
      setData(ITH_10)
      setCount(count+10);
      setLoading(false);
    }
  };
  useEffect(() => {loadMoreData();}, [idx_txt_hgh]);
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
        span={12}
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
        endMessage={<Divider plain>没有更多了 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.idx}>
              <List.Item.Meta
                // title={item.idx}
                title={<div onClick={()=>{parent.setState({idxShow:item.idx})
                      parent.setState({txtDetail:item.whole_txt})}}>
                      {item.idx}
                  </div>
                }
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