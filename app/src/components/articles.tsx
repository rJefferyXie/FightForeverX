// Interfaces
import Article from '@/interfaces/article';

interface ArticlesProps {
  articles: Article[],
  setCurrentArticle: Function
}

const Articles = (props: React.PropsWithChildren<ArticlesProps>) => {
  const { articles, setCurrentArticle } = props;

  return (
    <div className="flex flex-wrap justify-center h-[29rem] overflow-hidden">
      {articles &&
        articles.map((article: Article, idx: number) => {
          return (
            <div 
              key={idx}
              className="flex sm:flex-col drop-shadow-sm text-black p-2 sm:p-0 sm:m-2 h-[8rem] sm:w-[28rem] sm:h-[28rem] sm:rounded-md bg-white shadow"
            >
              <img
                className="w-40 sm:w-full sm:rounded-t-md"
                src={article.image}
                alt={article.title}
              />

              <div className="flex flex-col h-full overflow-hidden">
                <p className="font-semibold mx-3 sm:mt-1 line-clamp-2">
                  {article.title}
                </p>

                <p className="hidden sm:line-clamp-4 mx-3 pb-1">
                  {article.preview}                  
                </p>

                <div className="flex justify-center mt-auto mb-4">
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