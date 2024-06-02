import React, { FC, FormEventHandler, useEffect, useState } from 'react';
import s from './Authorization.module.scss';
import { UserModules } from '../../Store/Modules';
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/hooks';
import { fetchByUserData, fetchByUserToken } from '../../Store/Slice/cardSlice';
interface OpenAvatarProps {
    setModalActive: (e: boolean) => void
    modalActive: boolean
}

const Authorization: FC<OpenAvatarProps> = ({ modalActive, setModalActive }) => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(state => state.card)
    const [changeInput, setChangeInput] = useState(false)

    const [userData, setUserData] = useState<UserModules>({
        username: '',
        password: '',
    })


    const getUserData = (key: string, value: string) => {
        setUserData({ ...userData, [key]: value.trim() })
    }
    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        if (userData.username) {
            dispatch(fetchByUserData(userData))
        } else if (!userData.username) {
            // setErrorText('Введите username!')
        }
    }

    useEffect(() => {
        console.log(token);
        token &&
            setModalActive(false)

    }, [dispatch, token])

    useEffect(() => {
        // При рождении убрать скрол
        document.body.style.overflow = 'hidden'
        // При нажатии на ESC закрыть модальное окно
        document.addEventListener('keydown', (e) => {
            e.code === 'Escape' && setModalActive(false)
        })
        // При рождении навесит другое событие на кнопку назад у браузера
        if (modalActive) {
            window.history.pushState(null, '', window.location.href)
            window.onpopstate = () => setModalActive(false);
        }
        return () => {
            // При закрытии  модального окна вернуть скролл
            document.body.style.overflow = 'auto'
            // При закрытии убрать действия с кнопки ESC
            document.removeEventListener('keydown', () => { })
            // При закрытии вернуть действие по умолчанию на кнопку назад в браузере
            if (!modalActive) window.history.back();
            window.onpopstate = () => { };
        }
    }, [])

    return (
        <div>

            <div className={s.PrivacyPolicy} onClick={() => setModalActive(false)} >
                <div className={s.PrivacyPolicy_card} onClick={(e) => e.stopPropagation()}>
                    <span onClick={() => setModalActive(false)} className={s.closed}>&#10006;</span>
                    <form className={s.formCard} onSubmit={handleSubmit}>
                        <input onChange={(e) => getUserData('username', e.target.value)} value={userData.username} type="text" />
                        <label>
                            <input onChange={(e) => getUserData('password', e.target.value)} value={userData.password} type={changeInput ? "text" : "password"} />
                            <span onClick={() => setChangeInput(!changeInput)}>ok</span>
                        </label>
                        <button>Войти</button>
                    </form>
                </div>
            </div >

        </div>

    );
};

export default Authorization;