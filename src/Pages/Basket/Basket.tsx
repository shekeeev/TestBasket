import React, { FC, useEffect, useState } from 'react';
import s from './Basket.module.scss'
import { useAppSelector } from '../../Store/Hooks/hooks';
import { CardModules } from '../../Store/Modules';
import BasketCard from './BasketCard/BasketCard';
interface BasketProps {
    setBasket: (e: boolean) => void
    baskets: boolean
}
const Basket: FC<BasketProps> = ({ baskets, setBasket }) => {
    const { basket } = useAppSelector(state => state.basket)
    const [allPrice, setAllPrice] = useState<number | null>(null)
    const totalSumInCart = (arr: CardModules[]) => {
        const result = arr?.reduce((sum, el) => {
            sum += +el.price
            return sum
        }, 0)
        return result
    }

    useEffect(() => {
        setAllPrice(Math.ceil(totalSumInCart(basket)))
    }, [basket])

    useEffect(() => {
        // При рождении убрать скрол
        document.body.style.overflow = 'hidden'
        // При нажатии на ESC закрыть модальное окно
        document.addEventListener('keydown', (e) => {
            e.code === 'Escape' && setBasket(false)
        })
        // При рождении навесит другое событие на кнопку назад у браузера
        if (baskets) {
            window.history.pushState(null, '', window.location.href)
            window.onpopstate = () => setBasket(false);
        }
        return () => {
            // При закрытии  модального окна вернуть скролл
            document.body.style.overflow = 'auto'
            // При закрытии убрать действия с кнопки ESC
            document.removeEventListener('keydown', () => { })
            // При закрытии вернуть действие по умолчанию на кнопку назад в браузере
            if (!baskets) window.history.back();
            window.onpopstate = () => { };
            window.location.reload();
        }
    }, [])

    return (
        <div onClick={() => setBasket(false)} className={s.basket}>
            <div onClick={e => e.stopPropagation()} className={s.in_basket}>
                <div className={s.displayTop}>
                    <h2>Корзина</h2>
                    <span onClick={() => setBasket(false)} >&#10006;</span>
                </div>
                <div className={s.output}>
                    {
                        basket.length > 0 ?
                            basket.map(el => (
                                <BasketCard key={el.id} {...el} />
                            )) :
                            <h3>Box</h3>
                    }
                </div>
                <div className={s.prise_in_card}>
                    <h2>{`Общая стоимость: ${allPrice}$`}</h2>
                </div>
            </div>
        </div>
    );
};

export default Basket;