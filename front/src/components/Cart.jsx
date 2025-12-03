import {useState, useEffect} from 'react';


function Cart() {

  const [items, setItems] = useState([]);
  const userId = 'user213';

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${userId}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('장바구니 조회 실패:', error);
    }
  };

  const cartDelete = async (pId) => {
    try {
      const response = await fetch('http://localhost:8080/cart/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pId }),
      });
      const result = await response.json();
      if (result.result) {
        fetchCart();
      }
    } catch (error) {
      console.error('장바구니 삭제 실패:', error);
    }
  };

    const updateAmount = (id, newAmount) => {
    if (newAmount < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, amount: newAmount } : item
    ));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.amount, 0);

  return (
    <>
      <div>
        <h2>장바구니</h2>
      </div>
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
                    <button onClick={() => updateAmount(item.id, item.amount - 1)}>-</button>
                    <span>{item.amount}</span>
                    <button onClick={() => updateAmount(item.id, item.amount + 1)}>+</button>
                  </div>
                  <button onClick={() => cartDelete(item.id)}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>총 합계: {totalAmount.toLocaleString()}원</h3>
        <button>주문하기</button>
      </div>
    </>
  )
}

export default Cart