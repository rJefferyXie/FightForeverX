// Interfaces
import Article from '@/interfaces/article';

interface ArticlesProps {
  articles: Article[],
  setCurrentArticle: Function
}

const Articles = (props: React.PropsWithChildren<ArticlesProps>) => {
  const { articles, setCurrentArticle } = props;

  return (
    <div 
      className="flex flex-wrap justify-center overflow-hidden w-fit"
    >
      {articles &&
        articles.map((article: Article, idx: number) => {
          return (
            <div 
              key={idx}
              className="flex sm:flex-col overflow-hidden drop-shadow-sm text-black p-1.5 sm:p-0 sm:m-2 h-[7.5rem] sm:w-[28rem] sm:h-[28rem] sm:rounded-md bg-white shadow"
            >
              <div className="w-40 sm:w-full relative">
                <img
                  className="cursor-pointer"
                  onClick={() => setCurrentArticle(article)}
                  src={article.image}
                  alt={article.title}
                />
                <div
                  className="flex absolute uppercase bottom-2 rounded-tr-md text-white"
                >
                  <div 
                    className="w-2"
                    style={
                      {
                        backgroundColor: 
                          article.company === 'aew' ? '#0ea5e9' : 
                          article.company === 'wwe' ? '#ef4444' : '#f59e0b' 
                      }
                    }
                  />

                  <p className="bg-neutral-600 px-2">
                    {article.company}
                  </p>
                </div>
              </div>

              <div className="flex flex-col h-full overflow-hidden">
                <p 
                  className="font-semibold mx-3 sm:mt-1 line-clamp-3 md:line-clamp-2 cursor-pointer"
                  onClick={() => setCurrentArticle(article)}
                >
                  {article.title}
                </p>

                <p className="hidden sm:line-clamp-4 mx-3 pb-1">
                  {article.preview}                  
                </p>

                <div className="flex justify-center mt-auto mb-0.5 md:mb-3">
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
                    Source
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