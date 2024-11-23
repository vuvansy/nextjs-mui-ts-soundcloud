'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import { useWavesurfer } from "@/utils/customHook";
import { WaveSurferOptions } from 'wavesurfer.js';
import './wave.scss';

const WaveTrack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string>("0:00");
    const [duration, setDuration] = useState<string>("0:00");

    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio');

    //Biến số được sử dụng với useMemo Giữ nguyên địa chỉ bộ nhớ và giá trị mỗi lần render
    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {

        let gradient, progressGradient;
        if (typeof window !== "undefined") {

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            // Define the waveform gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
            gradient.addColorStop(0, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient.addColorStop(1, '#B1B1B1') // Bottom color
            // Define the progress gradient
            const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }

        return {
            waveColor: gradient,
            progressColor: progressGradient,
            height: 100,
            barWidth: 3,
            url: `/api?audio=${fileName}`,
        }
    }, []);

    const wavesurfer = useWavesurfer(containerRef, optionsMemo);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!wavesurfer) return;
        setIsPlaying(false);

        const hover = hoverRef.current!;
        const waveform = containerRef.current!;
        //@ts-ignore
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),

            wavesurfer.on('decode', (duration) => {
                setDuration(formatTime(duration));
            }),
            wavesurfer.on('timeupdate', (currentTime) => {
                setTime(formatTime(currentTime));
            }),
        ]
        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    // On play button click
    //useCallback không chạy lại khối code nếu biến số không thay đổi
    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
        }
    }, [wavesurfer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }


    return (
        <div style={{ marginTop: 100 }}>
            <div ref={containerRef} className="wave-form-container">
                wave track
                <div className="time" >{time}</div>
                <div className="duration" >{duration}</div>
                <div ref={hoverRef} className="hover-wave"></div>
                <div className="overlay"
                    style={{
                        position: "absolute",
                        height: "30px",
                        width: "100%",
                        bottom: "0",
                        background: "#ccc"
                    }}
                ></div>

            </div>
            <button onClick={() => onPlayClick()}>
                {isPlaying === true ? "Pause" : "Play"}
            </button>
        </div>
    )
}
export default WaveTrack;