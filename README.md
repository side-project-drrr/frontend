# drrr

<br />

## ABOUT

<div align='center'>
    <h2> drrr</h2>  
    <p>회사마다 보여주는 개발 기술 블로그를 한곳에서 볼 수 있으며 web push 기능을 통해 매일 추천 기술 블로그 제공 </p>
    <br />    
</div>

## TEAM

<div align='center'>
<table> 
  <tbody>
    <tr>            
       <td align="center"><a href="https://github.com/rondido"><img src="https://avatars.githubusercontent.com/u/55516901?v=4" width="100px;" alt=""/><br /><sub><b>박진현</b></sub></a><br /></td>
       <td align="center"><a href="https://github.com/rondido"><img src="https://avatars.githubusercontent.com/u/70056958?v=4" width="100px;" alt=""/><br /><sub><b>박진영</b></sub></a><br /></td>
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

---

