
 
it("calls fetchProduct to get product information",()=> {
    let ismockApiCalled = false;
    const mockApiCall = (url) => {
        expect(url).toBe('http://localhost:3000/api/teddies/')
        ismockApiCalled = true
    }
    fetchProduct(mockApiCall).then(result => {
      expect(ismockApiCalled).toBe(true)

    })
  })


it("calls getProduct to get product information", ()=> {
    let isFakeCallMade = false;
    const fakeCall = (url) => {
        expect(url).toBe(`http://localhost:3000/api/teddies/${id}`)
        isFakeCallMade = true
    }
    getProduct(fakeCall).then(result => {
        expect(isFakeCallMade).toBe(true)
    })
})

