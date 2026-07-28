export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
  items?: string[]
}

export interface LegalPageProps {
  eyebrow: string
  title: string
  description: string
  updatedAt: string
  sections: LegalSection[]
}
