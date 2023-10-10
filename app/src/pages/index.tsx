"use client"

// React + Next
import { useEffect, useState } from 'react';

// MUI
import { ClickAwayListener } from '@mui/material';

// Animations
import { motion, AnimatePresence } from "framer-motion";
import fadeDown from '@/animations/fade-down';

// Components
import Articles from '@/components/articles';

// Interfaces
import Article from '@/interfaces/article';

// Firebase
import { db } from '@/firebase/config';
import { collection, getDocs, query, orderBy } from "firebase/firestore"; 

const Home = () => {
  const [WWEArticles, setWWEArticles] = useState<Article[]>([]);
  const [AEWArticles, setAEWArticles] = useState<Article[]>([]);
  const [NJPWArticles, setNJPWArticles] = useState<Article[]>([]);
  const [currentlyViewing, setCurrentlyViewing] = useState("");

  const [currentArticle, setCurrentArticle] = useState<Article>();

  useEffect(() => {
    const getData = async () => {
      const articleMap = [
        {
          company: 'wwearticles',
          callback: setWWEArticles
        },
        {
          company: 'aewarticles',
          callback: setAEWArticles
        },
        {
          company: 'njpwarticles',
          callback: setNJPWArticles
        },
      ]

      try {
        articleMap.map(async (article) => {
          const wrestlerArticles: Article[] = [];

          const articleRef = collection(db, article.company);
          const querySnapshot = await getDocs(query(articleRef, orderBy("order", "asc")));
          querySnapshot.forEach((doc) => {
            const article = doc.data() as Article;
            article.text = article.text.map((text: string) => {
              return renderText(text, article);
            });
            wrestlerArticles.push(article);
          });
  
          article.callback(wrestlerArticles);
        });
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  const renderText = (text: any, article: any) => {
    if (!text || !text.length) return;

    Object.keys(article.links).forEach((link) => {
      if (typeof text === 'string') {
        if (text.includes(link)) {
          text = text.split(link);
          const atag = (
            <a 
              href={article.links[link]} 
              className="text-blue-900"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link}
            </a>
          );
          text.splice(1, 0, atag);
        }

        return;
      }
      
      text.forEach((textLine: string, idx: number) => {
        if (typeof textLine !== 'string') return;

        if (textLine.includes(link)) {
          let subarray = text.splice(idx, 1).toString();
          subarray = subarray.split(link);
          const atag = (
            <a 
              href={article.links[link]} 
              className="text-blue-900"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link}
            </a>
          );
          subarray.splice(1, 0, atag)
          text.splice(idx, 0, ...subarray)
        }
      })
    })

    return text;
  }

  return (
    <div className="flex flex-col overflow-y-auto h-screen w-screen bg-zinc-50 lg:ml-20 sm:p-4">
      {currentArticle &&
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
      }

      <main className="flex flex-col items-center sm:w-10/12 mx-auto mb-16">
        <div
          className="flex flex-col w-full bg-white text-black my-4 drop-shadow-sm"
        >
          <p className="w-fit font-semibold mx-auto mt-2 text-2xl">AEW Articles</p>
          <Articles articles={AEWArticles} setCurrentArticle={setCurrentArticle} viewingAll={currentlyViewing === "AEW"}></Articles>
          <p className="text-blue-900 w-fit ml-auto mr-2 my-2 cursor-pointer">View All...</p>
        </div>

        <div
          className="flex flex-col w-full bg-white text-black my-4 drop-shadow-sm"
        >
          <p className="w-fit font-semibold mx-auto mt-2 text-2xl">WWE Articles</p>
          <Articles articles={WWEArticles} setCurrentArticle={setCurrentArticle} viewingAll={currentlyViewing === "WWE"}></Articles>
          <p className="text-blue-900 w-fit ml-auto mr-2 my-2 cursor-pointer">View All...</p>
        </div>

        <div
          className="flex flex-col w-full bg-white text-black my-4 drop-shadow-sm"
        >
          <p className="w-fit font-semibold mx-auto mt-2 text-2xl">NJPW Articles</p>
          <Articles articles={NJPWArticles} setCurrentArticle={setCurrentArticle} viewingAll={currentlyViewing === "NJPW"}></Articles>
          <p className="text-blue-900 w-fit ml-auto mr-2 my-2 cursor-pointer">View All...</p>
        </div>      
      </main>
    </div>
  )
}

export default Home;