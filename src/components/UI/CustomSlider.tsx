import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface SliderProps {
    max: number;
    min: number;
    step: number;
    defaultValue: number;
    name: string;
}

const CustomSlider: React.FC<SliderProps> = ({
    max,
    min,
    step,
    defaultValue,
    name,
}) => {
    const [sliderValue, setSliderValue] = useState<number>(1);

    const changeHandler = (value: number): void => {
        setSliderValue(value);
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
                {name}: {sliderValue}
            </h3>
            <div className="bg-white-400 p-4 rounded-md mt-2">
                <Slider
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={defaultValue}
                    onChange={changeHandler}
                    handleStyle={handleStyle}
                    trackStyle={trackStyle}
                    railStyle={railStyle}
                />
            </div>
        </div>
    );
};

export default CustomSlider;
