// Animations
import { motion, AnimatePresence } from "framer-motion";
import fadeDown from '@/animations/fade-down';

// MUI
import { ClickAwayListener } from '@mui/material';

// Interfaces
import Article from '@/interfaces/article';

interface ArticleViewProps {
  currentArticle: Article,
  setCurrentArticle: Function
}

const ArticleView = (props: React.PropsWithChildren<ArticleViewProps>) => {
  const { currentArticle, setCurrentArticle } = props;

  return (
    <div className="fixed flex h-full w-full m-auto left-0 right-0 top-0 z-40 bg-black bg-opacity-75">
      <AnimatePresence>
        {currentArticle && 
          <ClickAwayListener onClickAway={() => setCurrentArticle(undefined)}>
            <motion.div
              className="flex flex-col h-full sm:h-[36rem] w-full sm:w-[64rem] m-auto p-4 bg-zinc-50 text-black overflow-auto rounded-md drop-shadow-md z-50"
              key="modal" 
              initial="hidden" 
              animate="visible" 
              exit="exit"
              variants={fadeDown}
            >
              <img
                className="w-2/3 mx-auto my-2 sm:rounded-md"
                src={currentArticle.image}
                alt={currentArticle.title}
              />

              <p className="font-semibold mx-auto sm:mt-1">
                {currentArticle.title}
              </p>


              <span className="flex mx-auto">
                <a 
                  className="text-blue-900 w-fit" 
                  href={currentArticle.authorURL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {currentArticle.author}
                </a>

                <p className="ml-1">
                  {" / " + currentArticle.date}
                </p>
              </span>

              <p className="mx-2">
                {currentArticle.text.map((text: string, idx: number) => {
                  return (
                    <p className="my-3" key={idx}>
                      {text}
                    </p>
                  )
                })}  
              </p>

              <div className="flex justify-center mt-auto mb-1">
                <button 
                  className="bg-rose-600 text-white px-2 py-1 mx-2 rounded-md hover:bg-rose-500 duration-200 ease-in-out"
                  onClick={() => setCurrentArticle(undefined)}
                >
                  Exit Article
                </button>
                
                <a
                  className="px-2 py-1 mx-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 duration-200 ease-in-out"
                  href={currentArticle.homeURL}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit Source
                </a>
              </div>
            </motion.div>
          </ClickAwayListener>
        }
      </AnimatePresence>
    </div>
  )
}

export default ArticleView;