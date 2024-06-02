import React, { FC, useEffect } from 'react';
import s from './Main.module.scss'
import { Route, Routes } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import Authorization from '../../Pages/Authorization/Authorization';
import DetailView from '../../Pages/DetailView/DetailView';
import { getCookiesToken } from '../Cookies';
import { useAppDispatch } from '../../Store/Hooks/hooks';
import { setToken } from '../../Store/Slice/cardSlice';
import { getLS } from '../../LS';
import { setUpdateCartArr } from '../../Store/Slice/basketSlice';

const Main: FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        let cookieToken = getCookiesToken()
        if (cookieToken !== null && cookieToken !== undefined) {
            dispatch(setToken(cookieToken))
        }
    }, [dispatch])
    useEffect(() => {
        const data = getLS()
        if (data !== null || data !== undefined) {
            dispatch(setUpdateCartArr(data))
        }
    }, [dispatch])
    return (
        <div className={s.mainBackround}>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/authorization' element={<Authorization setModalActive={} />} /> */}
                <Route path='/detailview/:id' element={<DetailView />} />
            </Routes>
        </div>
    );
};

export default Main;