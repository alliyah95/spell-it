import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface SliderProps {
    max: number;
    min: number;
    step: number;
    defaultValue: number;
    name: string;
    value: number;
    changeHandler: (value: number) => void;
}

const CustomSlider: React.FC<SliderProps> = ({
    max,
    min,
    step,
    defaultValue,
    name,
    value,
    changeHandler,
}) => {
    const generalChangeHandler = (value: number): void => {
        changeHandler(value);
    };

    const handleStyle = {
        backgroundColor: "#178FD4",
        borderColor: "#178FD4",
        height: "16px",
        width: "16px",
        opacity: 1,
    };

    const trackStyle = {
        backgroundColor: "#242B37",
        height: "8px",
    };

    const railStyle = {
        backgroundColor: "#191F28",
        height: "8px",
    };

    return (
        <div>
            <h3 className="text-start text-dark-blue-400 dark:text-white-300">
                {name}: {value}
            </h3>
            <div className="bg-white-400 p-4 rounded-md mt-2">
                <Slider
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={generalChangeHandler}
                    handleStyle={handleStyle}
                    trackStyle={trackStyle}
                    railStyle={railStyle}
                />
            </div>
        </div>
    );
};

export default CustomSlider;
