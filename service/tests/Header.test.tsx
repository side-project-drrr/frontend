import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//import SignUpPage from '../src/pages/SignUpPage';
import React from 'react';
import Header from '@monorepo/component/src/stories/header/NoAuthHeader';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
//import { LoginPage } from '@monorepo/component/src/stories/login/LoginPage';
// import Test from '../src/components/test/Test';

// describe('header에서 로그인 버튼 클릭 시 Modal 상태 확인하기', () => {
//     // it('로그인 버튼 전 modal 열려있는지 확인', () => {
//     //     render(<Header />);
//     //     expect(screen.queryByText('기타 설명')).toBeNull();
//     //     //expect(screen.queryAllByRole('button')).toHaveLength(2);
//     // });
//     //it('카카오 로그인 버튼 클릭 시  실패했을 때 로그인 페이지로 다시 이동', () => {});
// });

describe('카카오 로그인 버튼을 클릭 했을때 일어나는 행위', () => {
    it.only('카카오 로그인 버튼 클릭 시 성공했을 때 개인정보 페이지로 이동', async () => {
        render(<Header />);

        await userEvent.click(screen.getByText('로그인'));

        // await waitFor(() => {
        //     render(<LoginPage data={true} />);
        // });
        expect(screen.getByText('123')).toBeInTheDocument();

        //render(<LoginPage data={false} />);
        //await userEvent.click(screen.getByText('123'));
        //expect(screen.getByText('123')).toBeInTheDocument();
        // render(<SignUpPage />);
        // userEvent.click();
        // console.log(user);
    });
});
