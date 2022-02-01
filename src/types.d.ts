declare module 'speed-to-semitones' {
  export default function speedToSemitones (speed: number, digits?: number): number;
}

declare module 'speed-to-percentage' {
  export default function speedToPercentage (speed: number, digits?: number): number;
}

interface HTMLAudioElement {
  mozPreservesPitch: boolean;
}
