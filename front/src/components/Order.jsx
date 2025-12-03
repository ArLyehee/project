import {useState} from 'react';


const Order = () => {
  return (
    <>
        <div>
            배송지명: <input type="text"/>
            받는분:<input type="text"/>
            연락처:<input type="text"/>
            주 소:<input type="text"/>
        </div>
        <div>
            <h1>배송 요청사항</h1>
            배송메시지
            <select>
                <option>문앞에 놔줘</option>
                <option>문앞에 놔</option>
                <option>문앞에 놔줘</option>
                <option>문앞에 놔줘</option>
            </select>
        </div>
    </>
  )
}

export default Order
