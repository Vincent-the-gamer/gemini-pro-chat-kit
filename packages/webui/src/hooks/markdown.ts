import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

export async function useMarkdown() {
    const md = MarkdownIt()

    md.use(await Shiki({
        themes: {
            light: 'vitesse-light',
            dark: 'synthwave-84',
        },
        defaultColor: false,
        cssVariablePrefix: '--s-',
    }))

    return md
}