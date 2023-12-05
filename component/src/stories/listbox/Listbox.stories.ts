import type { Meta, StoryObj } from '@storybook/react';
import ListBox from './ListBox';

const itmes = [
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
    },
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/Listbox',
    component: ListBox,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const List: Story = {
    args: {
        items: itmes,
    },
};
