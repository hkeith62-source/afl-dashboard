const fs = require('fs');

const event = process.env.GITHUB_EVENT_NAME;
const payload = require(process.env.GITHUB_EVENT_PATH);

const data = JSON.parse(fs.readFileSync('data/time-status.json'));

const now = new Date().toLocaleString();

if (payload.action === "clock_in") {
    data.status = "in";
    data.clockInTime = now;
} else if (payload.action === "clock_out") {
    data.status = "out";
    data.clockOutTime = now;
    data.sessions.push({
        start: data.clockInTime,
        end: now
    });
}

fs.writeFileSync('data/time-status.json', JSON.stringify(data, null, 2));
