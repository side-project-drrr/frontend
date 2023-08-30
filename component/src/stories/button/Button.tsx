interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */

    /**
     * What background color to use
     */
    /**
     * How large should the button be?
     */

    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, ...props }: ButtonProps) => {
    return (
        <button type="button" className="bg-yellow-100 text-black" {...props}>
            {label}
        </button>
    );
};
