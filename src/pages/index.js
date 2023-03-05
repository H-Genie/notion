import { useEffect, useState } from 'react'

const Index = () => {
  const [product, setProduct] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const makeArr = () => {
    let arr = []
    product.map((item) => {
      arr.push({
        id: item.id,
        name: item.properties.Name.title[0].plain_text,
        price: item.properties.Price.number,
        description: item.properties.Description.rich_text[0].plain_text,
      })
    })

    return arr
  }

  useEffect(() => {
    fetch('/api/get-items')
      .then((res) => res.json())
      .then((data) => setProduct(data.items))
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    if (name === '' || price === '' || description === '')
      return alert('모든 정보를 입력해주세요')

    fetch(
      `/api/add-item?name=${name}&price=${price}&description=${description}`,
    ).then(() => {
      setName('')
      setPrice('')
      setDescription('')
    })
  }

  const deleteHandler = (id) => {
    const ok = window.confirm('삭제하시겠습니까?')
    if (ok) fetch(`/api/delete-item?id=${id}`)
  }

  const updateHandler = (id, name, price, description) => {
    const inputname = prompt(
      '수정할 이름을 입력하세요(변경이 없으면 확인을 눌러주세요)',
      name,
    )
    if (!inputname) return
    const inputPrice = prompt(
      '수정할 가격을 입력하세요(변경이 없으면 확인을 눌러주세요)',
      price,
    )
    if (!inputPrice) return
    const inputDescription = prompt(
      '수정할 설명을 입력하세요(변경이 없으면 확인을 눌러주세요)',
      description,
    )
    if (!inputDescription) return

    fetch(
      `/api/update-item?id=${id}&name=${inputname}&price=${inputPrice}&description=${inputDescription}`,
    )
  }

  return (
    <>
      <form>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-black"
        />
        <input
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-black"
        />
        <input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-black"
        />
        <button onClick={submitHandler} className="border border-black">
          등록
        </button>
      </form>

      <br />

      <table className="border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black text-center">name</th>
            <th className="border border-black text-center">price</th>
            <th className="border border-black text-center">description</th>
            {/* <th className='border border-black text-center'></th> */}
            <th className="border border-black text-center"></th>
          </tr>
        </thead>
        <tbody>
          {product &&
            makeArr().map((item, index) => (
              <tr key={index}>
                <td className="border border-black text-center">{item.name}</td>
                <td className="border border-black text-center">
                  {item.price}
                </td>
                <td className="border border-black text-center">
                  {item.description}
                </td>
                {/* <td className='border border-black text-center' onClick={() => deleteHandler(item.id)}>삭제</td> */}
                <td
                  className="border border-black text-center"
                  onClick={() =>
                    updateHandler(
                      item.id,
                      item.name,
                      item.price,
                      item.description,
                    )
                  }
                >
                  수정
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Index
