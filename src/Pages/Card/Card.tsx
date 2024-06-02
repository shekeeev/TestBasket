import React, { FC, useEffect, useState } from 'react';
import { CardModules } from '../../Store/Modules';
import { useAppSelector } from '../../Store/Hooks/hooks';
import { FaShoppingBasket } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import s from '../Home/Home.module.scss'
import { setCartArr } from '../../Store/Slice/basketSlice';
import { useAppDispatch } from './../../Store/Hooks/hooks';
const Card: FC<CardModules> = (el) => {
    const { token } = useAppSelector(state => state.card)
    const dispatch = useAppDispatch()
    const { basket } = useAppSelector(state => state.basket)
    const [checkId, setCheckId] = useState(true)
    const addBasket = () => {
        dispatch(setCartArr([...basket, el]))
    }
    useEffect(() => {
        basket.filter(key => key.id === el.id && setCheckId(false))
    }, [basket])

    return (
        <div className={s.bg}>
            <img src={el.image} alt={el.title} />
            <h2>{el.title}</h2>
            {token && checkId &&
                <span onClick={addBasket} ><FaShoppingBasket /></span>
            }
            <Link to={`/detailview/${el.id}`}>
                <p>Подробнее...</p>
            </Link>
        </div>
    );
};

export default Card;