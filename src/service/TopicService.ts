import { AxiosResponse } from 'axios';
import HttpClient from '../apis/HttpClient';

type indexDataType = {
    content: {
        id: number;
        name: string;
    }[];
    first: boolean;
    last: boolean;
};

// 검색 데이터에 해당하는 리스트를 찾는 api - 무한스크롤
export async function getSearchTopicsApi(page: number, value: string) {
    try {
        const { data }: AxiosResponse<indexDataType> = await HttpClient.get(
            '/api/v1/categories/keyword-search',
            {
                params: {
                    page: page,
                    size: 200,
                    sort: 'name',
                    keyword: value,
                },
            },
        );

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

//인덱스 해당하는 리스트를 찾는 api - 무한스크롤
export async function getIndexTopicsApi(page: number, index: string) {
    try {
        const { data }: AxiosResponse<indexDataType> = await HttpClient.get(
            '/api/v1/categories/index-search',
            {
                params: {
                    page: page,
                    size: 200,
                    sort: 'name',
                    type: 'KOREAN',
                    index: index,
                },
            },
        );

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

//기타 인덱스 해당하는 리스트를 찾는 api - 무한스크롤
export async function getEtcIndexTopicsApi(page: number) {
    try {
        const { data }: AxiosResponse<indexDataType> = await HttpClient.get(
            '/api/v1/categories/search-etc',
            {
                params: {
                    page: page,
                    size: 200,
                },
            },
        );

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

type indexType = {
    content: {
        category: { id: number; name: string }[];
        keyIndex: string;
    }[];
};

// 마운트 후 한번만 실행되는 api, 가나다 순 토픽 종류 10가지씩을 호출
export async function getRangeKorApi() {
    try {
        const { data }: AxiosResponse<indexType> = await HttpClient.get(
            '/api/v1/categories/range',
            {
                params: {
                    startIdx: '가',
                    endIdx: '하',
                    type: 'KOREAN',
                    size: 10,
                },
            },
        );

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// 마운트 후 한번만 실행되는 api, ABC 순 토픽 종류 10가지씩을 호출
export async function getRangeEngApi() {
    try {
        const { data }: AxiosResponse<indexType> = await HttpClient.get(
            '/api/v1/categories/range',
            {
                params: {
                    startIdx: 'a',
                    endIdx: 'z',
                    type: 'ENGLISH',
                    size: 10,
                },
            },
        );

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// 마운트 후 한번만 실행되는 api, ABC 순 토픽 종류 10가지씩을 호출
export async function getRangeEtcApi() {
    try {
        const { data }: AxiosResponse<indexType> = await HttpClient.get(
            '/api/v1/categories/range/etc',
            {
                params: {
                    size: 10,
                },
            },
        );

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
