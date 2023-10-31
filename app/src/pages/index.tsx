"use client"

// React + Next
import { useEffect, useState } from 'react';

// MUI
import { ClickAwayListener } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

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
  const [showingFilters, setShowingFilters] = useState(false);
  const [filters, setFilters] = useState(["AEW", "WWE", "NJPW"]);

  const [WWEArticles, setWWEArticles] = useState<Article[]>([]);
  const [AEWArticles, setAEWArticles] = useState<Article[]>([]);
  const [NJPWArticles, setNJPWArticles] = useState<Article[]>([]);
  const [activeArticles, setActiveArticles] = useState<Article[]>([]);

  const [currentArticle, setCurrentArticle] = useState<Article>();

  useEffect(() => {
    const getData = async () => {
      const articleMap = [
        {
          company: 'wwe',
          callback: setWWEArticles
        },
        {
          company: 'aew',
          callback: setAEWArticles
        },
        {
          company: 'njpw',
          callback: setNJPWArticles
        },
      ]

      try {
        articleMap.map(async (article) => {
          const wrestlerArticles: Article[] = [];

          const articleRef = collection(db, article.company + "articles");
          const querySnapshot = await getDocs(query(articleRef, orderBy("order", "asc")));
          querySnapshot.forEach((doc) => {
            const newsArticle = doc.data() as Article;
            newsArticle.company = article.company;
            newsArticle.text = newsArticle.text.map((text: string) => {
              return renderText(text, newsArticle);
            });
            wrestlerArticles.push(newsArticle);
          });
  
          article.callback(wrestlerArticles);
        });
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    const combineArraysInOrder = (arrays: Article[][]) => {
      const combinedArray = [];
  
      for (let i = 0; i < 27; i++) {
        for (const arr of arrays) {
          if (i < arr.length) {
            combinedArray.push(arr[i]);
          }
        }
      }
    
      return combinedArray;
    }

    const activeArrays: Article[][] = [];
    if (filters.includes('AEW')) {
      activeArrays.push(AEWArticles)
    }

    if (filters.includes('WWE')) {
      activeArrays.push(WWEArticles)
    }

    if (filters.includes('NJPW')) {
      activeArrays.push(NJPWArticles)
    }

    setActiveArticles(combineArraysInOrder(activeArrays));
  }, [AEWArticles, WWEArticles, NJPWArticles, filters]);

  const updateFilters = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter(f => f !== filter));
    } else {
      setFilters(filters => [...filters, filter]);
    }
  }

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

      <main className="flex flex-col md:w-[87rem] text-black mx-auto mb-16">
        <h1 className="font-semibold text-xl my-2 mx-auto">ARTICLES</h1>

        <div 
          className="flex text-black bg-white w-fit my-2 ml-auto mr-2 py-2 px-4 rounded-3xl drop-shadow-sm cursor-pointer"
          onClick={() => setShowingFilters(!showingFilters)}
        >
          <FilterListIcon 
            className="text-black mr-2"
          />
          <p>Filters</p>
        </div>

        <div 
          className="flex flex-col justify-evenly bg-white text-white overflow-hidden px-4 my-2 mx-2 rounded-md drop-shadow-sm duration-300 transition-transform"
          style={{
            height: showingFilters ? '8.5rem' : '0',
            transitionProperty: 'height'
          }}
        >
          
          <div
            className="flex px-2 py-1 w-52 my-1 rounded-lg cursor-pointer bg-zinc-700"
            onClick={() => updateFilters("AEW")}
          >
            <div 
              className="mr-2 my-auto rounded-full bg-white w-4 h-4 transition-colors duration-300 ease-in-out"
              style={{backgroundColor: filters.includes('AEW') ? '#10b981' : '#e11d48'}}
            />
            Show AEW Articles
          </div>

          <div
            className="flex px-2 py-1 w-52 my-1 rounded-lg cursor-pointer bg-zinc-700"
            onClick={() => updateFilters("WWE")}
          >
            <div 
              className="mr-2 my-auto rounded-full bg-white w-4 h-4 transition-colors duration-300 ease-in-out"
              style={{backgroundColor: filters.includes('WWE') ? '#10b981' : '#e11d48'}}
            />            
            Show WWE Articles
          </div>

          <div
            className="flex px-2 py-1 w-52 my-1 rounded-lg cursor-pointer bg-zinc-700"
            onClick={() => updateFilters("NJPW")}
          >
            <div 
              className="mr-2 my-auto rounded-full bg-white w-4 h-4 transition-colors duration-300 ease-in-out"
              style={{backgroundColor: filters.includes('NJPW') ? '#10b981' : '#e11d48'}}
            />            
            Show NJPW Articles
          </div>
        </div>

        <Articles articles={activeArticles} setCurrentArticle={setCurrentArticle}></Articles>
      </main>
    </div>
  )
}

export default Home;