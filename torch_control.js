let videoStream;
let track;

async function enableTorch() {
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        track = videoStream.getVideoTracks()[0];

        const capabilities = track.getCapabilities();

        if ("torch" in capabilities) {  // Check if torch is supported
            await track.applyConstraints({ advanced: [{ torch: true }] });
            console.log("Torch enabled");
        } else {
            console.warn("Torch not supported on this device");
        }
    } catch (error) {
        console.error("Error enabling torch:", error);
    }
}

async function disableTorch() {
    if (track) {
        await track.applyConstraints({ advanced: [{ torch: false }] });
        track.stop();
        track = null;
        console.log("Torch disabled");
    }
}
