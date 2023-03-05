import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY,
})

// https://developers.notion.com/reference/patch-page
const updateItem = async (id, name, price, description) => {
  try {
    const response = await notion.pages.update({
      page_id: id,
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Price: {
          number: parseInt(price),
        },
        Description: {
          rich_text: [
            {
              text: {
                content: description,
              },
            },
          ],
        },
      },
    })
    return response
  } catch (err) {
    console.error(JSON.stringify(err))
  }
}

export const handler = async (req, res) => {
  const { id, name, price, description } = req.query

  try {
    const response = await updateItem(id, name, price, description)
    res.status(200).json({ response, message: `success` })
  } catch (err) {
    res.status(400).json({ message: `fail` })
  }
}

export default handler
