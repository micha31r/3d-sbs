(() => {
	const video = document.querySelector('video');
	const background = document.createElement('div');
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const offset = 30;

	document.body.append(background);
	document.body.append(canvas);
	canvas.id = 'SBSMirroredVideo';

	function hideNonVideoElements(node) {
		node.style.opacity = 1;
		node.style.pointerEvents = 'auto';
		if (node.parentElement.tagName !== 'BODY') {
			return hideNonVideoElements(node.parentElement);
		}
		return node;
	}

	// Hide all elements except for the mirror video
	const style = document.createElement('style');
	style.textContent = `
		* {
			background: #000 !important;
		}
		body {
			overflow: hidden;
		}
		body *:not(#SBSMirroredVideo) {
			opacity: 0;
			pointer-events: none;
		}
	`;
	document.body.append(style);

	// Show source video
	hideNonVideoElements(video);

	const [track] = video.captureStream().getVideoTracks();
    const processor = new MediaStreamTrackProcessor(track);
    const reader = processor.readable.getReader();

    function getFrames () {
		reader.read().then(async ({ done, value }) => {
			if (value) {
				const bitmap = await createImageBitmap(value);
				ctx.drawImage(bitmap, 0, 0);
				value.close();
			}
			if (!done && !video.paused) getFrames();
		});
    }

    function resize () {
    	setTimeout(() => {
    		const vidw = video.videoWidth;
			const vidh = video.videoHeight;
	    	const aspect = vidw / vidh;
	    	const adjustedHeight = window.innerWidth / 2 / aspect;

	    	video.style.cssText = `
				position: fixed;
				left: 0;
				top: 50%;
				width: 50vw;
				height: ${adjustedHeight}px;
				transform: translate(0, -50%);
				z-index: 10000;
				opacity: 1 !important;
			`;

			canvas.style.cssText = `
				position: fixed;
				left: 50vw;
				top: 50%;
				width: calc(50vw + ${offset}px);
				height: ${adjustedHeight}px;
				transform: translate(0, -50%);
				z-index: 10000;
			`;

			canvas.width = vidw;
			canvas.height = vidh;
    	}, 500);
	}

	window.addEventListener('resize', resize);
	video.addEventListener('play', getFrames);
	resize();
    getFrames();
})();