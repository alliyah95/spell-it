import React, { FormEvent } from "react";

type TooltipPosition = "top" | "right" | "bottom" | "left";
type ButtonType = "submit" | "reset" | "button";

interface Button {
    id: string;
    content: string;
    classes: string;
    kind: ButtonType;
    tooltipContent: string;
    tooltipPosition: TooltipPosition;
    handler: () => void;
}

const Button: React.FC<Button> = ({
    id,
    content,
    classes,
    kind,
    tooltipContent,
    tooltipPosition,
    handler,
}) => {
    return (
        <button
            id={id}
            className={classes}
            onClick={handler}
            type={kind}
            data-tooltip-id={id}
            data-tooltip-content={tooltipContent}
            data-tooltip-place={tooltipPosition}
        >
            {content}
        </button>
    );
};

export default Button;
