import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { TITLE_TRANSLATIONS } from './translations'

const GUIDES_DIR = path.join(process.cwd(), 'data/guides')

function addChineseTitleToGuides() {
  const files = fs.readdirSync(GUIDES_DIR)
  let updatedCount = 0

  files.forEach(file => {
    if (!file.endsWith('.md')) return

    const filePath = path.join(GUIDES_DIR, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(content)

    const englishTitle = parsed.data.title
    if (englishTitle && TITLE_TRANSLATIONS[englishTitle]) {
      const zhTitle = TITLE_TRANSLATIONS[englishTitle]
      if (parsed.data.titleZh !== zhTitle) {
        parsed.data.titleZh = zhTitle
        const newContent = matter.stringify(parsed.content, parsed.data)
        fs.writeFileSync(filePath, newContent, 'utf8')
        updatedCount++
      }
    }
  })

  console.log(`Updated ${updatedCount} guides with titleZh property.`)
}

addChineseTitleToGuides()
