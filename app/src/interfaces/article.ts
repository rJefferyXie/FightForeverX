interface Link {
  [key: string]: string
}

interface Article {
  date: string,
  title: string,
  image: string,
  author: string,
  authorURL: string,
  homeURL: string,
  links: Link[],
  text: any[]
}

export default Article;