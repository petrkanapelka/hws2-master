import React, { useEffect, useLayoutEffect, useState } from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import { useSearchParams } from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            { params }
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: ParamsType) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {
                // делает студент

                // сохранить пришедшие данные
                if (res) {
                    setTechs(res.data.techs)
                    setTotalCount(res.data.totalCount)
                }
                //
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        sendQuery({ page, count, sort });
    }, [count, page, sort]);


    const onChangePagination = (newPage: number, newCount: number) => {
        setPage(newPage)
        setCount(newCount)

        sendQuery({
            page: newPage, count: newCount,
            sort
        })
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('page', newPage.toString())
            params.set('count', newCount.toString())
            return params
        })
    }

    const onChangeSort = (newSort: string) => {
        setSort(newSort)
        setPage(1)

        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('sort', newSort)
            params.set('page', '1')
            return params
        })
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        const currentPage = +params.page || 1;
        const currentCount = +params.count || 4;
        sendQuery({ page: currentPage, count: currentCount, sort });
        setPage(currentPage);
        setCount(currentCount);
    }, [searchParams, sort]);


    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))
    console.log("🚀 ~ HW15 ~ mappedTechs ➔", mappedTechs);
    let opacity = idLoading ? '0.1' : '1'
    return (
        <div id={'hw15'} style={{ position: 'relative' }}>
            <div className={s2.hwTitle}>Homework #15</div>
            <hr></hr>
            {idLoading && <div id={'hw15-loading'} className={s.loading}></div>}
            <div className={s2.hw} style={{ opacity: opacity, position: 'relative' }}>

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                    id='hw15'
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort} id='hw15' />
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort} id='hw15' />
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15