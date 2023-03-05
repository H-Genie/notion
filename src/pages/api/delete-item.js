import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY,
})

// https://developers.notion.com/reference/retrieve-a-page
const deleteItem = async (id) => {
  try {
    const response = await notion.pages.retrieve({ page_id: id })
    return response
  } catch (err) {
    console.error(JSON.stringify(err))
  }
}

export const handler = async (req, res) => {
  const { id } = req.query

  try {
    const response = await deleteItem(id)
    res.status(200).json({ response, message: `success` })
  } catch (err) {
    res.status(400).json({ message: `fail` })
  }
}

export default handler
