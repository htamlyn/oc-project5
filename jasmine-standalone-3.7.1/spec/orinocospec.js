
console.log(fetchProduct)
console.log(getProduct)
console.log(postData)

 
it("calls fetchProduct to get product information",()=> {
    let ismockApiCalled = false;
    const mockApiCall = (url) => {
        expect(url).toBe('http://localhost:3000/api/teddies/')
        ismockApiCalled = true
        return Promise.resolve({
            json: () => Promise.resolve({
                // colors: ['Tan', 'Chocolate', 'Black', 'White'],
                name: "Norbert",
                price: 2900,
                id: '5be9c8541c9d440000665243'
            })
        })
    }
    fetchProduct(mockApiCall).then(result => {
      expect(ismockApiCalled).toBe(true)
      console.log(names)
      expect(names).toBe('Arnold')
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

// it("posts data to the server for confirmation", () => {
//     let isFakePostMade = false;
//     const fakePost = (url, data) => {
//         expect(url).toBe("")
//         expect(data).toBe({})
//         isFakePostMade = true
//     }
//     postData("", {}).then(result => {
//         expect(isFakePostMade).toBe(true)
//     })
// })