"use strict";

const COUNTDOWN_TARGET_ISO = "2027-01-01T00:00:00Z";
const countdownElement = document.querySelector("#countdown");

function getValidTargetTimestamp(isoTimestamp) {
    const match =
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?Z$/.exec(
            isoTimestamp
        );

    if (!match) {
        throw new Error(
            "Countdown target must be a UTC ISO 8601 timestamp."
        );
    }

    const timestamp = Date.parse(isoTimestamp);

    if (!Number.isFinite(timestamp)) {
        throw new Error("Invalid countdown target timestamp.");
    }

    const parsedDate = new Date(timestamp);

    const expectedYear = Number(match[1]);
    const expectedMonth = Number(match[2]);
    const expectedDay = Number(match[3]);
    const expectedHour = Number(match[4]);
    const expectedMinute = Number(match[5]);
    const expectedSecond = Number(match[6]);

    const dateIsValid =
        parsedDate.getUTCFullYear() === expectedYear &&
        parsedDate.getUTCMonth() + 1 === expectedMonth &&
        parsedDate.getUTCDate() === expectedDay &&
        parsedDate.getUTCHours() === expectedHour &&
        parsedDate.getUTCMinutes() === expectedMinute &&
        parsedDate.getUTCSeconds() === expectedSecond;

    if (!dateIsValid) {
        throw new Error("Invalid UTC calendar date or time.");
    }

    return timestamp;
}


function formatCountdown(remainingMilliseconds) {
    const totalSeconds = Math.max(
        0,
        Math.floor(remainingMilliseconds / 1000)
    );

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
}

function renderCountdown(targetTimestamp) {
    const remainingMilliseconds = Math.max(
        0,
        targetTimestamp - Date.now()
    );

    const time = formatCountdown(remainingMilliseconds);

    countdownElement.textContent =
        `${time.days} days, ` +
        `${String(time.hours).padStart(2, "0")} hours, ` +
        `${String(time.minutes).padStart(2, "0")} minutes, ` +
        `${String(time.seconds).padStart(2, "0")} seconds`;

    return targetTimestamp > Date.now();
}

function startCountdown(isoTimestamp) {
    if (!countdownElement) {
        console.error("Countdown element was not found.");
        return;
    }

    let targetTimestamp;

    try {
        targetTimestamp = getValidTargetTimestamp(isoTimestamp);
    } catch (error) {
        countdownElement.textContent = "Countdown is unavailable.";
        console.error(error.message);
        return;
    }

    renderCountdown(targetTimestamp);

    const intervalId = window.setInterval(() => {
        const isRemaining = renderCountdown(targetTimestamp);

        if (!isRemaining) {
            window.clearInterval(intervalId);
        }
    }, 1000);
}

startCountdown(COUNTDOWN_TARGET_ISO);