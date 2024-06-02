import React, { FC, useState } from 'react';
import s from './Header.module.scss'
import Authorization from '../../Pages/Authorization/Authorization';
import { useAppSelector } from '../../Store/Hooks/hooks';
import logo from '../../Assets/Images/jum.jpg'
import { FaShoppingBasket } from 'react-icons/fa';
import { removeCookiesToken } from '../Cookies';
import Basket from '../../Pages/Basket/Basket';
const Header: FC = () => {
    const [modalActive, setModalActive] = useState(false)
    const [basket, setBasket] = useState(false)
    const { token } = useAppSelector(state => state.card)
    const { count } = useAppSelector(state => state.basket)

    const deleteCookie = () => {
        removeCookiesToken()
        window.location.reload();
    }
    return (
        <>
            <header className={s.header}>
                <div className={s.headerDiv}>
                    <img src={logo} alt="logo" />
                    <div className={s.twoButton}>
                        {!token ?
                            <button className={s.btn} onClick={() => setModalActive(!modalActive)}><span>Войти</span></button>
                            :
                            <button onClick={deleteCookie}><span>Выйти</span></button>
                        }
                        {token && <button onClick={() => setBasket(true)}><FaShoppingBasket /> <span className={s.count}>{count}</span></button>}
                    </div>

                </div>

            </header>
            {basket && <Basket baskets={basket} setBasket={setBasket} />}
            {modalActive && (<Authorization modalActive={modalActive} setModalActive={setModalActive} />)}
        </>
    );
};

export default Header;