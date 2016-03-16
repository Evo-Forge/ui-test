describe('app', () =>
{
	helpers.get('http://localhost:1337');
  it('should have table', () =>
  {
    expect( element(by.tagName('table') ).isPresent() ).toBe(true);
  });
  it('should have search query', () =>
  {
    expect( element(by.model('query') ).isPresent() ).toBe(true);
  });
  it('should have rows', () =>
  {
  	browser.wait(function() { return element(by.tagName('tr')).isPresent() }, 1000);
		expect(element(by.tagName('tr')).isPresent()).toBeTruthy();
  });
});