import React from 'react';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../interfaces';

import styles from './Drawer.module.scss';

type Props = {
    items: CartItem[];
    onClose: () => void;
    onRemove: (id: string) => void;
    opened: Boolean;

}

function Drawer({ onClose, onRemove, items = [], opened }: Props) {
//   const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

//   const onClickOrder = async () => {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.post('/orders', {
//         items: cartItems,
//       });
//       setOrderId(data.id);
//       setIsOrderComplete(true);
//       setCartItems([]);

//       for (let i = 0; i < cartItems.length; i++) {
//         const item = cartItems[i];
//         await axios.delete('/cart/' + item.id);
//         await delay(1000);
//       }
//     } catch (error) {
//       alert('Ошибка при создании заказа :(');
//     }
//     setIsLoading(false);
//   };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Кошик <img onClick={onClose} className="cu-p" src="img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.sneaker.imange_url})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.sneaker.title}</p>
                    <b>{obj.sneaker.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Підсумок:</span>
                  <div></div>
                  <b>{0} грн. </b>
                </li>
                <li>
                  <span>Податок 5%:</span>
                  <div></div>
                  <b>{(0 / 100) * 5} грн. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={()=>{}} className="greenButton">
                Оформити зaмовлення <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Замолення оформлено!' : 'Кошик пустий'}
            description={
              isOrderComplete
                ? `Ваше замовлення #${orderId} невдовзі буде передано до кур'єрської служби`
                : 'Додайте хоча б один товар, щоб сдійснити замовлення.'
            }
            image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;