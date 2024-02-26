import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { HeaderSearchDataState } from '../recoil/atom/HeaderSearchDataState';
import { FormGroup, Switch } from '@mui/material';
import { DisplayModeState } from '../recoil/atom/DisplayModeState';
import ListBox from '@monorepo/component/src/stories/listbox/Listbox';
import CardList from '../components/card/CardList';
import { useCallback, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { PageState } from '../recoil/atom/PageState';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useLocation, useParams } from 'react-router-dom';
import { getSearchListStorage, saveSearchListStorage } from '../repository/SearchListRepository';

export default function HeaderSearchPage() {
    const techBlogSearchData = useRecoilValue(HeaderSearchDataState);
    const { search } = useParams();
    const [displayMode, setDisplayMode] = useRecoilState(DisplayModeState);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const setPage = useSetRecoilState(PageState);

    const location = useLocation();
    const KEY = 'search';
    const fetchMoreIssue = useCallback(() => {
        setPage(prev => prev + 1);
    }, [techBlogSearchData]);

    useEffect(() => {
        let searchItem = getSearchListStorage(KEY);
        searchItem.push(search);
        const uniqueSearch = Array.from(new Set(searchItem));
        saveSearchListStorage(KEY, uniqueSearch);
    }, [search]);

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);

    return (
        <div className="flex justify-between">
            <div className="flex flex-col w-full gap-6">
                <div className="flex justify-end w-10/12">
                    <div className="flex justify-center w-full">
                        <h1>Results for {location.state}</h1>
                    </div>
                    <FormGroup>
                        <Switch
                            {...label}
                            defaultChecked
                            onChange={e => setDisplayMode(e.target.checked)}
                            aria-label="DisplayMode Switch"
                        />
                    </FormGroup>
                </div>
                <div
                    className={`${
                        displayMode ? 'flex w-full gap-6 flex-col' : 'flex w-full gap-6 flex-wrap'
                    } `}
                >
                    {techBlogSearchData.length !== 0 ? (
                        displayMode ? (
                            <ListBox items={techBlogSearchData} />
                        ) : (
                            <CardList items={techBlogSearchData} />
                        )
                    ) : (
                        <div>
                            <QuestionMarkIcon />
                            <p>검색된 결과가 없습니다.</p>
                        </div>
                    )}
                </div>
                <div ref={setObservationTarget} />
            </div>
        </div>
    );
}
