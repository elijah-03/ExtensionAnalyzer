importScripts('./libs/ffmpeg_asm.js');

const { now } = Date;

function print(text) {
	postMessage({ type: 'stdout', data: text });
}

onmessage = function(event) {
	const message = event.data;

	if (message.type === 'command') {
		const Module = {
			print,
			printErr: print,
			files: message.files || [],
			arguments: message.arguments || [],
			TOTAL_MEMORY: message.TOTAL_MEMORY || 1073741824,
			// TOTAL_STACK: message.TOTAL_STACK || 15728640,
			// FAST_MEMORY: message.FAST_MEMORY || 6291456
		};

		postMessage({ type: 'start', data: Module.arguments.join(' ') });
		postMessage({
			type: 'stdout',
			data: `Received command: ${Module.arguments.join(' ')}${
				Module.TOTAL_MEMORY
					? `.  Processing with ${Module.TOTAL_MEMORY} bits.`
					: ''
			}`
		});

		const time = now();
		const result = ffmpeg_run(Module);
		const totalTime = now() - time;

		postMessage({
			type: 'stdout',
			data: `Finished processing (took ${totalTime}ms)`
		});

		postMessage({ type: 'done', data: result, time: totalTime });
	}
};

postMessage({ type: 'ready' });
