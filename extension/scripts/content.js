(async () => {
	const src = chrome.runtime.getURL("scripts/main.js");
	const contentScript = await import(src);
	contentScript.main(/* chrome: no need to pass it */);
})();
