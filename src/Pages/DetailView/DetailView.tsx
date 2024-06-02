import React, { FC, useEffect, useState } from 'react';
import s from './DetailView.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/hooks';
import { fetchByCard, fetchByCardSingle } from '../../Store/Slice/cardSlice';
import { CardModules } from '../../Store/Modules';
import { FaArrowCircleLeft, FaShoppingBasket } from 'react-icons/fa';
import { IconButton } from '@mui/material';
const DetailView: FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { card, token } = useAppSelector(state => state.card)
    const goBack = () => {
        navigate(-1)
    }
    useEffect(() => {
        id &&
            dispatch(fetchByCardSingle(id))
    }, [dispatch])


    return (
        <section >
            <span onClick={goBack} className={s.arrow}><FaArrowCircleLeft color='yellow' /></span>
            <div className={s.detailviewCard}>
                <div className={s.card}>
                    <img src={card?.image} alt="" />
                    <h2>{card?.title}</h2>
                    <h2>{card?.description}</h2>
                    <h2 className={s.padding}>Цена: {card?.price} $</h2>

                </div>
            </div>


        </section>
    );
};

export default DetailView;