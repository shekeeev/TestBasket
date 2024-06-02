import React, { FC, useEffect } from 'react';
import s from './Home.module.scss'
import { fetchByCard } from '../../Store/Slice/cardSlice';
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/hooks';
import { Link } from 'react-router-dom';
import { FaShoppingBasket } from "react-icons/fa";
import Card from '../Card/Card';
const Home: FC = () => {
    const dispatch = useAppDispatch()
    const { allCard, token } = useAppSelector(state => state.card)
    useEffect(() => {
        dispatch(fetchByCard())
    }, [dispatch])
    return (
        <section className={s.backround}>
            <div className={'container'}>
                <div className={s.display}>
                    {allCard.map(el => <Card key={el.id} {...el} />)}
                </div>
            </div>

        </section>

    );
};

export default Home;