import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

export default async function useMarkdown() {
    const md = MarkdownIt()

    md.use(await Shiki({
        themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
        }
    }))

    return md
}

