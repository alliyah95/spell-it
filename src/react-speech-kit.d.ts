declare module "react-speech-kit" {
    export function speak({
        text,
        rate,
        voice,
        onError,
    }: {
        text: string;
        rate: number;
        voice?: SpeechSynthesisVoice | null;
        onError?: (event: SpeechSynthesisErrorEvent) => void;
    }): void;

    export function useSpeechSynthesis(): {
        speak: (options: {
            text: string;
            rate: number;
            voice?: SpeechSynthesisVoice | null;
            onError?: (event: SpeechSynthesisErrorEvent) => void;
        }) => void;
        cancel: () => void;
        speaking: boolean;
        supported: boolean;
        voices: SpeechSynthesisVoice[];
    };
}
