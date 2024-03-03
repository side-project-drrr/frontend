import type { Meta, StoryObj } from '@storybook/react';

import HeaderSearchMenu from './HeaderSearchMenu';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/HeaderSearchMenu',
    component: HeaderSearchMenu,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof HeaderSearchMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const headerSearchMenu: Story = {
    args: {
        onSearchResult: () => {},
        onSetSearchResult: () => {},
        onSelectedSearchIndex: 0, // 초기값 설정
        onSetSearchValue: () => {},
        onSetGoToanotherPage: () => {},
    },
};
