import React from "react";

interface Voices {
    list: SpeechSynthesisVoice[];
    index: number;
    handler: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Voices: React.FC<Voices> = ({ list, index, handler }) => {
    return (
        <form>
            <label htmlFor="voice" className="block text-sm md:text-base">
                Voice
            </label>
            <div className="relative inline-flex"></div>
            <select
                className="text-dark-blue-300 bg-white-400 p-4 rounded-md w-full mt-2 appearance-none outline-none"
                id="voice"
                name="voice"
                value={index || ""}
                onChange={handler}
            >
                <option value="">Default</option>
                {list.map((option, index) => (
                    <option key={option.voiceURI} value={index}>
                        {`${option.lang} - ${option.name}`}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default Voices;
