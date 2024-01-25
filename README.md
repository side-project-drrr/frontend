# drrr

<br />

## ABOUT

<div align='center'>
    <h2> drrr</h2>  
    <p>기술 블로그 선호 카테고리별 추천 서비스 </p>
    <br />    
</div>

## TEAM

<div align='center'>
<table> 
  <tbody>
    <tr>            
       <td align="center"><a href="https://github.com/rondido"><img src="https://avatars.githubusercontent.com/u/55516901?v=4" width="100px;" alt=""/><br /><sub><b>박진현</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
</div>

<br />

## 기술 스택

- Development

  ![React](https://img.shields.io/badge/React-18.2.0-1E90FF?logo=React)
  ![Vite](https://img.shields.io/badge/Vite-4.1.0-C8C8FF?logo=Vite)
  ![React-Router-Dom](https://img.shields.io/badge/react--router-6.14.1-CA4245?logo=reactRouter)
  ![tailwindcss](https://img.shields.io/badge/tailwindcss%2Fcss-3.3.4-06B6D4?logo=tailwindcss)
  ![Axios](https://img.shields.io/badge/axios-1.4.0-%23671DDF?logo=axios)
  ![Recoil](https://img.shields.io/badge/Recoil--0.7.7-1E90FF?logo=Recoil)
  ![Msw](https://img.shields.io/badge/Msw--2.0.3-FF8C8C?logo=Msw)
  ![Eslint](https://img.shields.io/badge/Eslint--8.35.0-7B68EE?logo=Eslint)
  ![Prettier](https://img.shields.io/badge/Prettier--2.8.8-483D8B?logo=Prettier)
  ![Typescript](https://img.shields.io/badge/Typescript--5.0.2-3178C6?logo=Typescript)
  ![testinglibrary](https://img.shields.io/badge/testinglibrary--14.0.0-E33332?logo=testinglibrary)
  ![Yarn-Berry](https://img.shields.io/badge/Yarn-Berry--3.6.3-483D8B?logo=Yarn-Berry)
  ![Storybook](https://img.shields.io/badge/Storybook--7.4.0-FF4785?logo=Storybook)
  ![Vitest](https://img.shields.io/badge/Vitest--0.34.4-6E9F18?logo=Vitest)
  ![Mui](https://img.shields.io/badge/Mui--5.14.20-007FFF?logo=Mui)
  

## 폴더 구조

```
📦component
   📦src
    ┣ 📂stories
    ┣ App.jsx
    ┣ Main.jsx

📦service
   📦src
    ┣ 📂apis
    ┣ 📂assets
    ┣ 📂components    
    ┣ 📂hooks
    ┣ 📂mocks => msw를 관련 폴더
    ┣ 📂pages
    ┣ 📂recoil
    ┣ 📂repository 
    ┣ 📂service
    ┣ 📂style    
    ┣ 📂ThemeContext
    ┣ 📂webpush
    ┣ App.jsx
    ┣ Main.jsx
📦test

```

## 실행 방법

yarn version 3.6.3

```bash
yarn install
# or
yarn service
# or
yarn run build

```

## 디자인

---

<p><a href="https://www.figma.com/file/TqDxmThYhuWpAcLwf8aqrL/Untitled?type=design&node-id=0-1&mode=design&t=z2PJCoDWR593bNnL-0">Figma 링크 주소</a>
</p>

---

<p><a href="https://artisan-jaehon.notion.site/dr-r-r-5bbfdb6fe24e474ca5ea802aeceabbc4?pvs=4">노션 회의록 링크</a></p>

<br/>

## 서비스 소개

<p>다양한 기술 블로그를 사용자가 각자 선호하는 키워드들을 등록하여 한곳에서 모아서 볼 수 있도록 구현한 서비스</p>
<p>매일 웹 푸시 알림을 통한 카테고리에 맞는 추천 게시글 push</p>

---

### 기능

- 메인 페이지
   -  추천 게시글 (slider)
   -  모든 게시글 (infiniti scroll)
   -  하루 가장 많이 검색된 TopKeyword 추출
   -  가장 많이 조회된 기술 블로그 Top5 추출
   
- 소셜 로그인
   - Github 로그인
   - KaKao 로그인
   - 처음 서비스 이용시 선호 카테고리 등록 및 간단한 이메일 인증

- Web Push 알림
   - 알림을 받은 기술 블로그 페이지
     
- Header
   - 다크 모드 구현
   - 검색 기능 구현
   - 프로필 이미지
      - 로그 아웃
      - 개인정보 수정
        
- 기술 블로그 디테일 페이지
  
- 모든 카테고리 볼 수 있는 페이지
  
---

## 회고

## Rondido

### Monorepo

백오피스, 서비스, 공통 디자인 컴포넌트를 하나의 저장소에서 관리하기 위해 Monorepo 프로젝트 세팅

이 과정에서 Monorepo 장단점 및 Mutirepo의 차이점을 알게 됨.

Yarn Berry를 사용하면서 Node_modules의 문제점과 zero-install에 대한 학습

---

### Api 호출은 어떤 컴포넌트에서 진행해야 하는가?

해당 컴포넌트에서 API 호출 로직을 작성하게 좋은가? || 최상위 컴포넌트에서 API 호출 관련 로직을 작성하는게 좋은가?

프론트엔드 관련 개발자 커뮤니티에 해당 내용 공유 후 토론 진행

다양한 답변이 있었지만 대표적으로

1. 이건 설계할 때 각 컴포넌트의 목적성 부여 여부에 따라 다를 것 같다.
2. 분리
3. 해당 컴포넌트
4. Context Api 
    - 불필요한 리렌더링 발생 및 Recoil을 활용하여 전역상태 관리

- 해당 컴포넌트에서 관리 및 분리하여 사용

---


### 이메일 인증 시 onChange 입력 시 마다 api 호출 횟수 감소

사용자 정보를 받는 과정에서 onChange event handler에서 입력시 마다 api가 호출되는 현상을 발견
이를 해결하고자 debounce를 활용하여 API호출 감소를 통한 최적화

---

### Category Modal

CategoryModal에서 실시간으로 검색에 맞는 카테고리 표출

회의를 통해 카테고리 갯수가 많지 않아 프론트엔드에서 처리하기에 용이할 것으로 판단되어 프론트에서 처리

백엔드에서 데이터를 받아오는게 아닌 상황이라면 실시간으로 사용자에게 선호 카테고리 리스트를 보여주기에는 어렵다고 판단

원본 배열에 대한 값이 검색을 하는 순간 없어지므로써 검색 한 후 다시 전체 카테고리 리스트를 보여주지 못했따 (filter를 사용함으로써 원본 배열을 훼손하기 때문에)


함수를 사용하면서 리액트의 특성상 함수는 렌더링될때마다 재성생되기때문에 불필요한 렌더링이 일어나 메인이나 카테고리 모달에서 로딩 시간 지연(useMemo를 활용하여 해결)

```
const memoCategorySearchItemList = useMemo(() => {
        if (categorySearchValue) {
            return categoryItems.filter(item =>
	                item.title.toLocaleUpperCase().startsWith(categorySearchValue.toLocaleUpperCase()),
            );
        }
        return categoryItems;
    }, [categorySearchValue, categoryItems]);
```

CategoryItem에서 사용자가 카테고리 선택 시 해당 카테고리 배경색 및 중복 카테고리 제거 하기

```
 const handleActiveCategoryItem = (e: React.MouseEvent<HTMLElement>) => {
        const categoryItemId = e.currentTarget.id;
        const set = new Set(activeCategoriesData);
        if (set.has(categoryItemId)) {
            const filterActiveCateogiesData = activeCategoriesData.filter(
                categoryitem => categoryitem !== categoryItemId,
            );
            setActiveCategoriesData(filterActiveCateogiesData);
            setCategoriesItemClicked(false);
        } else {
            if (activeCategoriesData.length < 10) {
                setActiveCategoriesData(prev => [...prev, categoryItemId]);
                setCategoriesItemClicked(true);
            }
        }
    };
    const getCategoryClickedItem = () => {
        const set = new Set(activeCategoriesData);
        if (set.has(id.toString())) {
            setCategoriesItemClicked(true);
        }
    };
```

---

### 전역 상태 관리

prop drilling을 해결하고자 Recoil 도입(동료와 회의를 통해 1deps 이후 recoil 사용)

---


### 적극적인 img -> Webp 사용

png 파일을 Lighthouse 점수에 대비하여 Webp로 convert하여 사용함으로써 이미지 최적화

Google Ligthouse를 사용하기 전 Google에서 webp 사용을 권장하기 때문에 이미지 파일을 webp로 변환하여 사용

---


---

