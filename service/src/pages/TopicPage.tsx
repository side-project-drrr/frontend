import { useEffect, useRef, useState } from "react"
import HttpClient from "../apis/HttpClient";
import { Chip, Stack, TextField } from "@mui/material";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const indexKr = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하']
const indexEn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const indexText = indexEn.concat(indexKr)

type allTopicsType = {
    category: topicsType[],
    keyIndex: string
}

type topicsType = {
    id: number,
    name: string
}

export default function TopicPage() {
    const obsRef = useRef(null)
    const preventRef = useRef(true)
    const [tabContWidth, setTabContWidth] = useState<number>(0)
    const [tabWidth, setTabWidth] = useState<number>(0)
    const [tabPosition, setTabPosition] = useState<number>(0)
    const [allTopics, setAllTopics] = useState<allTopicsType[]>([])
    const [topics, setTopics] = useState<topicsType[]>([])
    const [page, setPage] = useState<number>(0)
    const [topicIndex, setTopicIndex] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [timer, setTimer] = useState<NodeJS.Timeout>()
    
    // 검색 api
    async function getSearchTopicsApi(value: string){
        const res = await HttpClient.get('/api/v1/categories/keyword-search', {
            params: {
                page: page,
                size: 200,
                sort: 'name',
                direction: 'ASC',
                keyword: value
            }
        })

        return res
    }

    // 검색 topic 무한 스크롤
    async function infiniteSearchTopics(value: string){
        const res = await getSearchTopicsApi(value)

        if(res.status === 200) {            
            setTopics(prev => [...prev, ...res.data.content])
            preventRef.current = true
        }
    }

    // 검색 기능 디바운스를 사용하여 함수 실행 지연
    function handleSearch(value: string){
        if (timer) {
            clearTimeout(timer);
        }
    
        const newTimer = setTimeout(async() => {
            setSearchVal(value)
            setPage(0)
            setTopicIndex('')

            const res = await getSearchTopicsApi(value)

            if(res.status === 200) {
                setTopics(res.data.content)
            }
        }, 1000)

        setTimer(newTimer)
    }

    // 탭 오른쪽 왼쪽 클릭시
    function handleOnClickLeft(){
        if(tabPosition + 200 > 0) {
            setTabPosition(0)
        }else {
            setTabPosition(tabPosition + 200)
        }
    }

    // 탭 오른쪽 화살표 클릭시
    function handleOnClickRight(){
        if(tabPosition - 200 < tabContWidth - tabWidth) {
            setTabPosition(tabContWidth - tabWidth)
        }else {
            setTabPosition(tabPosition - 200)
        }
    }

    //인덱스 api
    async function getIndexTopicsApi(index: string){
        const res = await HttpClient.get('/api/v1/categories/index-search', {
            params: {
                page: page,
                size: 200,
                sort: 'name',
                direction: 'ASC',
                language: 'KOREAN',
                index: index
            }
        })

        return res
    }

    // 인덱스 topic 무한 스크롤
    async function infiniteIndexTopics(index:string){
        const res = await getIndexTopicsApi(index)

        if(res.status === 200) {            
            setTopics(prev => [...prev, ...res.data.content])
            preventRef.current = true
        }
    }

    // 인덱스별 카테고리 호출
    async function handleIndex(index: string){
        setTopicIndex(index)
        setSearchVal('')
        setPage(0)

        const res = await getIndexTopicsApi(index)

        if(res.status === 200){
            setTopics(res.data.content)
        }
    }

    // 전체 topic 노출
    function getAllTopics(){
        setTopicIndex('')
        setSearchVal('')
    }

    // 옵저버 핸들러
    function obsHandler(entries: IntersectionObserverEntry[]){
        const target = entries[0]
        
        if(preventRef.current && target.isIntersecting){
            preventRef.current = false            
            setPage((prev) => prev+1)
        }
    }

    useEffect(() => {
        // 옵저버 생성
        const observer = new IntersectionObserver(obsHandler, {threshold: .5})
        if(obsRef.current) observer.observe(obsRef.current)

        // 카테고리 탭과 탭 컨테이너 너비 구하기
        function getTabAndTabContWidth(){
            const tab = document.getElementById('category-tab')?.offsetWidth
            tab && setTabWidth(tab)

            const tabContWidth = document.getElementById('category-tab-container')?.offsetWidth
            tabContWidth && setTabContWidth(tabContWidth)
        }
        
        // 반응형으로 인해 너비가 달라지는 탭 컨테이너 너비 구하기
        function getTabContainerWidth(){
            const tabContWidth = document.getElementById('category-tab-container')?.offsetWidth
            tabContWidth && setTabContWidth(tabContWidth)
            
        }
        
        // 전체 카테고리 호출
        async function getAllTopics(){
            try {
                const resKo = await HttpClient.get('/api/v1/categories/range',{
                    params: {
                        startIdx: '가',
                        endIdx: '하',
                        language: 'KOREAN',
                        size: 10
                    }
                })

                const resEn = await HttpClient.get('/api/v1/categories/range',{
                    params: {
                        startIdx: 'a',
                        endIdx: 'z',
                        language: 'ENGLISH',
                        size: 10
                    }
                })

                if(resKo.status === 200 && resEn.status === 200){
                    const resKoData = resKo.data.content
                    const resEnData = resEn.data.content
                    const res = resEnData.concat(resKoData)

                    setAllTopics(res)                    
                }
                
                
            } catch (error) {
                console.log(error)
            }
        }

        getTabAndTabContWidth()
        getAllTopics()

        return () => {
            window.removeEventListener('resize', getTabContainerWidth)
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        searchVal && infiniteSearchTopics(searchVal)
        topicIndex && infiniteIndexTopics(topicIndex)
    }, [page])

    return (
        <div className='p-10'>
            <div className='flex flex-col item-center mb-10'>
                <h1 className='text-center mb-8'>Explore topics</h1>
                <TextField id="filled-basic" value={searchVal} onChange={(e) => handleSearch(e.target.value)} label="Enter topic..." variant="filled" sx={{
                    '& .MuiFilledInput-root': {
                        borderRadius: '30px',
                    },
                    '.MuiFilledInput-root::before': {
                        display: 'none'
                    },
                    '.MuiFilledInput-root::after': {
                        display: 'none'
                    },
                    '& .MuiFormLabel-root': {
                        left: '10px'
                    },
                    '.MuiInputBase-input': {
                        paddingLeft: '20px'
                    }
                }}/>
            </div>
            <div className='flex justify-between items-center w-full h-[32px]'>
                <MdKeyboardArrowLeft onClick={handleOnClickLeft} className='cursor-pointer' size={30}/>
                <div id='category-tab-container' className='relative h-full w-full overflow-hidden'>
                    <Stack id='category-tab' className='absolute t-0 z-0' style={{left: `${tabPosition}px`, transition: 'all .5s ease'}} direction="row" spacing={1}>
                        <Chip onClick={getAllTopics} label='All' sx={{cursor:'pointer', background: topicIndex === 'All' ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, 0.16)'}}/>
                        {
                            indexText.map((data, index) => (
                                <Chip onClick={() => handleIndex(data)} key={index} label={data} sx={{cursor:'pointer', background: topicIndex === data ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, 0.16)'}}/>
                            ))
                        }
                        <Chip onClick={() => handleIndex('a')} label='기타' sx={{cursor:'pointer', background: topicIndex === 'All' ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, 0.16)'}}/>
                    </Stack>
                </div>
                <MdKeyboardArrowRight onClick={handleOnClickRight} className='cursor-pointer' size={30}/>
            </div>
            <div className='mt-10'>
                {
                    (searchVal === '' && topicIndex === '') ? (
                        <div className='grid grid-cols-3 gap-10'>
                            {
                                allTopics.map((data, index) => (
                                    <div className='relative' key={index}>
                                        <span onClick={() => handleIndex(data.keyIndex)} className='absolute top-0 right-0 text-xs cursor-pointer'>더보기</span>
                                        <h2 className='border-b-[1px] border-zinc-500 text-xl font-bold mb-3'>{data.keyIndex}</h2>
                                        <ul className='flex flex-col gap-1'>
                                            {
                                                data.category.map((item, idx) => (
                                                    <li className='cursor-pointer truncate ...' key={idx}>
                                                        <span className='hover:underline'>{item.name}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            } 
                        </div>
                    ) : (
                        <Stack spacing={{sm:1}} direction="row" useFlexGap flexWrap="wrap">
                            {
                                topics.map((data, index) => (
                                    <Chip key={index} label={data.name} sx={{cursor: 'pointer'}}/>
                                ))
                            }
                        </Stack>
                    )
                }
            </div>
            <div ref={obsRef}/>
        </div>
    )
}
