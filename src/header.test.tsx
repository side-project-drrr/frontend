//Page3.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; //toBeInTheDocument() 를 사용하기 위해서 필요합니다!
import Header from './Header';

describe('<Header />', () => {
    it('Header', () => {
        render(<Header />);
    });

    it('Header Text', () => {
        render(<Header />);
        expect(screen.getByText('hello')).toBeInTheDocument();
    });
});
