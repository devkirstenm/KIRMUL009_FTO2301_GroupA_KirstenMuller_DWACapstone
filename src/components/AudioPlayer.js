import React, { useRef } from "react"
// installed react-icons
import {BsArrowLeftShort} from "react-icons/bs"
import {BsArrowRightShort} from "react-icons/bs"
import {FaPlay} from "react-icons/fa"
import {FaPause} from "react-icons/fa"


export default function AudioPlayer() {

    // state
    // is the audio playing state
    const [isPlaying, setIsPlaying] = React.useState(false); // by default, player is not playing automatically
    // state to set and change duration of audio 
    const [duration, setDuration] = React.useState(0); // default is 0
    // state to set and change the time of the audio 
    const [currentTime, setCurrentTime] = React.useState(0);

    // references
    const audioPlayer = useRef(); // reference to the audio component
    const progressBar = useRef(); // reference to the progress bar
    const animationRef = useRef(); // reference to the animation (tracking progress bar)

    // logic to display the audio in seconds without decimals (e.g., 20.83928032 seconds)
    React.useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
        // component will run as soon as the audio player has loaded (metadata is ready/exists). Necessary because Audio file may have not loaded yet so you will want to include this
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]); // "if audioPlayer exists? and if current exists? then it must update when the loaded meta data is available""

    // logic to format time correctly with minutes and seconds
    const calculateTime = (secs) => {
        // get minutes
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ?  `0${minutes}` : `${minutes}`; // return minutes with a 0 in front so it's e.g.,  09:00 instead of 9:00
        // determine what's left over of the minutes to get the seconds
        const seconds = Math.floor(secs % 60); // % = use modulus to get the remainder
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`; 
        // time format
        return `${returnedMinutes} : ${returnedSeconds}`;
    }          

    // play/pause buttons and the toggle animation
    const togglePlayPause = () => {
        // prevValue stores the current value of isPlaying, which by default is 0
        const prevValue = isPlaying; // needs to know what it what the prevValue was (play or pause) to provide the opposite
        // updates the state of isPlaying to the opposite of what it is (so if the audio is playing, it will show a pause button and vice versa)
        setIsPlaying(!prevValue) 
        if (!prevValue) {
            audioPlayer.current.play();
            // toggle animation starts when audio plays and is used to track its progress 
            animationRef.current = requestAnimationFrame(whilePlaying) // reference the animation. "request animation frame" is a built is JS function
        }
        else {
            audioPlayer.current.pause();
            // this stops the toggle from moving if the audio is paused
            cancelAnimationFrame(animationRef.current) // JS function
        }
    }


    // updates current time readout of audio + the animation of toggle while audio is playing 
    const whilePlaying = () => {
        // time is same as progress bar time
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying) 
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime()
    }

    // changes css so that color before animation toggle is a different color (didn't use)
    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    // audio goes backwards by 10 seconds 
    const backTen = () => {
        progressBar.current.value = Number(progressBar.current.value - 10)
        changeRange()
    }

    // audio goes backwards by 10 seconds 
    const forwardTen = () => {
        progressBar.current.value = Number(progressBar.current.value + 10)
        changeRange()
    }

    return (
        <div className="audio--player">
            <audio ref={audioPlayer} src="https://podcast-api.netlify.app/placeholder-audio.mp3"></audio>

            <button className="forward--backward--button" onClick={backTen}><BsArrowLeftShort className="forward--backward--button"/> 10</button>

            <button onClick={togglePlayPause} className="play--pause--button">
                { isPlaying ? <FaPause className="pause--button" /> : <FaPlay className="play--button"/> } {/* conditional: if it's playing (aka it's true), then display pause icon, otherwise the play button */}
            </button>

            <button className="forward--backward--button" onClick={forwardTen}>10 <BsArrowRightShort className="forward--backward--button"/></button>

            {/* current time */}
            <div className="current--time">{calculateTime(currentTime)}</div> {/* calculateTime is a function to display the format of time correctly */}

            {/* progress bar */}
            <div className="progress--bar">
                <input type="range" defaultValue="0" ref={progressBar} onChange={changeRange}/>
            </div>

            {/* duration */}
            <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div> {/* *not working* needed to add conditional statement because of bug. Bug: time display NaN when audio isn't playing - it's trying to display the duration before it's ready */}

        </div>
    )
}
