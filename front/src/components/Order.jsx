import {useState,useEffect} from 'react';


const Order = () => {

  const [items, setItems] = useState([]);
  const userId = 'user213';

  useEffect(() => {
      fetchCart();
    }, []);

  const cartPage = () => {
    window.history.back();
  }

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:8081/order/${userId}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error('데이터 형식 오류:', data);
        setItems([]);
      }
    } catch (error) {
      console.error('장바구니 조회 실패:', error);
    }
  };

  return (
    <>
    <button onClick={cartPage}>뒤로 돌아가기</button>
        <div>
            배송지명: <input type="text"/>
            받는분:<input type="text"/>
            연락처:<input type="text"/>
            주 소:<input type="text"/>
        </div>
        <div>
            <h1>배송 요청사항</h1>
            <select>
                <option>배송메시지를 선택해주세요.</option>
                <option>문앞에 놔주세요</option>
                <option>문앞에 놔</option>
                <option>문앞에...</option>
                <option>문앞에 좀...</option>
            </select>
            <div>
              <div>
                  <div>
                  {items.length === 0 ? (
                    <div>
                      <p>장바구니가 비었습니다.</p>
                    </div>
                  ):(
                    <ul>
                      {items.map((item)=>(
                        <li key={item.id}>
                          {/* <div>
                            <img src={item.image} alt={item.name}/>
                          </div> */}
                          <div>
                            <p>{item.name}</p>
                            <p>{item.price.toLocaleString()}원</p>
                            <div>
                              <span>{item.amount}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>    
            </div>
        </div>
    </>
  )
}

export default Order
