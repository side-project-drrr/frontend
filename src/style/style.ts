import { styled } from '@mui/material';

export const inputEl = styled('input')(
    ({ theme }) => `
    width: 100%;
    padding: 15px 0 15px 20px;
    background: ${theme.palette.primary.main};
    border-radius: 30px;
    outline: none;
`,
);
