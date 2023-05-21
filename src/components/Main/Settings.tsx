import React, { useState, useContext } from "react";
import CustomSlider from "../UI/CustomSlider";
import Voices from "./Voices";
import { GameContext } from "../../store/game";
import { BsXLg } from "react-icons/bs";

interface SettingsProps {
    closeHandler: () => void;
}

const Settings: React.FC<SettingsProps> = ({ closeHandler }) => {
    const game = useContext(GameContext);
    const [minLength, setMinLength] = useState<number>(
        game.settings.wordLength[0]
    );
    const [maxLength, setMaxLength] = useState<number>(
        game.settings.wordLength[1]
    );
    const [speed, setSpeed] = useState<number>(game.settings.speed);
    const [voiceIndex, setVoiceIndex] = useState<number>(
        game.settings.voiceIndex
    );

    const minLengthHandler = (value: number) => {
        setMinLength(value);
        game.modifySettings({
            wordLength: [value, game.settings.wordLength[1]],
        });
    };

    const maxLengthHandler = (value: number) => {
        let newMaxLength: number;

        if (value < minLength) {
            newMaxLength = minLength;
        } else {
            newMaxLength = value;
        }

        setMaxLength(newMaxLength);
        game.modifySettings({
            wordLength: [game.settings.wordLength[0], newMaxLength],
        });
    };

    const speedHandler = (value: number) => {
        setSpeed(value);
        game.modifySettings({
            speed: value,
        });
    };

    const voiceIndexHandler = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setVoiceIndex(parseInt(evt.target.value));
        game.modifySettings({
            voiceIndex: parseInt(evt.target.value),
        });
    };

    return (
        <div className="backdrop" onClick={closeHandler}>
            <div className="modal fade-in-up">
                <div className="flex justify-between mb-2">
                    <h3 className="font-black dark:text-white-300 text-2xl">
                        Settings
                    </h3>
                    <button onClick={closeHandler}>
                        <BsXLg />
                    </button>
                </div>

                <div className="space-y-4">
                    <CustomSlider
                        name="Minimum word length"
                        min={4}
                        max={10}
                        step={1}
                        defaultValue={4}
                        changeHandler={minLengthHandler}
                        value={minLength}
                    />
                    <CustomSlider
                        name="Maximum word length"
                        min={minLength}
                        max={10}
                        step={1}
                        defaultValue={10}
                        changeHandler={maxLengthHandler}
                        value={maxLength}
                    />
                    <CustomSlider
                        name="Playback speed"
                        min={0.25}
                        max={2}
                        step={0.25}
                        defaultValue={1}
                        changeHandler={speedHandler}
                        value={speed}
                    />
                    <Voices
                        list={game.voices}
                        index={voiceIndex}
                        handler={voiceIndexHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;
