import fs from "fs"
import path from "path"
import matter from "gray-matter"
import remark from "remark"
import html from "remark-html"

const postsDir = path.join(process.cwd(), 'posts') // cwd() current working directory

// Fetch data from the file system. Data could be fetched also from e.g. API endpoint or database (see below)
export function getSortedPostsData()  {
    // get file names under /posts
    const fileNames = fs.readdirSync(postsDir)

    const allPostsData = fileNames.map(fileName => {

        // Remove .md from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // read md file as string
        const fullPath = path.join(postsDir, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse post metadata section
        const matterResult = matter(fileContents)

        // Combine data with id
        return { id, ...(matterResult.data as  { date: string, title: string })}
    })

    // Sort posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDir)

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}
// -->
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

export async function getPostData(id: string) {
    const fullPath = path.join(postsDir, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with id and contentHtml
    return {
        id,
        contentHtml,
        ...(matterResult.data as { date: string, title: string })
    }
}

/*
export async function getSortedPostsData() {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('..')
    return res.json()
}
*/

/*
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
*/

