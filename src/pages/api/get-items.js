import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY,
})

// https://developers.notion.com/reference/post-database-query
const getItems = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    })
    return response
  } catch (err) {
    console.error(JSON.stringify(err))
  }
}

export const handler = async (_, res) => {
  try {
    const response = await getItems()
    res.status(200).json({ items: response.results, message: `success` })
  } catch (err) {
    res.status(400).json({ message: `fail` })
  }
}

export default handler
