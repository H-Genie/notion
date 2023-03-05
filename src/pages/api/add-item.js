import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY,
})

// https://developers.notion.com/reference/post-page
const addItem = async (name, price, description) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID },
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
  const { name, price, description } = req.query

  try {
    const response = await addItem(name, price, description)
    res.status(200).json({ response, message: `success` })
  } catch (err) {
    res.status(400).json({ message: `fail` })
  }
}

export default handler
