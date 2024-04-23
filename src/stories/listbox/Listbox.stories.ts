import type { Meta, StoryObj } from '@storybook/react';
import ListBox from './Listbox';
const items = [
    {
        techBlogPostBasicInfoDto: {
            id: '1',
            title: 'Sample Tech Blog Post',
            summary: 'This is a sample summary of the tech blog post.',
            thumbnailUrl: 'https://example.com/thumbnail.jpg',
            likeCount: 10,
            viewCount: 100,
        },
        categoryDto: [
            { id: '1', name: 'Category 1' },
            { id: '2', name: 'Category 2' },
        ],
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
    args: { items: items },
};
