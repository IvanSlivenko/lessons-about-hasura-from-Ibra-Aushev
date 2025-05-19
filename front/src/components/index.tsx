import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

type Props = {
  onClickCart: () => void 
}

function Header({ onClickCart}: Props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/barbecue.jpeg" alt="Logotype"  style={{ borderRadius: '50%' }}/>
          <div>
            <h3 className="text-uppercase">Pizza</h3>
            <p className="opacity-5">Смачна піцца</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="Корзина" style={{ borderRadius: '50%' }} />
          <span>{totalPrice} грн.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="/img/heart.svg" alt="Обране" style={{ borderRadius: '50%' }} />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="/img/user.svg" alt="Користувач" style={{ borderRadius: '50%' }} />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;