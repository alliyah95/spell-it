import React from "react";
import CustomSlider from "../UI/CustomSlider";
import { BsXLg } from "react-icons/bs";

interface SettingsProps {
    closeHandler: () => void;
}

const Settings: React.FC<SettingsProps> = ({ closeHandler }) => {
    return (
        <div className="backdrop">
            <div className="modal">
                <div className="flex justify-between mb-2">
                    <h3 className="font-black dark:text-white-300 text-2xl ">
                        Settings
                    </h3>
                    <button onClick={closeHandler}>
                        <BsXLg />
                    </button>
                </div>

                <div className="space-y-4">
                    <CustomSlider
                        name="Minimum word length"
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={2}
                    />
                    <CustomSlider
                        name="Maximum word length"
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={2}
                    />
                    <CustomSlider
                        name="Playback speed"
                        min={0.25}
                        max={2}
                        step={0.25}
                        defaultValue={1}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;
