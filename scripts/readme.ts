import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { translateTitle } from './translations'

interface Category {
  id: string
  title: string
  titleEn?: string
  sort: number
}

interface Guide {
  id: string
  title: string
  titleZh?: string
  createdAt: string
  categories: string[]
}

const CATEGORIES_DIR = path.join(process.cwd(), 'data/categories')
const GUIDES_DIR = path.join(process.cwd(), 'data/guides')
const README_PATH = path.join(process.cwd(), 'README.md')
const README_ZH_PATH = path.join(process.cwd(), 'README_zh.md')

function getCategories(): Category[] {
  const files = fs.readdirSync(CATEGORIES_DIR)
  return files
    .map(file => {
      const content = fs.readFileSync(path.join(CATEGORIES_DIR, file), 'utf8')
      const { data } = matter(content)
      return {
        id: file.replace('.md', ''),
        title: data.title,
        titleEn: data.titleEn || data.title,
        sort: data.sort
      }
    })
    .sort((a, b) => a.sort - b.sort)
}

function getGuides(): Guide[] {
  const files = fs.readdirSync(GUIDES_DIR)
  return files
    .map(file => {
      const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf8')
      const { data } = matter(content)
      return {
        id: file.replace('.md', ''),
        title: data.title,
        titleZh: data.titleZh,
        createdAt: data.createdAt,
        categories: data.categories || []
      }
    })
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

function generateMarkdownList(lang: 'en' | 'zh' = 'en') {
  const categories = getCategories()
  const guides = getGuides()
  
  let markdown = ''
  
  categories.forEach(category => {
    const categoryTitle = lang === 'en' ? (category.titleEn || category.title) : category.title
    markdown += `* [${categoryTitle}](https://bytebytego.com/guides/${category.id})\n`
    
    const categoryGuides = guides.filter(guide => guide.categories.includes(category.id))
    if (categoryGuides.length > 0) {
      categoryGuides.forEach(guide => {
        let displayTitle = guide.title
        if (lang === 'zh') {
          const zhTranslation = guide.titleZh || translateTitle(guide.title)
          if (zhTranslation && zhTranslation !== guide.title) {
            displayTitle = `${zhTranslation} (${guide.title})`
          } else {
            displayTitle = zhTranslation || guide.title
          }
        }
        markdown += `  * [${displayTitle}](https://bytebytego.com/guides/${guide.id})\n`
      })
    }
  })
  
  return markdown
}

function updateReadmeToc() {
  if (fs.existsSync(README_PATH)) {
    const readmeContent = fs.readFileSync(README_PATH, 'utf8')
    const tocRegex = /<!-- TOC -->\n([\s\S]*?)\n<!-- \/TOC -->/
    const newToc = `<!-- TOC -->\n\n${generateMarkdownList('en')}\n\n<!-- /TOC -->`
    const updatedContent = readmeContent.replace(tocRegex, newToc)
    fs.writeFileSync(README_PATH, updatedContent)
    console.log('README.md TOC updated successfully!')
  }

  if (fs.existsSync(README_ZH_PATH)) {
    const readmeZhContent = fs.readFileSync(README_ZH_PATH, 'utf8')
    const tocRegex = /<!-- TOC -->\n([\s\S]*?)\n<!-- \/TOC -->/
    const newZhToc = `<!-- TOC -->\n\n${generateMarkdownList('zh')}\n\n<!-- /TOC -->`
    const updatedZhContent = readmeZhContent.replace(tocRegex, newZhToc)
    fs.writeFileSync(README_ZH_PATH, updatedZhContent)
    console.log('README_zh.md TOC updated successfully!')
  }
}

updateReadmeToc()

