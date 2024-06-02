import React, { FC } from 'react';
import s from '../Basket.module.scss'
import { CardModules } from '../../../Store/Modules';
import { filterCart } from '../../../Store/Slice/basketSlice';
import { useAppDispatch } from '../../../Store/Hooks/hooks';

const BasketCard: FC<CardModules> = (el) => {
    const dispatch = useAppDispatch()
    const deleteItem = () => {
        dispatch(filterCart(el))
    }
    return (
        <div className={s.card_in_basket}>
            <span onClick={deleteItem}>&#10006;</span>
            <div className={s.div_img}>
                <img src={el.image} alt={el.title} />
            </div>
            <div className={s.column}>
                <h2>{el.title} </h2>
                <h3>{el.price} $ </h3>
            </div>

        </div>
    );
};

export default BasketCard;