/*
Static generation of pages with dynamic routes:
1. React component to render the page (uses props generated in getStaticProps())
2. getStaticPaths() to return an array of possible values for dynamic route (here id)
3. getStaticProps() to fetch data for a page with dynamic route identifier (here id)
*/
import Head from "next/head"
import { getAllPostIds, getPostData  } from "../../lib_db_API/posts"
import Layout from "../../components/Layout"
import Date from "../../components/Date"
import utilStyles from "../../styles/utils.module.css"
import { GetStaticPaths, GetStaticProps } from "next"

export default function Post({ 
    postData 
    }: {
        postData: {
            title: string
            date: string
            contentHtml: string
        }
    }) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>            
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>            
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
        </article>
    </Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths, // contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js.
        fallback: false // unknown path will result "404"
    }
}

//  post page uses getPostData function in getStaticProps to get the post data and return it as props --> Post component props (postData.title, .id, .date)
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id as string)
    return {
        props: {
            postData
        }
    }
}
