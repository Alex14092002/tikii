import React, { useState, useEffect, memo } from 'react';
import { toast } from 'react-toastify';
import './CountdownClock.scss';

const CountdownClock = ({ minuteTran }) => {
    const [time, setTime] = useState({
        minutes: 0,
        minute: 0,
        seconds1: 0,
        seconds2: 0,
    });

    const [color, setColor] = useState(false);

    useEffect(() => {
        const countDownDate = new Date('2030-07-16T23:59:59.9999999+01:00').getTime();
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const minute = Math.ceil(minutes % Number(minuteTran));
            const seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
            const seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
            setColor(minute == 0 && seconds1 == 0 && seconds2 <= 5 ? true : false);
            setTime({ minutes, minute, seconds1, seconds2 });
        }, 0);

        return () => {
            clearInterval(intervalId);
        };
    }, [minuteTran]);

    useEffect(() => {
        toast('🚀 Dữ liệu kỳ tới sắp được cập nhật', {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

        const countDownDate = new Date('2030-07-16T23:59:59.9999999+01:00').getTime();
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const minute = Math.ceil(minutes % 3);
            const seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
            const seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
            if (seconds1 == 3 && seconds2 == 0) {
                toast('🚀 Dữ liệu kỳ tới sắp được cập nhật', {
                    position: 'top-right',
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div
            className="flex-1 flex justify-center items-center font-bold ml-4 px-1 mb-4 text-2xl md:text-3xl countdown"
            style={{ color: color ? 'rgb(92, 187, 71)' : 'rgb(255, 255, 255)' }}
        >
            0{time.minute}:{time.seconds1}
            {time.seconds2}
        </div>
    );
};

export default memo(CountdownClock);
