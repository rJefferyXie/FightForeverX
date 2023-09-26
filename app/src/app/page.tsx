"use client"

// React + Next
import { useEffect, useState } from 'react';

// Animations
import { motion, AnimatePresence } from "framer-motion";
import fadeDown from '@/animations/fade-down';

// Firebase
import { db } from '@/firebase/config';
import { collection, getDocs } from "firebase/firestore"; 

const Home = () => {
  const [articles, setArticles] = useState<any>([]);
  const [currentArticle, setCurrentArticle] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const wrestlerArticles: any = [];

        const querySnapshot = await getDocs(collection(db, "wwearticles"));
        querySnapshot.forEach((doc) => {
          wrestlerArticles.push(doc.data());
        });

        setArticles(wrestlerArticles);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  const renderText = (text: any, article: any) => {
    if (!text || !text.length) return;

    return Object.keys(article.links).map((key: string) => {
      if (text.includes(key)) {
        const words = text.split(key);
        const link = (
          <a 
            href={article.links[key]} 
            style={{color: "blue"}} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {key}
          </a>
        );
        words.splice(1, 0, link);
        return words;
      }
    });
  }

  return (
    <div className="flex flex-col overflow-y-auto h-full w-screen bg-zinc-50 sm:ml-20 sm:p-4">
      {currentArticle &&
        <div className="fixed flex h-full w-full m-auto left-0 right-0 top-0 z-50 bg-black bg-opacity-50">
          <AnimatePresence>
            {currentArticle && 
              <motion.div
                className="h-full sm:h-5/6 w-full sm:w-10/12 m-auto bg-neutral-50 text-black"
                key="modal" 
                initial="hidden" 
                animate="visible" 
                exit="exit"
                variants={fadeDown}
              >
                <div className="flex flex-col overflow-hidden">
                  <img
                    className="w-1/3 mx-auto my-2 sm:rounded-t-md"
                    src={currentArticle.image}
                    alt={currentArticle.title}
                  />

                  <p className="font-semibold mx-2 sm:mt-1">
                    {currentArticle.title}
                  </p>

                  <p className="mx-2 mb-2">
                    {currentArticle.text.map((text: string, idx: number) => {
                      return (
                        <p className="my-2" key={idx}>
                          {renderText(text, currentArticle)}
                        </p>
                      )
                    })}  
                  </p>

                  <div className="flex justify-center mt-auto mb-1">
                    <a
                      className="px-2 py-1 mx-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 duration-200 ease-in-out"
                      href={currentArticle.links.homeRef}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visit Source
                    </a>
                  </div>
                </div>              
              </motion.div>
            }
          </AnimatePresence>
        </div>
      }

      <div className="flex mx-auto my-4">
        <button
          className="px-2 py-1 mx-1 rounded-md text-white bg-neutral-500"
        >
          WWE
        </button>

        <button
          className="px-2 py-1 mx-1 rounded-md text-white bg-neutral-500"
        >
          AEW
        </button>
        
        <button
          className="px-2 py-1 mx-1 rounded-md text-white bg-neutral-500"
        >
          NJPW
        </button>
      </div>

      <main className="flex flex-wrap justify-center sm:w-9/12 mx-auto mb-16">
        {
          articles.length && 
            articles.map((article: any, idx: number) => {
              return (
                <div 
                  key={idx}
                  className="flex sm:flex-col drop-shadow-md text-black border-slate-300 border-b p-2 sm:p-0 sm:m-2 h-[8rem] sm:w-[27rem] sm:h-[28rem] sm:rounded-md bg-white"
                >
                  <img
                    className="w-40 sm:w-full sm:rounded-t-md"
                    src={article.image}
                    alt={article.title}
                  />

                  <div className="flex flex-col overflow-hidden">
                    <p className="font-semibold mx-2 sm:mt-1 line-clamp-3">
                      {article.title}
                    </p>


                    <p className="hidden sm:line-clamp-4 mx-2 mb-2">
                      {article.text.map((text: string, idx: number) => {
                        return (
                          <p key={idx}>
                            {renderText(text, article)}
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
                        href={article.links.homeRef}
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
      </main>
    </div>
  )
}

export default Home;