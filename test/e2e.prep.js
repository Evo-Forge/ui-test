module.exports =
{
	get: function(url)
	{
		browser.get(url||'http://localhost:1337/');
		return browser.waitForAngular()
	}
};