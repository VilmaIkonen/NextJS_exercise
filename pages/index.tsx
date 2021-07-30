import Head from 'next/head'
import Link from "next/link"
import Layout, { siteTitle } from "../components/Layout"
import utilStyles from "../styles/utils.module.css"
import { getSortedPostsData } from '../lib_db_API/posts'
import Date from "../components/Date"
import { GetStaticProps } from 'next'

export default function Home({ 
	allPostsData 
	}: { 
		allPostsData: {
			id: string
			date: string
			title: string
		} []
	}) {
  return (
	  <Layout home>   
		<Head>
			<title>{siteTitle}</title>
		</Head>
		<section className={utilStyles.headingMd}>
			<span>Hi, I'm Vilma! I'm a webdeveloper intern at Finnish Telecom company</span>
			<p>Check out blog posts relating to internship:</p>
			<section>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
				{allPostsData.map(({ id, date, title }) => (					
					<li className={utilStyles.listItem} key={id}>
						<Link href={`/posts/${id}`}>{title}</Link>
						<br />
						<small>
							<Date dateString={date}/>
						</small>
					</li>
				))}
				</ul>
			</section>
			<p className={utilStyles.smallP}>
				(You can build a site like this with {' '}
				<a href="https://nextjs.org/learn">Next.js tutorial</a>.)
			</p>
		</section>
	  </Layout>
  )
}

// data fetching/static generation:
// By returning allPostsData inside the props object in getStaticProps, the blog posts will be passed to the Home component as a prop.
// NB! getStaticProps can only be exported from a "page"
export const getStaticProps: GetStaticProps = async () => {
	const allPostsData = getSortedPostsData()
	return {
		props: {
			allPostsData
		}
	}
}
