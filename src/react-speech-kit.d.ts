declare module "react-speech-kit" {
    export function speak({
        text,
        rate,
        voice,
    }: {
        text: string;
        rate: number;
        voice?: SpeechSynthesisVoice | null;
    }): void;

    export function useSpeechSynthesis(): {
        speak: (options: {
            text: string;
            rate: number;
            voice?: SpeechSynthesisVoice | null;
        }) => void;
        cancel: () => void;
        voices: SpeechSynthesisVoice[];
    };
}
