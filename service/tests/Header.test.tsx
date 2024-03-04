import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '@monorepo/component/src/stories/header/NoAuthHeader';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';

describe('카카오 로그인 버튼을 클릭 했을때 일어나는 행위', () => {
    it.only('카카오 로그인 버튼 클릭 시 성공했을 때 개인정보 페이지로 이동', async () => {
        render(<Header />);

        await userEvent.click(screen.getByText('로그인'));

        expect(screen.getByText('123')).toBeInTheDocument();
    });
});
