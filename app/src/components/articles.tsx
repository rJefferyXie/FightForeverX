// Interfaces
import Article from '@/interfaces/article';

interface ArticlesProps {
  articles: Article[],
  setCurrentArticle: Function
}

const Articles = (props: React.PropsWithChildren<ArticlesProps>) => {
  const { articles, setCurrentArticle } = props;

  return (
    <div className="flex flex-wrap justify-center h-[27rem] overflow-hidden">
      {articles.length && 
        articles.map((article: Article, idx: number) => {
          return (
            <div 
              key={idx}
              className="flex sm:flex-col drop-shadow-md text-black border-slate-300 border-b p-2 sm:p-0 sm:m-2 h-[8rem] sm:w-[27rem] sm:h-[26rem] sm:rounded-md bg-white"
            >
              <img
                className="w-40 sm:w-full sm:rounded-t-md"
                src={article.image}
                alt={article.title}
              />

              <div className="flex flex-col overflow-hidden">
                <p className="font-semibold mx-4 sm:mt-1 line-clamp-3">
                  {article.title}
                </p>

                <p className="hidden sm:line-clamp-3 mx-4 mb-1">
                  {article.text.map((text: string, idx: number) => {
                    return (
                      <p key={idx}>
                        {text}
                      </p>
                    )
                  })}                    
                </p>

                <div className="flex justify-center mt-auto mb-1">
                  <button 
                    className="px-2 py-1 mx-2 rounded-md bg-sky-700 text-white hover:bg-sky-600 duration-200 ease-in-out"
                    onClick={() => setCurrentArticle(article)}
                  >
                    Read More
                  </button>

                  <a
                    className="px-2 py-1 mx-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 duration-200 ease-in-out"
                    href={article.homeURL}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Visit Source
                  </a>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Articles;